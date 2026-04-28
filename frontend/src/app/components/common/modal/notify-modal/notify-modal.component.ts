import { CommonModule } from "@angular/common";
import { Component, inject, input } from "@angular/core";
import { NotifyModalService } from "../../../../services/notify-modal.service";
import { NotifyModalMessage } from "../../../../utils/interfaces/notify-modal.interface";

@Component({
    selector: 'app-notify-modal',
    imports: [
        CommonModule
    ],
    templateUrl: './notify-modal.component.html',
    styleUrl: './notify-modal.component.scss',
    host: {
        '(document:keydown.escape)': 'closeOnEscape()'
    }
})
export class NotifyModalComponent {

    readonly notifyModal = inject(NotifyModalService);

    notification = input.required<NotifyModalMessage>();

    closeOnEscape() {
        if(this.notifyModal.isActive() && !this.notification().autoClose) {
            this.notifyModal.close(this.notification());
        }
    }
}