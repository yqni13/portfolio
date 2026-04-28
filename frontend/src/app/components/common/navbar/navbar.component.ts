import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, viewChild } from "@angular/core";
import { ThemeOption } from "../../../utils/enums/theme-option.enum";
import _ from "underscore";
import { ThemeHandlerService } from "../../../services/theme.service";
import { DeviceOption } from "../../../utils/enums/device-option.enum";
import { CommonModule } from "@angular/common";
import { NavigationService } from "../../../services/navigation.service";
import { NavMenu } from "../../../utils/interfaces/nav-menu.interface";
import { default as menuData } from "../../../data/menu.json";
import { ObservationService } from "../../../services/observe.service";

@Component({
    selector: 'app-navbar',
    imports: [
        CommonModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class Navbar implements OnInit, AfterViewInit, OnDestroy {

    private readonly navigate = inject(NavigationService);
    private readonly observe = inject(ObservationService);
    private readonly themeHandler = inject(ThemeHandlerService);

    readonly themeIcon = viewChild<ElementRef>('');

    activeMenu = this.navigate.activeSection$;

    protected themeEnum = ThemeOption;
    protected deviceEnum = DeviceOption;
    protected selectedTheme: ThemeOption = this.themeHandler.getThemeSetting();
    protected readonly deviceOption = signal<DeviceOption>(DeviceOption.MOBILE);
    protected activeMobileMenu = false;
    protected menu: NavMenu[] = menuData;
    protected logo = new Image().src = 'yqni13_logo256.ico';
    protected links: Record<string, string> = {
        github: 'https://github.com/yqni13',
        linkedin: 'https://linkedin.com/in/lukas-varga-59532b228',
        mail: 'lukas.varga@yqni13.com'
    };

    private maxMobileScreenWidth = 1024;
    private window = document.defaultView;
    private sectionIds: string[] = ["head-home", "head-work", "head-skills", "head-about", "head-experience", "head-contact"];

    ngOnInit() {
        this.themeHandler.setThemeSettings(this.selectedTheme);

        if(this.window?.screen !== undefined) {
            this.setNavWidthDynamically(this.window.screen.width);
            this.setNavWidthDynamically(document.body.clientWidth);        
        }

        // adapt to device screen resolution
        const screenWidthRequestSlowedDown = _.debounce( () => {
            this.setNavWidthDynamically(this.window!.screen.width);
        }, 250)
        this.window?.addEventListener("resize", screenWidthRequestSlowedDown, false);

        // adapt to zoom level
        const clientWidthRequestSlowedDown = _.debounce( () => {
            this.setNavWidthDynamically(document.body.clientWidth);
        }, 250)
        this.window?.addEventListener("resize", clientWidthRequestSlowedDown, false);

        this.navigate.observe(this.sectionIds);
    }

    ngAfterViewInit() {
        // necessary to clean and newly add classes
        // in case of lightmode it would overwrite with both modes
        this.applyThemeClass();
    }

    setThemeByUser() {
        this.selectedTheme = this.themeHandler.switchTheme(this.selectedTheme);
    }

    private applyThemeClass() {
        if(this.themeIcon) {
            this.themeIcon()?.nativeElement.classList.remove(ThemeOption.DARK, ThemeOption.LIGHT);
            this.themeIcon()?.nativeElement.classList.add(this.selectedTheme);
        }
    }

    private setNavWidthDynamically(width: number) {
        if(width > this.maxMobileScreenWidth) {
            document.body.setAttribute("data-nav", 'desktopMode');
            this.deviceOption.set(DeviceOption.DESKTOP);
            this.observe.setDeviceOption(DeviceOption.DESKTOP);
        } else {
            document.body.setAttribute("data-nav", 'mobileMode');
            this.deviceOption.set(DeviceOption.MOBILE);
            this.observe.setDeviceOption(DeviceOption.MOBILE);
        }
    }

    scrollToTop() {
        this.navigate.navigateToTop(document);
    }

    scrollToHeader(id: string) {
        this.navigate.navigateToHeader(id, document);
    }

    convertMenuHeader(title: string): string {
        return title.toLowerCase();
    }

    openFullMenuOnMobile() {
        this.activeMobileMenu = true;
        document.body.style.setProperty('overflow', 'hidden');
    }

    closeFullMenuOnMobile() {
        this.activeMobileMenu = false;
        document.body.style.setProperty('overflow', 'auto');
    }

    ngOnDestroy() {
        this.navigate.disconnect();
    }
}