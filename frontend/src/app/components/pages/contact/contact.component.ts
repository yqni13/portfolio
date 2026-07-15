import { Component, inject, signal } from "@angular/core";
import { BaseComponent } from "../base.component";
import { TextInputComponent } from "../../common/form/text-input/text-input.component";
import { TextareaInputComponent } from "../../common/form/textarea-input/textarea-input.component";
import { SelectInputComponent } from "../../common/form/select-input/select-input.component";
import { NotificationApiService } from "../../../api/services/notification.api.service";
import { NotificationParams } from "../../../api/interfaces/notification.api.interface";
import { NotifyModalService } from "../../../services/notify-modal.service";
import { NotifyModalType } from "../../../utils/enums/notify-modal.enum";
import { LoaderComponent } from "../../common/loader/loader.component";
import { CommonModule } from "@angular/common";
import { email, FieldTree, form, maxLength, required } from "@angular/forms/signals";
import * as CustomValidators from "../../../utils/helper/custom-validators";

@Component({
    selector: 'app-contact',
    imports: [
        CommonModule,
        SelectInputComponent,
        TextInputComponent,
        TextareaInputComponent,
        LoaderComponent,
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent extends BaseComponent {

    private readonly notifyModal = inject(NotifyModalService);
    private readonly notifyApi = inject(NotificationApiService);

    protected lengthValidation = { name: 100, email: 100, subject: 100, message: 1500 };

    protected readonly isLoading = signal(false);

    private contactModel = signal<NotificationParams>(this.initEmptyForm());
    protected contactForm = this.setForm();

    constructor() {
        super();
        this.data = {
            title: 'Contact',
            subTitle: 'Get in touch.'
        };
    }

    private initEmptyForm(): NotificationParams {
        return {
            salutation: '',
            name: '',
            email: '',
            subject: '',
            message: ''
        };
    }

    private setForm(): FieldTree<NotificationParams> {
        // Combination of default and custom maxLength to enable +1 user input over limit to display error message. 
        return form(this.contactModel, (schemaPath) => {
            required(schemaPath.salutation);

            required(schemaPath.name);
            maxLength(schemaPath.name, this.lengthValidation.name+1);
            CustomValidators.customMaxLength(schemaPath.name, {max: this.lengthValidation.name});

            required(schemaPath.email);
            email(schemaPath.email);
            maxLength(schemaPath.email, this.lengthValidation.email+1);
            CustomValidators.customMaxLength(schemaPath.email, {max: this.lengthValidation.email});

            required(schemaPath.subject);
            maxLength(schemaPath.subject, this.lengthValidation.subject+1);
            CustomValidators.customMaxLength(schemaPath.subject, {max: this.lengthValidation.subject});

            required(schemaPath.message);
            maxLength(schemaPath.message, this.lengthValidation.message+1);
            CustomValidators.customMaxLength(schemaPath.message, {max: this.lengthValidation.message});
        });
    }

    getCustomInputStyle(): Record<string, string> {
        return {
            'background-color': 'var(--theme-body-bg)',
            'color': 'var(--theme-body-text)'
        };
    }

    getCustomReadonlyStyle(): Record<string, string> {
        return {
            'background-color': 'var(--theme-body-bg)',
            'color': 'var(--theme-grey)'
        };
    }

    async onSubmit() {
        if(this.contactForm().invalid()) {
            this.contactForm().markAsTouched();
            this.notifyModal.notify({
                title: 'invalid input',
                text: 'Please check for missing or invalid fields before submitting.',
                type: NotifyModalType.WARNING,
                autoClose: true,
                displayTimeInMilliseconds: 3000,
            });
            return;
        }
        this.isLoading.set(true);
        const params: NotificationParams = this.notifyApi.toNotificationParams(this.contactForm().value() as unknown as Record<string, string>);
        await this.notifyApi.sendMessage(params).finally(() => {
            this.reset();
            this.isLoading.set(false);
        });
    }

    private reset() {
        this.contactModel.set(this.initEmptyForm());
        this.contactForm().reset();
    }
}