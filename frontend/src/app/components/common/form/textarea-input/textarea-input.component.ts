import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { AbstractInputComponent } from "../abstract.component";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { ValidationInputComponent } from "../validation-input/validation-input.component";

@Component({
    selector: 'app-textarea-input',
    templateUrl: './textarea-input.component.html',
    styleUrl: './textarea-input.component.scss',
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
        '(click)': 'clickListening($event)',
        '(document:keydown)': 'keyListening($event)'
    }
})
export class TextareaInputComponent extends AbstractInputComponent implements OnInit, OnDestroy {

    @Input() fieldName: string;
    @Input() formControl: FormControl;
    @Input() placeholder: string;
    @Input() name: string;
    @Input() ngClass: string;
    @Input() customStyle: any;
    @Input() rows: number;
    @Input() icon: string;
    @Input() maxLength: number;

    @Output() byChange: EventEmitter<any>;

    private subscription$: Subscription;

    constructor() {
        super();
        this.fieldName = '';
        this.formControl = new FormControl();
        this.placeholder = '';
        this.name = '';
        this.ngClass = '';
        this.customStyle = {};
        this.rows = 0;
        this.icon = '';
        this.maxLength = 0;

        this.byChange = new EventEmitter<any>();

        this.subscription$ = new Subscription();
    }

    ngOnInit() {
        this.subscription$ = this.formControl.valueChanges.subscribe((change: any) => {
            this.byChange.emit(change);
            this.isFocused = true;
        })
    }

    clickListening($event: any) {
        this.clickOutside($event, this.fieldName);
    }

    keyListening($event: any) {
        this.tabOutside($event, this.fieldName);
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
}