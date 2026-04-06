import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ControlValueAccessor, FormControl } from "@angular/forms";

@Component({
    template: ''
})
export class AbstractInputComponent implements ControlValueAccessor {

    @Input() fieldName: string;
    @Input() formControl: FormControl;
    @Input() placeholder: string;
    @Input() name: string;
    @Input() ngClass: string;
    @Input() customStyle: any;

    @Output() byChange: EventEmitter<any>;

    private onChange!: (value: unknown) => void;
    private onTouch!: (value: unknown) => void;

    input!: unknown;
    isFocused: boolean;

    constructor() {
        this.fieldName = '';
        this.formControl = new FormControl();
        this.placeholder = '';
        this.name = '';
        this.ngClass = '';
        this.customStyle = {};

        this.byChange = new EventEmitter<any>();

        this.isFocused = false;
    }

    writeValue(input: unknown) {
        this.input = input;
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }

    clickOutside($event: any) {
        if($event.target?.id === `custom-form-${this.fieldName}`) {
            this.isFocused = true;
        } else {
            this.isFocused = false;
        }
    }

    tabOutside($event: any) {
        if($event.key === 'Tab' && ($event.target?.id === `custom-form-${this.fieldName}`)) {
            this.isFocused = false;
        }
    }
}