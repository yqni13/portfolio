import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { AbstractInputComponent } from "../abstract.component";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { ValidationInputComponent } from "../validation-input/validation-input.component";

@Component({
    selector: 'app-textarea-input',
    templateUrl: './textarea-input.component.html',
    styleUrls: [
        '../abstract.component.scss',
        './textarea-input.component.scss'
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ValidationInputComponent
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

    @Input() rows: number;
    @Input() icon: string;
    @Input() maxLength: number;

    private subscription$: Subscription;

    constructor() {
        super();
        this.rows = 0;
        this.icon = '';
        this.maxLength = 0;

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