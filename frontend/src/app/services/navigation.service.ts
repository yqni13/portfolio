import { Injectable, OnDestroy, OnInit, signal } from "@angular/core";
import { ObservationService } from "./observe.service";
import { DeviceOption } from "../utils/enums/device-option.enum";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NavigationService implements OnInit, OnDestroy {

    private observer!: IntersectionObserver;
    private activeSection = signal<string>('home');
    activeSection$ = this.activeSection.asReadonly();

    private subscriptionDeviceOption$: Subscription;
    private activeDeviceOption: DeviceOption;

    constructor(private readonly observeService: ObservationService) {
        this.subscriptionDeviceOption$ = new Subscription();
        this.activeDeviceOption = DeviceOption.MOBILE;
    }

    ngOnInit() {
        this.subscriptionDeviceOption$ = this.observeService.deviceOption$.subscribe(val => {
            this.activeDeviceOption = val;
        })
    }

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

    disconnect() {
        this.observer?.disconnect();
    }

    ngOnDestroy() {
        this.subscriptionDeviceOption$.unsubscribe();
    }
}