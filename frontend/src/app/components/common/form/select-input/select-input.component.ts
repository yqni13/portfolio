/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, forwardRef, input, OnDestroy, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { AbstractInputComponent } from "../abstract.component";
import { CommonModule } from "@angular/common";
import { ValidationInputComponent } from "../validation-input/validation-input.component";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-select-input',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ValidationInputComponent
    ],
    templateUrl: './select-input.component.html',
    styleUrls: [
        '../abstract.component.scss',
        './select-input.component.scss'
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
export class SelectInputComponent extends AbstractInputComponent implements OnInit, OnDestroy {

    readonlyStyle = input<any>({});
    options = input<any>();
    icon = input<string>('');

    protected isSelected = false;

    private subscription$: Subscription = new Subscription();

    constructor() {
        super();
    }

    ngOnInit() {
        this.subscription$ = this.formControl().valueChanges.subscribe(val => {
            if(!val || val === '') {
                this.isSelected = false;
            }
        })
    }

    selectOption(event: Event) {
        this.byChange.emit(event);
        this.isFocused = false;
        this.isSelected = true;
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
}