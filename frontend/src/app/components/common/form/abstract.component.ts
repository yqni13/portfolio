/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, input, output, } from "@angular/core";
import { ControlValueAccessor, FormControl } from "@angular/forms";

@Component({
    template: ''
})
export class AbstractInputComponent implements ControlValueAccessor {

    fieldName = input.required<string>();
    formControl = input.required<FormControl>();
    placeholder = input<string>();
    name = input<string>();
    ngClass = input<string>();
    customStyle = input<any>();

    readonly byChange = output<any>();

    private onChange!: (value: unknown) => void;
    private onTouch!: (value: unknown) => void;

    input!: unknown;
    isFocused = false;

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