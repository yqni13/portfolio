import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { DeviceService } from "../../../services/device.service";

@Component({
    selector: 'app-init',
    imports: [
        CommonModule
    ],
    templateUrl: './init.component.html',
    styleUrl: './init.component.scss'
})
export class InitComponent implements OnInit {

    private readonly device = inject(DeviceService);

    protected readonly isMosaicActive = signal(false);
    protected readonly isLogoActive = signal(false);
    protected readonly outro = signal('');

    protected readonly logoPath = 'yqni13_logo.webp';
    protected readonly matrix: Record<string, number> = { levels: 8, cells: 8 };
    private readonly logoSize = { mobile: '180px', desktop: '256px' };

    private delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    async ngOnInit() {
        await this.handleInitWorkflow();
    }

    setMosaicSizeByClass(): string {
        return this.device.isMobile() ? 'mosaic-mobile' : 'mosaic-desktop';
    }

    setLogoSizeByStyle(): Record<string, string> {
        return this.device.isMobile()
            ? { 'width': this.logoSize.mobile, 'height': this.logoSize.mobile }
            : { 'width': this.logoSize.desktop, 'height': this.logoSize.desktop };
    }

    async handleInitWorkflow() {
        await this.delay(750);
        this.isMosaicActive.set(true);

        await this.delay(500);
        this.isLogoActive.set(true);

        await this.delay(2000);
        this.isMosaicActive.set(false);

        await this.delay(this.device.isMobile() ? 250 : 1250);
        const direction = this.device.isMobile()
            ? 'logo-transition-mobile'
            : 'logo-transition-desktop move-logo';

        this.outro.set(direction);
    }
}