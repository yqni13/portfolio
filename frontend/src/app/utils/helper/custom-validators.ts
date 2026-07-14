import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { SchemaPath, validate } from "@angular/forms/signals";

export const demoValidator = (max: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if(control?.value && control?.value.length > max) {
            return { demoLimit: true };
        }
        return null;
    }
}

export function maxLength(path: SchemaPath<string>, options: {max: number}) {
    validate(path, ({value}) => {
        if(value().length > options?.max) {
            return { kind: 'maxlength', message: String(options.max) };
        }
        return null;
    })
}