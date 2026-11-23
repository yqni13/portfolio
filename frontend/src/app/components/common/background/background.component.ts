import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
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
export class BackgroundComponent implements OnInit {

    protected readonly themeHandler = inject(ThemeHandlerService);

    protected readonly ThemeOptionEnum = ThemeOption;

    ngOnInit() {
        document.body.style.setProperty('background', 'var(--theme-body-bg)');
    }
}