import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ThemeOption } from "../../../utils/enums/theme-option.enum";
import { ThemeHandlerService } from "../../../services/theme.service";

@Component({
    selector: 'app-background',
    imports: [
        CommonModule
    ],
    templateUrl: './background.component.html',
    styleUrl: './background.component.scss',
})
export class BackgroundComponent {

    protected readonly themeHandler = inject(ThemeHandlerService);

    protected readonly ThemeOptionEnum = ThemeOption;
}