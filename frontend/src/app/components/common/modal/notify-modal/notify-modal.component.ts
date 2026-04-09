import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NotifyModalService } from "../../../../services/notify-modal.service";
import { NotifyModalMessage } from "../../../../utils/interfaces/notify-modal.interface";
import { NotifyModalType } from "../../../../utils/enums/notify-modal.enum";

@Component({
    selector: 'app-notify-modal',
    templateUrl: './notify-modal.component.html',
    styleUrl: './notify-modal.component.scss',
    imports: [
        CommonModule
    ],
    host: {
        '(document:keydown.escape)': 'closeOnEscape()'
    }
})
export class NotifyModalComponent {

    @Input() notification: NotifyModalMessage;

    constructor(
        public readonly notifyModal: NotifyModalService
    ) {
        this.notification = {
            title: '',
            type: NotifyModalType.INFO
        };
    }

    closeOnEscape() {
        if(this.notifyModal.isActive() && !this.notification.autoClose) {
            this.notifyModal.close(this.notification);
        }
    }
}