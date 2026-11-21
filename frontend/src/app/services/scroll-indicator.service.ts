import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ScrollIndicatorService {

    private readonly mainIndicatorState = signal(false);
    readonly isMainActive = computed(() => this.mainIndicatorState());

    enableMainIndicator() {
        this.mainIndicatorState.set(true);
    }

    disableMainIndicator() {
        this.mainIndicatorState.set(false);
    }
}