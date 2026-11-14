import { Component, inject } from "@angular/core";
import { default as metaData } from "../../../../../package.json";
import { ThemeHandlerService } from "../../../services/theme.service";
import { ThemeOption } from "../../../utils/enums/theme-option.enum";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-footer',
    imports: [
        CommonModule
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class Footer {

    protected readonly themeHandler = inject(ThemeHandlerService);

    protected readonly version = metaData.version;
    protected readonly ThemeOptionEnum = ThemeOption;
    protected readonly source = {
		"lightmode_bg": "https://unsplash.com/de/fotos/eine-nahaufnahme-einer-weissen-marmoroberflache-li0iC0rjvvg"
	};

}