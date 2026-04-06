import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../base.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CastFormControlPipe } from "../../../utils/pipes/form-control.pipe";
import { TextInputComponent } from "../../common/form/text-input/text-input.component";
import { CommonModule } from "@angular/common";
import { TextareaInputComponent } from "../../common/form/textarea-input/textarea-input.component";
import { SelectInputComponent } from "../../common/form/select-input/select-input.component";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    imports: [
        CommonModule,
        CastFormControlPipe,
        ReactiveFormsModule,
        SelectInputComponent,
        TextInputComponent,
        TextareaInputComponent
    ]
})
export class ContactComponent extends BaseComponent implements OnInit {

    protected contactForm: FormGroup;
    protected messageLength: number;
    protected isLoading: boolean;

    constructor(
        private readonly fb: FormBuilder,
    ) {
        super();
        this.data = {
            title: 'Contact',
            subTitle: 'Get in touch.'
        };

        this.contactForm = new FormGroup({});
        this.messageLength = 1500;
        this.isLoading = false;
    }

    ngOnInit() {
        this.initEdit();
    }

    private initForm() {
        this.contactForm = this.fb.group({
            salutation: new FormControl('', Validators.required),
            name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            email: new FormControl('', [Validators.required, Validators.maxLength(100)]),
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

    getCustomInputStyle(): { [key: string]: string } {
        return {
            'background-color': 'var(--theme-body-bg)',
            'color': 'var(--theme-body-text)'
        };
    }

    getCustomReadonlyStyle(): { [key: string]: string } {
        return {
            'background-color': 'var(--theme-body-bg)',
            'color': 'var(--theme-grey)'
        };
    }

    onSubmit() {
        if(this.contactForm.invalid) {
            return;
        }
        this.isLoading = true;
        let data: any;
        // TODO(yqni13): process data with notification api at YQNI13-18-notification-service
    }
}