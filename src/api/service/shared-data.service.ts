import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    private sourceDataSubject = new BehaviorSubject<any>(1);
    sourceData$ = this.sourceDataSubject.asObservable();

    setSourceData<T>(data: T) {
        this.sourceDataSubject.next(data);
    }
}