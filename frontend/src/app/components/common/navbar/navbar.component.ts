import { AfterViewInit, Component, DOCUMENT, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { ThemeOption } from "../../../utils/enums/theme-option.enum";
import _ from "underscore";
import { ThemeHandlerService } from "../../../services/theme.service";
import { DeviceOption } from "../../../utils/enums/device-option.enum";
import { CommonModule } from "@angular/common";
import { NavigationService } from "../../../services/navigation.service";
import { NavMenu } from "../../../utils/interfaces/nav-menu.interface";
import { default as menuData } from "../../../data/menu.json";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [
        CommonModule
    ]
})
export class Navbar implements OnInit, AfterViewInit{

    @ViewChild("themeIcon") themeIcon!: ElementRef;

    activeMenu!: any;

    protected themeEnum = ThemeOption;
    protected selectedTheme: ThemeOption;
    protected deviceOption: DeviceOption;
    protected links: any;
    protected menu: NavMenu[];

    private maxMobileScreenWidth: number;
    private window: any;

    constructor(
        private readonly navigate: NavigationService,
        @Inject(DOCUMENT) private document: Document,
        private readonly themeHandler: ThemeHandlerService,
    ) {
        this.selectedTheme = this.themeHandler.checkThemeSettings();
        this.themeHandler.setThemeSettings(this.selectedTheme);
        this.activeMenu = this.navigate.activeSection$;
        this.deviceOption = DeviceOption.DESKTOP;
        this.links = {
            github: 'https://github.com/yqni13',
            linkedin: 'https://linkedin.com/in/lukas-varga-59532b228',
            mail: 'lukas.varga@yqni13.com'
        };
        this.menu = menuData;

        this.maxMobileScreenWidth = 1024;
        this.window = this.document.defaultView;
    }

    ngOnInit() {
        if(this.window.screen !== undefined) {
            this.setNavWidthDynamically(this.window.screen.width);
            this.setNavWidthDynamically(this.document.body.clientWidth);        
        }

        // adapt to device screen resolution
        const screenWidthRequestSlowedDown = _.debounce( () => {
            this.setNavWidthDynamically(this.window.screen.width);
        }, 250)
        this.window.addEventListener("resize", screenWidthRequestSlowedDown, false);

        // adapt to zoom level
        const clientWidthRequestSlowedDown = _.debounce( () => {
            this.setNavWidthDynamically(this.document.body.clientWidth);
        }, 250)
        this.window.addEventListener("resize", clientWidthRequestSlowedDown, false);
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
            this.themeIcon.nativeElement.classList.remove(ThemeOption.DARK, ThemeOption.LIGHT);
            this.themeIcon.nativeElement.classList.add(this.selectedTheme);
        }
    }

    private setNavWidthDynamically(width: number) {
        if(width > this.maxMobileScreenWidth) {
            this.document.body.setAttribute("data-nav", 'desktopMode');
            this.deviceOption = DeviceOption.DESKTOP;
        } else {
            this.document.body.setAttribute("data-nav", 'mobileMode');
            this.deviceOption = DeviceOption.MOBILE;
        }
    }

    scrollToTop() {
        this.navigate.navigateToTop(this.document);
    }

    scrollToHeader(id: string) {
        this.navigate.navigateToHeader(id, this.document);
    }

    convertMenuHeader(title: string): string {
        return title.toLowerCase();
    }
}