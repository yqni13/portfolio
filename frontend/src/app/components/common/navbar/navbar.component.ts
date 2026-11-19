import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, viewChild } from "@angular/core";
import { ThemeOption } from "../../../utils/enums/theme-option.enum";
import { ThemeHandlerService } from "../../../services/theme.service";
import { DeviceOption } from "../../../utils/enums/device-option.enum";
import { CommonModule } from "@angular/common";
import { NavigationService } from "../../../services/navigation.service";
import { NavMenu } from "../../../utils/interfaces/nav-menu.interface";
import { default as menuData } from "../../../data/menu.json";
import { ObservationService } from "../../../services/observe.service";
import { TransitionService } from "../../../services/transition.service";
import { EasingFnOption } from "../../../utils/enums/easing-fn.enum";
import { PreloadService } from "../../../services/preload.service";
import { ResourceOption } from "../../../utils/enums/resource-option.enum";

@Component({
    selector: 'app-navbar',
    imports: [
        CommonModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class Navbar implements OnInit, AfterViewInit, OnDestroy {

    private readonly preload = inject(PreloadService);
    private readonly navigate = inject(NavigationService);
    private readonly transition = inject(TransitionService);
    protected readonly observe = inject(ObservationService);
    protected readonly themeHandler = inject(ThemeHandlerService);

    readonly themeIcon = viewChild<ElementRef<HTMLElement>>('themeIcon');

    activeMenu = this.navigate.activeSection$;
    protected readonly activeMobileMenu = signal(false);

    protected readonly ThemeOptionEnum = ThemeOption;
    protected readonly DeviceOptionEnum = DeviceOption;
    protected menu: NavMenu[] = menuData;
    protected logo = new Image().src = 'yqni13_logo256.ico';
    protected links: Record<string, string> = {
        github: 'https://github.com/yqni13',
        linkedin: 'https://linkedin.com/in/lukas-varga-59532b228',
        mail: 'lukas.varga@yqni13.com'
    };

    private sectionIds: string[] = ["head-home", "head-work", "head-skills", "head-about", "head-experience", "head-contact"];

    ngOnInit() {
        this.themeHandler.setThemeSettings(this.themeHandler.activeTheme());
        this.preload.preloadSingle({
            option: ResourceOption.IMG,
            url: '/yqni13_logo256.ico'
        });

        this.navigate.observe(this.sectionIds);
    }

    ngAfterViewInit() {
        // Call here to keep clean and avoid overwriting dark/light mode by itself.
        this.applyThemeClass();
    }

    setThemeByUser() {
        const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!document.startViewTransition || reduceMotion) {
            this.themeHandler.switchTheme();
            return;
        }

        this.transition.applyRippleEffect({
            trigger: this.themeIcon()?.nativeElement,
            fn: () => this.themeHandler.switchTheme(),
            duration: 5000,
            easing: EasingFnOption.EASE_IN
        });
    }

    private applyThemeClass() {
        if(this.themeIcon) {
            this.themeIcon()?.nativeElement.classList.remove(ThemeOption.DARK, ThemeOption.LIGHT);
            this.themeIcon()?.nativeElement.classList.add(this.themeHandler.activeTheme());
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
        this.activeMobileMenu.set(true);
        document.body.style.setProperty('overflow', 'hidden');
    }

    closeFullMenuOnMobile() {
        this.activeMobileMenu.set(false);
        document.body.style.setProperty('overflow', 'auto');
    }

    ngOnDestroy() {
        this.navigate.disconnect();
    }
}