import { Injectable } from "@angular/core";
import { NotificationParams } from "../interfaces/notification.api.interface";
import axios from "axios";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NotificationApiService {

    private async notify(data: string) {
        try {
            await axios.post(`https://api.telegram.org/bot${environment.NOTIFY_BOT_KEY.trim()}/sendMessage`, {
                chat_id: environment.NOTIFY_ADMIN_ID.trim(),
                text: data.trim()
            });
            // TODO(yqni13): display SnackbarMessage for success event
        } catch(err: any) {
            console.log("yqni13_portfolio_error: ", err);
            // TODO(yqni13): display SnackbarMessage for error event
        }
    }

    async sendMessage(data: NotificationParams) {
        const message = `PORTFOLIO:MESSAGE\nNAME: ${data.salutation} ${data.name}\nEMAIL: ${data.email}\n---------------------\nSUBJECT: ${data.subject}\n\nMESSAGE: ${data.message}\n---------------------\nGENERATED: ${new Date().toLocaleString()}`;

        await this.notify(message);
    }

    toNotificationParams(data: any): NotificationParams {
        return {
            salutation: data.salutation,
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message
        };
    }
}