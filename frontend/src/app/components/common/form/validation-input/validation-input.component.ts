/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, input } from "@angular/core";
import { VarDirective } from "../../../../utils/directives/ng-var.directive";
import { FormControl } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { default as validationList } from "../../../../data/validation.json";
import { Validation } from "../../../../utils/interfaces/validation.interface";

@Component({
    selector: 'app-validation-input',
    imports: [
        VarDirective,
        CommonModule
    ],
    templateUrl: './validation-input.component.html',
    styleUrl: './validation-input.component.scss',
})
export class ValidationInputComponent {

    readonly ngControl = input(new FormControl());
    readonly fieldName = input('');

    protected validations: Validation[] = validationList;

    mapErrorValues(msg: string, ids: string[]): string {
        let i = 0;
        ids.forEach(id => {
            msg = msg.replace(`{{VAL_${i}}}`, this.getErrorMappingValue(id));
            i++;
        })
        return msg;
    }

    getErrorMappingValue(id: string): string {
        switch(id) {
            case('fieldName'): 
                return this.fieldName();
            case('fieldMax'): {
                const control = this.ngControl() as any;
                return String(control.errors.maxlength.requiredLength);
            }
            default: 
                return this.ngControl().value;
        }
    }
}