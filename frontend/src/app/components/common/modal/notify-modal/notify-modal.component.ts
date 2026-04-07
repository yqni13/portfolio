import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
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
export class NotifyModalComponent implements OnInit {

    @Input() notification: NotifyModalMessage;

    protected notifyClass: NotifyModalType;

    constructor(
        public readonly notifyModal: NotifyModalService
    ) {
        this.notification = {
            title: '',
            type: NotifyModalType.INFO
        };
        this.notifyClass = NotifyModalType.INFO;
    }

    ngOnInit() {
        this.notifyClass = this.notification.type;
    }

    closeOnEscape() {
        if(this.notifyModal.isActive() && !this.notification.autoClose) {
            this.notifyModal.close(this.notification);
        }
    }
}