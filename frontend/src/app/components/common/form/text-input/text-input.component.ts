import { CommonModule } from "@angular/common";
import { Component, effect, input } from "@angular/core";
import { ValidationInputComponent } from "../validation-input/validation-input.component";
import { AbstractInputComponent } from "../abstract.component";
import { Field, FieldState, FormField } from "@angular/forms/signals";

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

    readonly fieldState = input.required<FieldState<string | number>>();
    readonly inputType = input('text');
    readonly icon = input('');

    get field(): Field<string> {
        return this.fieldState().fieldTree as unknown as Field<string>;
    }

    constructor() {
        super();
        effect(() => {
            const fieldInput = this.field().value();
            this.handleInputChanges(fieldInput);
        });
    }

    handleInputChanges(value: string) {
        // console.log("fieldState: ", this.fieldState())
        this.isFocused = true;
        this.byChange.emit(value);
    }
}

// export class TextInputComponent extends AbstractInputComponent implements OnInit, OnDestroy {

//     readonly inputType = input('');
//     readonly icon = input('');

//     private subscription$ = new Subscription();

//     constructor() {
//         super();
//     }

//     ngOnInit() {
//         this.subscription$ = this.formControl().valueChanges.subscribe((change: unknown) => {
//             this.byChange.emit(change);
//             this.isFocused = true;
//         })
//     }

//     ngOnDestroy() {
//         this.subscription$.unsubscribe();
//     }
// }