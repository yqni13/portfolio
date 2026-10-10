import { Component, effect, input } from "@angular/core";
import { AbstractInputComponent } from "../abstract.component";
import { CommonModule } from "@angular/common";
import { ValidationInputComponent } from "../validation-input/validation-input.component";
import { FormField } from "@angular/forms/signals";

@Component({
    selector: 'app-textarea-input',
    imports: [
        CommonModule,
        FormField,
        ValidationInputComponent
    ],
    templateUrl: './textarea-input.component.html',
    styleUrls: [
        '../abstract.component.scss',
        './textarea-input.component.scss'
    ]
})
export class TextareaInputComponent extends AbstractInputComponent {

    readonly rows = input(0);

    constructor() {
        super();
        effect(() => {
            this.handleInputChanges(this.field().value());
        });
    }

    handleInputChanges(value: string) {
        this.byChange.emit(value);
    }
}