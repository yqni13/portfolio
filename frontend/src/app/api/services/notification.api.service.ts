import { inject, Injectable } from "@angular/core";
import { NotificationParams } from "../interfaces/notification.api.interface";
import axios from "axios";
import { environment } from "../../../environments/environment";
import { NotifyModalService } from "../../services/notify-modal.service";
import { NotifyModalType } from "../../utils/enums/notify-modal.enum";

@Injectable({
    providedIn: 'root'
})
export class NotificationApiService {

    private readonly notifyModal = inject(NotifyModalService);

    private delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    private async notify(data: string) {
        try {
            await axios.post(`https://api.telegram.org/bot${environment.NOTIFY_BOT_KEY.trim()}/sendMessage`, {
                chat_id: environment.NOTIFY_ADMIN_ID.trim(),
                text: data.trim()
            });
            await this.delay(1000);
            this.notifyModal.notify({
                title: 'Message sent!',
                text: 'Your message was sent successfully. I usually reply within 24 hours on business days. Thank you for reaching out and have a nice day!',
                autoClose: false,
                type: NotifyModalType.SUCCESS
            });
        } catch(err: unknown) {
            console.log("notification_api_notify_error: ", err);
            this.notifyModal.notify({
                title: 'Technical problem',
                text: 'Your message could not be sent due to a technical issue. Please contact me directly via email:',
                mail: 'lukas.varga@yqni13.com',
                type: NotifyModalType.ERROR,
                autoClose: false,
            });
        }
    }

    async sendMessage(data: NotificationParams) {
        const message = `[portfolio:message]\n[name]: ${data.salutation} ${data.name}\n[email]: ${data.email}\n---------------------\n[subject]: ${data.subject}\n\n[message]: ${data.message}\n---------------------\n[generated]: ${new Date().toLocaleString()}`;

        await this.notify(message);
    }

    toNotificationParams(data: Record<string, string>): NotificationParams {
        return {
            salutation: data['salutation'],
            name: data['name'],
            email: data['email'],
            subject: data['subject'],
            message: data['message']
        };
    }
}