import { NotifyModalType } from "../enums/notify-modal.enum";

export interface NotifyModalMessage {
    title: string,
    text?: string,
    phone?: string,
    mail?: string,
    autoClose?: boolean,
    type: NotifyModalType,
    displayTimeInMilliseconds?: number,
    displayHandler?: any
}