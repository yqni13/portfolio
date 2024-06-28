import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private sourceDataSubject = new BehaviorSubject<any>('');
    sourceData$ = this.sourceDataSubject.asObservable();

    setSourceData<T>(data: T) {
        this.sourceDataSubject.next(data);
    }
}