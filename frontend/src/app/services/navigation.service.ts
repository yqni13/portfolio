import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private observer!: IntersectionObserver;
    private activeSection = signal<string>('home');
    activeSection$ = this.activeSection.asReadonly();

    constructor() {
        //
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
                threshold: 0.4, // Define how much of section must be visible to trigger (0.4 => 40%).
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
}