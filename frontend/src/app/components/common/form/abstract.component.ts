import { Component, computed, input, output, signal, } from "@angular/core";
import { Field, FieldState } from "@angular/forms/signals";

@Component({
    template: '',
    host: {
        '(focusin)': 'onFocusIn()',
        '(focusout)': 'onFocusOut($event)'
    }
})
export class AbstractInputComponent {

    readonly fieldState = input.required<FieldState<string | number>>();
    readonly fieldName = input.required<string>();
    readonly placeholder = input('');
    readonly ngClass = input('');
    readonly customStyle = input<Record<string, string>>();
    readonly icon = input('');

    readonly byChange = output<unknown>();

    readonly isFocused = signal(false);
    readonly hasErrorOnFocus = computed(() => this.hasErrorOnFocusList());

    readonly errorOnFocusList = ['maxlength']; // Add validators to display on input focus.

    readonly hasError = computed(() => 
        this.field().invalid()
        && (this.field().dirty() || this.field().touched())
    );

    get field(): Field<string> {
        return this.fieldState().fieldTree as unknown as Field<string>;
    }

    hasErrorOnFocusList(): boolean {
        let hasErrorFromList = false;
        this.field().errors().forEach((entry) => {
            if(this.errorOnFocusList.includes(entry.kind)) {
                hasErrorFromList = true;
            }
        })

        return hasErrorFromList;
    }

    onFocusIn() {
        this.isFocused.set(true);
    }

    onFocusOut(event: FocusEvent) {
        const host = event.currentTarget as HTMLElement;
        if (!host.contains(event.relatedTarget as Node | null)) {
            this.isFocused.set(false);
        }
    }

    handleInputChanges(value: string) {
        value = this.removeForbiddenStartChars(value, [" "]);
        this.byChange.emit(value.length > 1 && !this.isFocused() ? value.trim() : value);
    }

    /**
     * @description Remove starting characters as long as equal to defined list found.
     * @param forbiddenStartChars Define characters to remove, f.g. empty space " ".
     * @returns
     */
    removeForbiddenStartChars(value: string, forbiddenStartChars: string[]): string {
        while(true) {
            if (forbiddenStartChars.includes(value[0])) {
                value = value.slice(1);
            } else {
                break;
            }
        }
        return value;
    }
}