import { CommonModule } from "@angular/common";
import { Component, effect, input } from "@angular/core";
import { ValidationInputComponent } from "../validation-input/validation-input.component";
import { AbstractInputComponent } from "../abstract.component";
import { FormField } from "@angular/forms/signals";

@Component({
    selector: 'app-text-input',
    imports: [
        CommonModule,
        FormField,
        ValidationInputComponent
    ],
    templateUrl: './text-input.component.html',
    styleUrls: [
        '../abstract.component.scss',
        './text-input.component.scss'
    ],
    host: {
        '(click)': 'clickOutside($event)',
        '(document:keydown)': 'tabOutside($event)'
    }
})
export class TextInputComponent extends AbstractInputComponent {

    readonly inputType = input('text');

    constructor() {
        super();
        effect(() => {
            const fieldInput = this.field().value();
            this.handleInputChanges(fieldInput);
        });
    }

    handleInputChanges(value: string) {
        this.byChange.emit(value);
        this.isFocused = true;
    }
}