import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    private sourceDataSubject = new BehaviorSubject<any>(1);
    private nextDataSubject = new BehaviorSubject<any>(1);
    sourceData$ = this.sourceDataSubject.asObservable();
    nextData$ = this.nextDataSubject.asObservable();

    setSourceData<T>(data: T) {
        this.sourceDataSubject.next(data);
    }

    setNextData<T>(data: T) {
        this.nextDataSubject.next(data);
    }
}