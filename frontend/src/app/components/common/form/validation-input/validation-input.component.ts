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
    readonly isFocused = input(false);
    readonly errOnFocusList = input<string[]>([]);
    
    protected validations: Validation[] = validationList;

    displayErrorOnFocus(err: string): boolean {
        return this.errOnFocusList().includes(err);
    }

    get field(): Field<string> {
        return this.fieldState().fieldTree as unknown as Field<string>;
    }

    mapErrorValues(err: string): string {
        const index = this.validations.findIndex((entry) => entry.error === err);
        if (index < 0) {
            return 'Undefined Error';
        }

        const validation = this.validations[index];
        let msg = validation.msg;
        let i = 0;
        validation.mapping!.forEach(mapVal => {
            msg = msg.replace(`{{VAL_${i}}}`, this.getErrorMappingValue(mapVal, err));
            i++;
        })
        return msg;
    }

    getErrorMappingValue(mappingTarget: string, err: string): string {
        switch(mappingTarget) {
            case('fieldName'): 
                return this.fieldName();
            case('fieldMin'):
            case('fieldMax'): {
                return (this.fieldState().errors().find((entry) => entry.kind === err)?.message) ?? 'X';
            }
            default: {
                let mappedVal = String(this.fieldState().value());
                if(mappedVal.length >= 10) {
                    // Avoid displaying mapped value with unnecessary high length.
                    mappedVal = mappedVal.substring(0, 7) + "...";
                }
                return mappedVal;
            }
        }
    }
}