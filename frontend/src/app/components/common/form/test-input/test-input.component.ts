import { CommonModule } from "@angular/common";
import { Component, effect, input, output } from "@angular/core";
import { Field, FieldState, FormField } from "@angular/forms/signals";
import { ValidationInputComponent } from "../validation-input/validation-input.component";

@Component({
    selector: 'app-test-input',
    imports: [
        CommonModule,
        FormField,
        ValidationInputComponent
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

    readonly byChange = output<unknown>();

    protected isFocused = false;

    get field(): Field<string> {
        return this.fieldState().fieldTree as unknown as Field<string>;
    }

    constructor() {
        effect(() => {
            const fieldInput = this.field().value();
            this.handleInputChanges(fieldInput);
        });
    }

    handleInputChanges(value: string) {
        console.log("fieldState: ", this.fieldState())
        this.isFocused = true;
        this.byChange.emit(value);
    }
}