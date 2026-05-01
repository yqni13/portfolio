import { Component, effect, EffectCleanupRegisterFn, ElementRef, inject, input, OnDestroy, OnInit, output, signal, viewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Project } from "../../../../utils/interfaces/work.interface";
import { environment } from "../../../../../environments/environment";
import { PreloadService } from "../../../../services/preload.service";
import { ResourceOption } from "../../../../utils/enums/resource-option.enum";
import { ScrollDownIndicatorComponent } from "../../indicator/scroll-down/scroll-down.indicator.component";
import { IndicatorOption } from "../../../../utils/enums/indicator-option.enum";
import { ObservationService } from "../../../../services/observe.service";

@Component({
    selector: 'app-workcard',
    imports: [
        CommonModule,
        ScrollDownIndicatorComponent
    ],
    templateUrl: './work-card.component.html',
    styleUrl: "./work-card.component.scss",
    host: {
        '(click)': 'closeDetailsByOutsideTouch($event)',
        '(document:keydown.escape)': 'closeDetails()'
    }
})
export class WorkCardComponent implements OnInit, OnDestroy {

    private readonly preload = inject(PreloadService);
    private readonly observe = inject(ObservationService);

    readonly data = input.required<Project>();
    readonly byChange = output<boolean>();
    private readonly contentWrapper = viewChild<ElementRef>('contentWrapper');

    protected readonly isLoading = signal(true);
    protected readonly scrolledToBottom = signal(false);
    protected readonly cdnUrlBase = environment.API_STORAGE_URL.trim();
    protected readonly IndicatorOptionEnum = IndicatorOption;

    constructor() {
        effect((onCleanUp) => {
            this.handleScrollDownIndicator(onCleanUp);
        })
    }

    ngOnInit() {
        this.preload.preloadSingle({
            option: ResourceOption.IMG,
            url: `${environment.API_STORAGE_URL}${this.data().thumbnail}`
        }).then(() => {
            this.isLoading.set(false);
            this.observe.activeModal.set(true);
        });
    }

    private handleScrollDownIndicator(onCleanUp: EffectCleanupRegisterFn) {
        const element = this.contentWrapper()?.nativeElement;
        if(!element) {
            return;
        }

        // Immediately set true when page is displayed in full height on big screen.
        if(element.clientHeight === element.scrollHeight) {
            this.scrolledToBottom.set(true);
        }

        const scrollHandler = () => {
            const { scrollTop, scrollHeight, clientHeight } = element;
            this.scrolledToBottom.set(Math.ceil(scrollTop) + clientHeight >= scrollHeight);
        };
        element.addEventListener('scroll', scrollHandler);
        onCleanUp(() => {
            element.removeEventListener('scroll', scrollHandler);
        });
    }

    closeDetails() {
        this.byChange.emit(true);
    }

    closeDetailsByOutsideTouch(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if(target.className === 'workcard-detail') {
            this.closeDetails();
        }
    }

    ngOnDestroy() {
        this.observe.activeModal.set(false);
    }
}