import { Component, input } from "@angular/core";
import { VarDirective } from "../../../../utils/directives/ng-var.directive";
import { CommonModule } from "@angular/common";
import { default as validationList } from "../../../../data/validation.json";
import { Validation } from "../../../../utils/interfaces/validation.interface";
import { Field, FieldState } from "@angular/forms/signals";

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

    readonly fieldState = input.required<FieldState<string | number>>();
    readonly fieldName = input('');

    protected validations: Validation[] = validationList;

    get field(): Field<string> {
        return this.fieldState().fieldTree as unknown as Field<string>;
    }

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
                return this.fieldState().errors()[0].message!
            }
            default: 
                return String(this.fieldState().value());
        }
    }
}