import { inject, Injectable } from "@angular/core";
import { ObservationService } from "./observe.service";
import { ThemeOption } from "../utils/enums/theme-option.enum";

@Injectable({
    providedIn: 'root',
})
export class ThemeHandlerService {

    private readonly observe = inject(ObservationService);

    private isLocalStorageAvailable = typeof localStorage !== 'undefined';
    private url = "yqni13.com";

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
                document.body.setAttribute("data-theme", theme);
                this.observe.setThemeOption(theme);
                return;
            }
        }
        
        this.observe.setThemeOption(ThemeOption.DARK);
        document.body.setAttribute("data-theme", 'darkMode');
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