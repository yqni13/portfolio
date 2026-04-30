import { Component, effect, EffectCleanupRegisterFn, ElementRef, inject, input, OnInit, output, signal, viewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Project } from "../../../../utils/interfaces/work.interface";
import { environment } from "../../../../../environments/environment";
import { PreloadService } from "../../../../services/preload.service";
import { ResourceOption } from "../../../../utils/enums/resource-option.enum";
import { ScrollDownIndicatorComponent } from "../../indicator/scroll-down/scroll-down.indicator.component";
import { IndicatorOption } from "../../../../utils/enums/indicator-option.enum";

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
export class WorkCardComponent implements OnInit {

    private readonly preload = inject(PreloadService);

    readonly data = input.required<Project>();
    readonly byChange = output<boolean>();
    private readonly contentWrapper = viewChild<ElementRef>('contentWrapper');

    protected readonly isLoading = signal(true);
    protected readonly scrolledToBottom = signal(false);
    protected cdnUrlBase = environment.API_STORAGE_URL.trim();
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
        }).then(() => this.isLoading.set(false));
    }

    private handleScrollDownIndicator(onCleanUp: EffectCleanupRegisterFn) {
        const element = this.contentWrapper()?.nativeElement;
        if(!element) {
            return;
        }
        const scrollHandler = () => {
            const { scrollTop, scrollHeight, clientHeight } = element;
            const height = Math.ceil(scrollTop) + clientHeight;
            console.log("height: ", height);
            console.log("scrollHeight: ", scrollHeight);
            this.scrolledToBottom.set(height >= scrollHeight);
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
}