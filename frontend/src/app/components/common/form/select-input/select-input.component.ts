import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { AbstractInputComponent } from "../abstract.component";
import { CommonModule } from "@angular/common";
import { ValidationInputComponent } from "../validation-input/validation-input.component";
import { Subscription } from "rxjs";

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
export class SelectInputComponent extends AbstractInputComponent implements OnInit, OnDestroy {

    @Input() readonlyStyle: any;
    @Input() options: any;
    @Input() icon: string;

    protected isSelected: boolean;

    private subscription$: Subscription;

    constructor() {
        super();
        this.readonlyStyle = {};
        this.options = [];
        this.icon = '';

        this.isSelected = false;

        this.subscription$ = new Subscription();
    }

    ngOnInit() {
        this.subscription$ = this.formControl.valueChanges.subscribe(val => {
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