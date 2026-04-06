import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { AbstractInputComponent } from "../abstract.component";
import { CommonModule } from "@angular/common";
import { ValidationInputComponent } from "../validation-input/validation-input.component";

@Component({
    selector: 'app-select-input',
    templateUrl: './select-input.component.html',
    styleUrls: [
        '../abstract.component.scss',
        './select-input.component.scss'
    ],
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
        '(click)': 'clickOutside($event)',
        '(document:keydown)': 'tabOutside($event)'
    }
})
export class SelectInputComponent extends AbstractInputComponent {

    @Input() readonlyStyle: any;
    @Input() options: any;
    @Input() icon: string;

    protected isSelected: boolean;

    constructor() {
        super();
        this.readonlyStyle = {};
        this.options = [];
        this.icon = '';

        this.isSelected = false;
    }

    selectOption(event: Event) {
        this.byChange.emit(event);
        this.isFocused = false;
        this.isSelected = true;
    }
}