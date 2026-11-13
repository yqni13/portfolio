import { SalutationOption } from "../../utils/enums/salutation-option.enum";

export interface NotificationParams {
    salutation: SalutationOption,
    selfdesc: string,
    name: string,
    email: string,
    subject: string,
    message: string
}