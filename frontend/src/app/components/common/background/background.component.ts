import { CommonModule } from "@angular/common";
import { Component, effect, inject } from "@angular/core";
import { ObservationService } from "../../../services/observe.service";
import { ThemeOption } from "../../../utils/enums/theme-option.enum";

@Component({
    selector: 'app-background',
    imports: [
        CommonModule
    ],
    templateUrl: './background.component.html',
    styleUrl: './background.component.scss',
})
export class BackgroundComponent {

    private readonly observe = inject(ObservationService);

    protected activeTheme: ThemeOption = ThemeOption.DARK;
    protected readonly ThemeOptionEnum = ThemeOption;

    constructor() {
        effect(() => this.activeTheme = this.observe.selectedThemeOption());
    }
}