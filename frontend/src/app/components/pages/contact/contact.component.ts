import { Component, inject, OnInit, signal } from "@angular/core";
import { BaseComponent } from "../base.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CastFormControlPipe } from "../../../utils/pipes/form-control.pipe";
import { TextInputComponent } from "../../common/form/text-input/text-input.component";
import { CommonModule } from "@angular/common";
import { TextareaInputComponent } from "../../common/form/textarea-input/textarea-input.component";
import { SelectInputComponent } from "../../common/form/select-input/select-input.component";
import { NotificationApiService } from "../../../api/services/notification.api.service";
import { NotificationParams } from "../../../api/interfaces/notification.api.interface";
import { NotifyModalService } from "../../../services/notify-modal.service";
import { NotifyModalType } from "../../../utils/enums/notify-modal.enum";
import { LoaderComponent } from "../../common/loader/loader.component";

@Component({
    selector: 'app-contact',
    imports: [
        CommonModule,
        CastFormControlPipe,
        ReactiveFormsModule,
        SelectInputComponent,
        TextInputComponent,
        TextareaInputComponent,
        LoaderComponent
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent extends BaseComponent implements OnInit {

    private readonly fb = inject(FormBuilder);
    private readonly notifyModal = inject(NotifyModalService);
    private readonly notifyApi = inject(NotificationApiService);

    protected contactForm: FormGroup = new FormGroup({});
    protected messageLength = 1500;
    protected readonly isLoading = signal(false);

    constructor() {
        super();
        this.data = {
            title: 'Contact',
            subTitle: 'Get in touch.'
        };
    }

    ngOnInit() {
        this.initEdit();
    }

    private initForm() {
        this.contactForm = this.fb.group({
            salutation: new FormControl('', Validators.required),
            name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
            subject: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            message: new FormControl('', [Validators.required, Validators.maxLength(this.messageLength)])
        });
    }

    private initEdit() {
        this.initForm();
        this.contactForm.patchValue({
            salutation: '',
            name: '',
            email: '',
            subject: '',
            message: ''
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
        if(this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
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
        const params: NotificationParams = this.notifyApi.toNotificationParams(this.contactForm.getRawValue());
        await this.notifyApi.sendMessage(params).finally(() => {
            this.reset();
            this.isLoading.set(false);
        });
    }

    private reset() {
        this.contactForm.reset();
        this.initEdit();
    }
}