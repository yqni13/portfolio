import { computed, Injectable, signal } from "@angular/core";
import { DeviceOption } from "../utils/enums/device-option.enum";
import _ from "underscore";

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    private readonly device = signal<DeviceOption>(DeviceOption.MOBILE);
    readonly activeDevice = computed(() => this.device());
    readonly isMobile = computed(() => this.device() === DeviceOption.MOBILE)

    private readonly maxMobileScreenWidth = 1024;
    private window = document.defaultView;

    setDeviceInfo() {
        if(this.window?.screen !== undefined) {
            this.mapDeviceInfoByWidth(this.window.screen.width);
            this.mapDeviceInfoByWidth(document.body.clientWidth);
        }

        this.resizeNavbarWidth();
    }

    private mapDeviceInfoByWidth(width: number) {
        if(width > this.maxMobileScreenWidth) {
            document.body.setAttribute("data-nav", 'desktopMode');
            this.device.set(DeviceOption.DESKTOP);
        } else {
            document.body.setAttribute("data-nav", 'mobileMode');
            this.device.set(DeviceOption.MOBILE);
        }
    }

    private resizeNavbarWidth() {
        // adapt to device screen resolution
        const screenWidthRequestSlowedDown = _.debounce( () => {
            this.mapDeviceInfoByWidth(this.window!.screen.width);
        }, 250)
        this.window?.addEventListener("resize", screenWidthRequestSlowedDown, false);

        // adapt to zoom level
        const clientWidthRequestSlowedDown = _.debounce( () => {
            this.mapDeviceInfoByWidth(document.body.clientWidth);
        }, 250)
        this.window?.addEventListener("resize", clientWidthRequestSlowedDown, false);
    }
}