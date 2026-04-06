import { CommonModule } from "@angular/common";
import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { ValidationInputComponent } from "../validation-input/validation-input.component";
import { AbstractInputComponent } from "../abstract.component";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: [
        '../abstract.component.scss',
        './text-input.component.scss'
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ValidationInputComponent
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

    @Input() inputType: string;
    @Input() icon: string;

    private subscription$: Subscription;

    constructor() {
        super();
        this.inputType = '';
        this.icon = '';

        this.subscription$ = new Subscription();
    }

    ngOnInit() {
        this.subscription$ = this.formControl.valueChanges.subscribe((change: any) => {
            this.byChange.emit(change);
            this.isFocused = true;
        })
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
}