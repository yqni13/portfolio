import { inject, Injectable, signal } from "@angular/core";
import { DeviceService } from "./device.service";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private readonly device = inject(DeviceService);

    private observer!: IntersectionObserver;
    private readonly activeSection = signal<string>('home');
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
                threshold: this.device.isMobile() ? 0.1 : 0.4,
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
        const documentHeight = Math.max(
            document.body.scrollHeight,
			document.body.offsetHeight,
            document.body.clientHeight,
            document.documentElement.scrollHeight,
			document.documentElement.offsetHeight,
            document.documentElement.clientHeight,
        );
        const windowHeight = window.innerHeight;

        return documentHeight - windowHeight;
    }

    disconnect() {
        this.observer?.disconnect();
    }
}