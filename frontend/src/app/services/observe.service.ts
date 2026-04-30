import { Injectable, signal } from "@angular/core";
import { ThemeOption } from "../utils/enums/theme-option.enum";
import { DeviceOption } from "../utils/enums/device-option.enum";

@Injectable({
    providedIn: 'root'
})
export class ObservationService {

    readonly activeModal = signal(false);
    readonly selectedDeviceOption = signal<DeviceOption>(DeviceOption.DESKTOP);
    readonly selectedThemeOption = signal<ThemeOption>(ThemeOption.DARK);

}