import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ObservationService } from "./observe.service";
import { ThemeOption } from "../utils/enums/theme-option.enum";

@Injectable({
    providedIn: 'root',
})
export class ThemeHandlerService {

    private isLocalStorageAvailable: any;
    private url: string;
    
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private readonly observe: ObservationService,
    ) {
        this.isLocalStorageAvailable = typeof localStorage !== 'undefined';
        this.url = 'yqni13.com';
    }

    initTheme() {
        const theme: ThemeOption = this.getThemeSetting();
        this.setThemeSettings(theme ? theme : ThemeOption.DARK);
    }

    getThemeSetting(): ThemeOption {
        if(this.isLocalStorageAvailable) {
            const theme = localStorage.getItem(`${this.url}-theme`);
            if(!theme) {
                return ThemeOption.DARK;
            }

            return String(theme) === 'lightMode' ? ThemeOption.LIGHT : ThemeOption.DARK;
        }

        return ThemeOption.DARK;
    }

    setThemeSettings(theme: ThemeOption) {
        if(this.isLocalStorageAvailable) {
            if(theme) {
                localStorage.setItem(`${this.url}-theme`, theme);
                this.document.body.setAttribute("data-theme", theme);
                this.observe.setThemeOption(theme);
                return;
            }
        }
        
        this.observe.setThemeOption(ThemeOption.DARK);
        this.document.body.setAttribute("data-theme", 'darkMode');
    }

    switchTheme(theme: ThemeOption): ThemeOption {
        if(this.isLocalStorageAvailable) {
            if (theme === ThemeOption.DARK) {
                theme = ThemeOption.LIGHT;
            } else {
                theme = ThemeOption.DARK
            }

            this.setThemeSettings(theme);
            return theme;
        }

        this.setThemeSettings(ThemeOption.DARK);
        return ThemeOption.DARK;
    }
}