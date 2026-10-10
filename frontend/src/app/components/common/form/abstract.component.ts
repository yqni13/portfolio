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

    get field(): Field<string> {
        return this.fieldState().fieldTree as unknown as Field<string>;
    }

    readonly showValidation = computed(() => !this.isFocused() && this.field().invalid() && (this.field().dirty() || this.field().touched()));

    onFocusIn() {
        this.isFocused.set(true);
    }

    onFocusOut(event: FocusEvent) {
        const host = event.currentTarget as HTMLElement;
        if (!host.contains(event.relatedTarget as Node | null)) {
            this.isFocused.set(false);
        }
    }
}