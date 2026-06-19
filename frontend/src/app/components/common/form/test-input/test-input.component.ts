import { Component, effect, input } from "@angular/core";
import { Field, FieldState, FormField } from "@angular/forms/signals";

@Component({
    selector: 'app-test-input',
    imports: [
        FormField
    ],
    templateUrl: './test-input.component.html',
})
export class TestInputComponent {
    readonly fieldState = input.required<FieldState<string | number>>();
    readonly inputType = input('text');
    readonly fieldName = input.required<string>();
    readonly placeholder = input('');
    readonly name = input('');
    readonly ngClass = input('');
    readonly customStyle = input<Record<string, string>>();
    readonly icon = input('');

    protected isFocused = false;

    get field(): Field<string> {
        return this.fieldState().fieldTree as unknown as Field<string>;
    }

    constructor() {
        effect(() => {
            this.handleInputChanges(); // Track certain value by signal().value()
        });
    }

    handleInputChanges() {
        this.isFocused = true;
    }
}