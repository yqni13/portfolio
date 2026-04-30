import { inject, Injectable, OnDestroy, signal } from "@angular/core";
import { ObservationService } from "./observe.service";
import { DeviceOption } from "../utils/enums/device-option.enum";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NavigationService implements OnDestroy {

    private readonly observeService = inject(ObservationService);

    private observer!: IntersectionObserver;
    private activeDeviceOption: DeviceOption = DeviceOption.MOBILE;
    private readonly activeSection = signal<string>('home');
    private subscriptionDeviceOption$: Subscription = 
    this.observeService.deviceOption$.subscribe((val: DeviceOption) => {
        this.activeDeviceOption = val;
    });

    // Prevent updating value outside of this environment => can be updated with public readonly signal.
    activeSection$ = this.activeSection.asReadonly();

    navigateToTop(document: Document) {
        if(document.scrollingElement !== null) {
            document.scrollingElement.scrollTop = 0;
        }
    }

    navigateToHeader(id: string, document: Document) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    observe(ids: string[]) {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        this.activeSection.set(entry.target.id);
                    }
                });
            },
            {
                // Define how much of section must be visible to trigger (0.4 => 40%).
                threshold: this.activeDeviceOption === DeviceOption.MOBILE ? 0.1 : 0.4,
                rootMargin: '0px'
            }
        );
        ids.forEach(id => {
            const element = document.getElementById(id);
            if(element) {
                this.observer.observe(element);
            }
        });
    }

    getScrollMaxHeight(): number {
        
        const body = document.body;
        const html = document.documentElement;

        const documentHeight = Math.max(
            body.scrollHeight,
			body.offsetHeight,
            body.clientHeight,
            html.clientHeight,
            html.scrollHeight,
            html.clientHeight,
			html.offsetHeight,
        );
        const windowHeight = window.innerHeight;

        return documentHeight - windowHeight;
    }

    disconnect() {
        this.observer?.disconnect();
    }

    ngOnDestroy() {
        this.subscriptionDeviceOption$.unsubscribe();
    }
}