import { CommonModule } from "@angular/common";
import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { ValidationInputComponent } from "../validation-input/validation-input.component";
import { AbstractInputComponent } from "../abstract.component";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrl: './text-input.component.scss',
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
        '(click)': 'clickListening($event)',
        '(document:keydown)': 'keyListening($event)'
    }
})
export class TextInputComponent extends AbstractInputComponent implements OnInit, OnDestroy {

    @Input() fieldName: string;
    @Input() formControl: FormControl;
    @Input() inputType: string;
    @Input() placeholder: string;
    @Input() name: string;
    @Input() ngClass: string;
    @Input() customStyle: any;
    @Input() icon: string;

    @Output() byChange: EventEmitter<any>;

    private subscription$: Subscription;

    constructor() {
        super();
        this.fieldName = '';
        this.formControl = new FormControl();
        this.inputType = '';
        this.placeholder = '';
        this.name = '';
        this.ngClass = '';
        this.customStyle = {};
        this.icon = '';
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