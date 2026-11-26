import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DateTimeService {

    readonly monthNameLong: string[] = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    readonly monthNameShort: string[] = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    getMonthName(index: number, isShortName?: boolean): string {
        return isShortName ? this.monthNameShort[index] : this.monthNameLong[index];
    }
}