import { CommonModule } from "@angular/common";
import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { ObservationService } from "../../../services/observe.service";
import { DeviceOption } from "../../../utils/enums/device-option.enum";

@Component({
    selector: 'app-init',
    imports: [
        CommonModule
    ],
    templateUrl: './init.component.html',
    styleUrl: './init.component.scss'
})
export class InitComponent implements OnInit {

    protected readonly observe = inject(ObservationService);

    protected readonly isMosaikActive = signal(false);
    protected readonly initAnimation = signal(false);
    protected readonly initLogo = signal(false);
    protected readonly fadeOut = signal(false);
    protected readonly movingDirection = signal('');
    protected readonly isMobile = computed(() => this.observe.activeDevice() === DeviceOption.MOBILE);

    protected readonly logo = 'yqni13_logo.webp';
    private readonly logoSize = { mobile: '180px', desktop: '256px' };

    private delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    async ngOnInit() {
        await this.handleInitProcess();
    }

    setMosaicSizeClass(): string {
        return this.isMobile()
            ? 'mosaic-mobile'
            : 'mosaic-desktop';
    }

    setLogoSizeStyle(): Record<string, string> {
        return this.isMobile()
            ? { 'width': this.logoSize.mobile, 'height': this.logoSize.mobile }
            : { 'width': this.logoSize.desktop, 'height': this.logoSize.desktop };
    }

    async handleInitProcess() {
        await this.delay(750);
        this.isMosaikActive.set(true);
        this.initAnimation.set(true);

        await this.delay(500);
        this.initLogo.set(true);

        await this.delay(2000);
        this.fadeOut.set(true);
        this.isMosaikActive.set(false);

        // TODO: yqni13, delay stays on mobile but needs to be removed
        await this.delay(this.isMobile() ? 250 : 1250);
        const direction = this.isMobile()
            ? 'vanish-logo init-logo-mobile'
            : 'move-logo init-logo-desktop';

        this.movingDirection.set(direction);
    }
}