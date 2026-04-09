import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ThemeOption } from "../utils/enums/theme-option.enum";
import { DeviceOption } from "../utils/enums/device-option.enum";

@Injectable({
    providedIn: 'root'
})
export class ObservationService {

    private themeOptionSubject = new BehaviorSubject<ThemeOption>(ThemeOption.DARK);
    themeOption$ = this.themeOptionSubject.asObservable();

    private deviceOptionSubject = new BehaviorSubject<DeviceOption>(DeviceOption.MOBILE);
    deviceOption$ = this.deviceOptionSubject.asObservable();

    setThemeOption(theme: ThemeOption) {
        this.themeOptionSubject.next(theme);
    }

    setDeviceOption(device: DeviceOption) {
        this.deviceOptionSubject.next(device);
    }
}