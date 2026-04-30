import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { NotifyModalMessage } from "../utils/interfaces/notify-modal.interface";
import { ObservationService } from "./observe.service";

@Injectable({
    providedIn: 'root'
})
export class NotifyModalService {

    private readonly observe = inject(ObservationService);

    readonly notifications = signal<NotifyModalMessage[]>([]);
    isActive = computed(() => this.notifications().length > 0);

    constructor() {
        effect(() => {
            this.handleActiveModalObservation();
        })
    }

    notify(notification: NotifyModalMessage) {
        if(notification.autoClose && !notification.displayTimeInMilliseconds) {
            notification.displayTimeInMilliseconds = 3000;
        }

        const notificationExists = this.notifications().find((entry) => 
            entry.title === notification.title && entry?.text === notification?.text);

        // Only add notifications that doesn't actively exist.
        if(!notificationExists) {
            if(notification.autoClose) {
                notification.displayHandler = setTimeout(
                    () => this.close(notification), notification.displayTimeInMilliseconds ?? 3000
                );
            }
            this.notifications.update(current => [...current, notification]);
        }
    }

    close(notification: NotifyModalMessage) {
        this.notifications.update(current => current.filter(entry => entry !== notification));
    }

    private handleActiveModalObservation() {
        const collection = this.notifications();
        if(collection.length > 0) {
            this.observe.activeModal.set(true);
        } else {
            this.observe.activeModal.set(false);
        }
    }
}