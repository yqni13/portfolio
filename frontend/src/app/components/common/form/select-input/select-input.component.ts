import { Component, effect, input } from "@angular/core";
import { AbstractInputComponent } from "../abstract.component";
import { CommonModule } from "@angular/common";
import { ValidationInputComponent } from "../validation-input/validation-input.component";
import { FormField } from "@angular/forms/signals";

@Component({
    selector: 'app-select-input',
    imports: [
        CommonModule,
        FormField,
        ValidationInputComponent
    ],
    templateUrl: './select-input.component.html',
    styleUrls: [
        '../abstract.component.scss',
        './select-input.component.scss'
    ],
    host: {
        '(click)': 'clickOutside($event)',
        '(document:keydown)': 'tabOutside($event)'
    }
})
export class SelectInputComponent extends AbstractInputComponent {

    readonly readonlyStyle = input<Record<string, string>>({});
    readonly options = input<unknown>({});

    protected isSelected = false;

    constructor() {
        super();
        effect(() => {
            const fieldInput = this.field().value();
            this.handleSelectionChanges(fieldInput);
        });
    }

    handleSelectionChanges(value: string) {
        if(!value || value === '') {
            this.isSelected = false;
        }
    }

    selectOption(event: Event) {
        this.byChange.emit(event);
        this.isFocused = false;
        this.isSelected = true;
    }
}