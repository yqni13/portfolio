import { CommonModule } from "@angular/common";
import { Component, forwardRef, input, OnDestroy, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { ValidationInputComponent } from "../validation-input/validation-input.component";
import { AbstractInputComponent } from "../abstract.component";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-text-input',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ValidationInputComponent
    ],
    templateUrl: './text-input.component.html',
    styleUrls: [
        '../abstract.component.scss',
        './text-input.component.scss'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true,
        }
    ],
    host: {
        '(click)': 'clickOutside($event)',
        '(document:keydown)': 'tabOutside($event)'
    }
})
export class TextInputComponent extends AbstractInputComponent implements OnInit, OnDestroy {

    readonly inputType = input('');
    readonly icon = input('');

    private subscription$ = new Subscription();

    constructor() {
        super();
    }

    ngOnInit() {
        this.subscription$ = this.formControl().valueChanges.subscribe((change: unknown) => {
            this.byChange.emit(change);
            this.isFocused = true;
        })
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
}