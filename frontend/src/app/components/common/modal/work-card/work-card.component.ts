/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterNextRender, Component, computed, DestroyRef, ElementRef, inject, input, output, signal, viewChild } from "@angular/core";
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
export class WorkCardComponent {

    private readonly destroyRef = inject(DestroyRef);
    private readonly scrollIndicator = inject(ScrollIndicatorService);

    readonly data = input.required<Project>();
    readonly closed = output<boolean>();
    private readonly contentWrapper = viewChild<ElementRef>('contentWrapper');

    protected readonly hasOverflow = signal(false);
    protected readonly isAtBottom = signal(false);
    protected readonly showScrollIndicator = computed(() => this.hasOverflow() && !this.isAtBottom());

    protected readonly cdnUrlBase = environment.API_STORAGE_URL.trim();
    protected readonly IndicatorOptionEnum = IndicatorOption;

    constructor() {
        this.scrollIndicator.disableMainIndicator();
        document.body.style.setProperty('overflow', 'hidden');
        this.destroyRef.onDestroy(() => {
            this.scrollIndicator.enableMainIndicator();
            document.body.style.removeProperty('overflow');
        });

        // afterNextRender => runs once AFTER rendering | effect => runs BEFORE rendering
        afterNextRender({
            read: () => this.observeScrollState()
        });
    }

    private observeScrollState() {
        const element = this.contentWrapper()?.nativeElement;

        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = element;
            this.hasOverflow.set(scrollHeight - clientHeight > 1);
            this.isAtBottom.set(Math.ceil(scrollTop) + clientHeight >= scrollHeight - 1);
        };

        // Key factor to include size of loading thumbnail at right time.
        const resizeObserver = new ResizeObserver(update);

        // Change in size of viewport/container.
        resizeObserver.observe(element);

        // Increase of content.
        Array.from(element.children).forEach((child: any) => resizeObserver.observe(child));
        element.addEventListener('scroll', update, { passive: true });

        this.destroyRef.onDestroy(() => {
            resizeObserver.disconnect();
            element.removeEventListener('scroll', update);
        });

        update();
    }

    closeDetails() {
        this.closed.emit(true);
    }

    closeDetailsByOutsideTouch(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if(target.className === 'workcard-detail') {
            this.closeDetails();
        }
    }
}