import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";

@Component({
    selector: 'app-toggle',
    imports: [CommonModule],
    templateUrl: './toggle.component.html',
    styleUrl: './toggle.component.scss'
})
export class ToggleComponent {

    readonly enabledIcon = input.required<string>();
    readonly disabledIcon = input.required<string>();
    readonly initValue = input.required<boolean>();
    readonly description = input('');
    readonly byChange = output<boolean>();

    emitStatus(event: Event) {
        const state = event.target as HTMLInputElement;
        this.byChange.emit(state.checked);
    }
}