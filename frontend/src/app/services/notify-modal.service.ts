import { computed, Injectable, signal } from "@angular/core";
import { NotifyModalMessage } from "../utils/interfaces/notify-modal.interface";

@Injectable({
    providedIn: 'root'
})
export class NotifyModalService {

    private readonly notifications = signal<NotifyModalMessage[]>([]);
    private readonly hasMockNotification = signal(false);
    readonly activeNotifications = computed(() => this.notifications());
    readonly isActive = computed(() => this.notifications().length > 0 || this.hasMockNotification());

    notify(notification: NotifyModalMessage) {
        if(notification.autoClose && !notification.displayTimeInMilliseconds) {
            notification.displayTimeInMilliseconds = 3000;
        }

        const notificationExists = this.notifications().find((entry) => 
            entry.title === notification.title && entry?.text === notification?.text);

        // Add only notifications that doesn't actively exist.
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
}