import { Component, Input } from "@angular/core";
import { VarDirective } from "../../../../utils/directives/ng-var.directive";
import { FormControl } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { default as validationList } from "../../../../data/validation.json";
import { Validation } from "../../../../utils/interfaces/validation.interface";

@Component({
    selector: 'app-validation-input',
    templateUrl: './validation-input.component.html',
    styleUrl: './validation-input.component.scss',
    imports: [
        VarDirective,
        CommonModule
    ]
})
export class ValidationInputComponent {

    @Input() ngControl: FormControl;
    @Input() fieldName: string;

    protected validations: Validation[];

    constructor() {
        this.ngControl = new FormControl();
        this.fieldName = '';

        this.validations = validationList;
    }

    mapErrorValues(msg: string, ids: string[]): string {
        let i = 0;
        ids.forEach(id => {
            msg = msg.replace(`{{VAL_${i}}}`, this.getErrorMappingValue(id));
            i++;
        })
        return msg;
    }

    getErrorMappingValue(id: string): any {
        switch(id) {
            case('fieldName'): 
                return this.fieldName;
            case('fieldMax'): {
                const control = this.ngControl as any;
                return control.errors.maxlength.requiredLength;
            }
            default: 
                return this.ngControl.value;
        }
    }
}