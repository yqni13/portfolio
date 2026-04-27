/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, forwardRef, input, OnDestroy, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { AbstractInputComponent } from "../abstract.component";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { ValidationInputComponent } from "../validation-input/validation-input.component";

@Component({
    selector: 'app-textarea-input',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ValidationInputComponent
    ],
    templateUrl: './textarea-input.component.html',
    styleUrls: [
        '../abstract.component.scss',
        './textarea-input.component.scss'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaInputComponent),
            multi: true,
        }
    ],
    host: {
        '(click)': 'clickOutside($event)',
        '(document:keydown)': 'tabOutside($event)'
    }
})
export class TextareaInputComponent extends AbstractInputComponent implements OnInit, OnDestroy {

    rows = input<number>(0);
    icon = input<string>('');
    maxLength = input<number>(0);

    private subscription$: Subscription = new Subscription();

    constructor() {
        super();
    }

    ngOnInit() {
        this.subscription$ = this.formControl().valueChanges.subscribe((change: any) => {
            this.byChange.emit(change);
            this.isFocused = true;
        })
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
}