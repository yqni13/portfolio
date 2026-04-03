import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ThemeOption } from "../utils/enums/theme-option.enum";

@Injectable({
    providedIn: 'root'
})
export class ObservationService {

    private themeOptionSubject = new BehaviorSubject<ThemeOption>(ThemeOption.DARK);
    themeOption$ = this.themeOptionSubject.asObservable();

    setThemeOption(theme: ThemeOption) {
        this.themeOptionSubject.next(theme);
    }
}