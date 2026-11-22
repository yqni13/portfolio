import { computed, Injectable, signal } from "@angular/core";
import { ThemeOption } from "../utils/enums/theme-option.enum";

@Injectable({
    providedIn: 'root',
})
export class ThemeHandlerService {

    private isLocalStorageAvailable = typeof localStorage !== 'undefined';
    private url = "yqni13.com";

    private readonly theme = signal<ThemeOption>(ThemeOption.LIGHT);
    readonly activeTheme = computed(() => this.theme());
    readonly isDarkMode = computed(() => this.theme() === ThemeOption.DARK);

    initTheme() {
        const theme: ThemeOption = this.getThemeSetting();
        this.setThemeSettings(theme ? theme : ThemeOption.LIGHT);
    }

    switchTheme() {
        const next = this.activeTheme() === ThemeOption.LIGHT
            ? ThemeOption.DARK
            : ThemeOption.LIGHT;

        this.setThemeSettings(next);
    }

    getThemeSetting(): ThemeOption {
        if(this.isLocalStorageAvailable) {
            const theme = localStorage.getItem(`${this.url}-theme`);
            if(!theme) {
                return ThemeOption.LIGHT;
            }

            return String(theme) === 'lightMode' ? ThemeOption.LIGHT : ThemeOption.DARK;
        }

        return ThemeOption.LIGHT;
    }

    setThemeSettings(theme: ThemeOption) {
        if(this.isLocalStorageAvailable) {
            if(theme) {
                localStorage.setItem(`${this.url}-theme`, theme);
                document.body.setAttribute("data-theme", theme);
                this.theme.set(theme);
                return;
            }
        }

        // Default
        this.theme.set(ThemeOption.LIGHT);
        document.body.setAttribute("data-theme", 'lightMode');
    }
}