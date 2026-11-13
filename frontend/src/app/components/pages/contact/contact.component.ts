/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { applyWhen, email, FieldTree, form, maxLength, required } from "@angular/forms/signals";
import * as CustomValidators from "../../../utils/helper/custom-validators";
import { SalutationOption } from "../../../utils/enums/salutation-option.enum";

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

    protected maxLengthValidation = { selfdesc: 50, name: 100, email: 100, subject: 75, message: 1500 };
    protected minLengthValidation = { selfdesc: 3, email: 5 };

    protected readonly isLoading = signal(false);
    protected readonly isSelfDesc = signal(false);

    private contactModel = signal<NotificationParams>(this.initEmptyForm());
    protected contactForm = this.setForm();

    protected SalutationEnum = SalutationOption;

    constructor() {
        super();
        this.data = {
            title: 'Contact',
            subTitle: 'Get in touch.'
        };
    }

    private initEmptyForm(): NotificationParams {
        return {
            salutation: '' as SalutationOption,
            selfdesc: '',
            name: '',
            email: '',
            subject: '',
            message: ''
        };
    }

    private setForm(): FieldTree<NotificationParams> {
        // Combination of default and custom maxLength to enable +1 user input over limit to display error message. 
        // IMPORTANT: Order of added validations follows a reason as only 1 validation is shown at a time.
        return form(this.contactModel, (schemaPath) => {
            required(schemaPath.salutation);

            applyWhen(schemaPath, ({valueOf}) => valueOf(schemaPath.salutation) === SalutationOption.SELFDESC, (schemaPath) => {
                required(schemaPath.selfdesc);
                maxLength(schemaPath.selfdesc, this.maxLengthValidation.selfdesc + 1);
                CustomValidators.customMinLength(schemaPath.selfdesc, { min: this.minLengthValidation.selfdesc });
                CustomValidators.customMaxLength(schemaPath.selfdesc, { max: this.maxLengthValidation.selfdesc });
            })

            required(schemaPath.name);
            maxLength(schemaPath.name, this.maxLengthValidation.name + 1);
            CustomValidators.customMaxLength(schemaPath.name, { max: this.maxLengthValidation.name });

            required(schemaPath.email);
            maxLength(schemaPath.email, this.maxLengthValidation.email + 1);
            CustomValidators.customMinLength(schemaPath.email, { min: this.minLengthValidation.email });
            CustomValidators.customMaxLength(schemaPath.email, { max: this.maxLengthValidation.email });
            email(schemaPath.email);

            required(schemaPath.subject);
            maxLength(schemaPath.subject, this.maxLengthValidation.subject + 1);
            CustomValidators.customMaxLength(schemaPath.subject, { max: this.maxLengthValidation.subject });

            required(schemaPath.message);
            maxLength(schemaPath.message, this.maxLengthValidation.message + 1);
            CustomValidators.customMaxLength(schemaPath.message, { max: this.maxLengthValidation.message });
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

    handleSalutationChange(event: unknown) {
        const option = (((event as Event).currentTarget) as HTMLSelectElement).value;
        this.isSelfDesc.set(option === SalutationOption.SELFDESC);
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
        const params: NotificationParams = this.notifyApi.toNotificationParams(this.contactForm().value() as unknown as Record<string, any>);
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