import { CommonModule } from "@angular/common";
import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { DeviceService } from "../../../services/device.service";
import { InitService } from "../../../services/init.service";

@Component({
    selector: 'app-init',
    imports: [
        CommonModule,
    ],
    templateUrl: './init.component.html',
    styleUrl: './init.component.scss'
})
export class InitComponent implements OnInit {

    private readonly init = inject(InitService);
    private readonly device = inject(DeviceService);

    protected readonly isMosaicActive = signal(false);
    protected readonly isLogoActive = signal(false);
    protected readonly isOutroActive = signal(false);

    protected readonly mosaicSize = computed(() =>
        this.device.isMobile() ? 'mosaic-mobile' : 'mosaic-desktop'
    );
    protected readonly logoSize = computed<Record<string, string>>(() =>
        this.device.isMobile()
            ? { 'width': '180px', 'height': '180px' }
            : { 'width': '256px', 'height': '256px' }
    );
    protected readonly logoTransition = computed(() =>
        this.isOutroActive() ? 'logo-animation-outro' : 'logo-animation-intro'
    );

    protected readonly logoPath = 'yqni13_logo.webp';
    protected readonly matrix: Record<string, number> = { levels: 8, cells: 8 };

    private delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    async ngOnInit() {
        await this.handleInitWorkflow();
    }

    async handleInitWorkflow() {
        await this.delay(this.init.delays.startMosaic);
        this.isMosaicActive.set(true);

        await this.delay(this.init.delays.startLogo);
        this.isLogoActive.set(true);

        await this.delay(this.init.delays.stopMosaic);
        this.isMosaicActive.set(false);

        await this.delay(this.init.delays.startOutro);
        this.isOutroActive.set(true);
    }
}