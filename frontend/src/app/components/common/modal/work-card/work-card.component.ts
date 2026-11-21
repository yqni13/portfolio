import { Component, effect, EffectCleanupRegisterFn, ElementRef, inject, input, OnDestroy, OnInit, output, signal, viewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Project } from "../../../../utils/interfaces/work.interface";
import { environment } from "../../../../../environments/environment";
import { ScrollDownIndicatorComponent } from "../../indicator/scroll-down/scroll-down.indicator.component";
import { IndicatorOption } from "../../../../utils/enums/indicator-option.enum";
import { BadgeComponent } from "../../badge/badge.component";
import { ScrollIndicatorService } from "../../../../services/scroll-indicator.service";

@Component({
    selector: 'app-workcard',
    imports: [
        BadgeComponent,
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

    private readonly scrollIndicator = inject(ScrollIndicatorService);

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
        });
    }

    ngOnInit() {
        this.isLoading.set(false);
        this.scrollIndicator.disableMainIndicator();
    }

    private handleScrollDownIndicator(onCleanUp: EffectCleanupRegisterFn) {
        const element = this.contentWrapper()?.nativeElement;
        if(!element) {
            return;
        }

        // Set true when page is displayed in full height on big screen.
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
        this.scrollIndicator.enableMainIndicator();
    }
}