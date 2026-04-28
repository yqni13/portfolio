/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, input, output, } from "@angular/core";
import { ControlValueAccessor, FormControl } from "@angular/forms";

@Component({
    template: ''
})
export class AbstractInputComponent implements ControlValueAccessor {

    readonly fieldName = input.required<string>();
    readonly formControl = input.required<FormControl>();
    readonly placeholder = input<string>();
    readonly name = input<string>();
    readonly ngClass = input<string>();
    readonly customStyle = input<Record<string, string>>();

    readonly byChange = output<unknown>();

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

    clickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if(target.id === `custom-form-${this.fieldName}`) {
            this.isFocused = true;
        } else {
            this.isFocused = false;
        }
    }

    tabOutside(event: KeyboardEvent) {
        const target = event.target as HTMLElement;
        if(event.key === 'Tab' && (target.id === `custom-form-${this.fieldName}`)) {
            this.isFocused = false;
        }
    }
}