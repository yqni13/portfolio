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
    protected readonly isLogoActive = signal(false);
    protected readonly outro = signal('');
    protected readonly isMobile = computed(() => this.observe.activeDevice() === DeviceOption.MOBILE);

    protected readonly logoPath = 'yqni13_logo.webp';
    private readonly logoSize = { mobile: '180px', desktop: '256px' };

    private delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    async ngOnInit() {
        await this.handleInitWorkflow();
    }

    setMosaicSizeByClass(): string {
        return this.isMobile()
            ? 'mosaic-mobile'
            : 'mosaic-desktop';
    }

    setLogoSizeByStyle(): Record<string, string> {
        return this.isMobile()
            ? { 'width': this.logoSize.mobile, 'height': this.logoSize.mobile }
            : { 'width': this.logoSize.desktop, 'height': this.logoSize.desktop };
    }

    async handleInitWorkflow() {
        await this.delay(750);
        this.isMosaikActive.set(true);

        await this.delay(500);
        this.isLogoActive.set(true);

        await this.delay(2000);
        this.isMosaikActive.set(false);

        await this.delay(this.isMobile() ? 250 : 1250);
        const direction = this.isMobile()
            ? 'logo-transition-mobile'
            : 'logo-transition-desktop move-logo';

        this.outro.set(direction);
    }
}