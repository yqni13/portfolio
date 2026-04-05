import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { AbstractInputComponent } from "../abstract.component";
import { CommonModule } from "@angular/common";
import { ValidationInputComponent } from "../validation-input/validation-input.component";

@Component({
    selector: 'app-select-input',
    templateUrl: './select-input.component.html',
    styleUrl: './select-input.component.scss',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ValidationInputComponent
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectInputComponent),
            multi: true,
        }
    ],
    host: {
        '(click)': 'clickListening($event)',
        '(document:keydown)': 'keyListening($event)'
    }
})
export class SelectInputComponent extends AbstractInputComponent {

    @Input() fieldName: string;
    @Input() formControl: FormControl;
    @Input() placeholder: string;
    @Input() name: string;
    @Input() ngClass: string;
    @Input() customStyle: any;
    @Input() readonlyStyle: any;
    @Input() options: any;
    @Input() icon: string;

    @Output() byChange: EventEmitter<any>;

    protected isSelected: boolean;

    constructor() {
        super();
        this.fieldName = '';
        this.formControl = new FormControl();
        this.placeholder = '';
        this.name = '';
        this.ngClass = '';
        this.customStyle = {};
        this.readonlyStyle = {};
        this.options = [];
        this.icon = '';

        this.byChange = new EventEmitter<any>();

        this.isSelected = false;
    }

    selectOption(event: Event) {
        this.byChange.emit(event);
        this.isFocused = false;
        this.isSelected = true;
    }

    clickListening($event: any) {
        this.clickOutside($event, this.fieldName);
    }

    keyListening($event: any) {
        this.tabOutside($event, this.fieldName);
    }
}