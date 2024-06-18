import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IJsonItem } from '../model/jsonProjectDataRequest';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {
    // private dataStringSubject = new BehaviorSubject<string>('Initial data');
    // dataString$ = this.dataStringSubject.asObservable();

    private dataSubject = new ReplaySubject<any>(1);
    data$ = this.dataSubject.asObservable();

    setData<T>(data: T) {
        this.dataSubject.next(data);
    }

    /// No use currently, keep for learning
    // setDataString (data: string) {
    //     this.dataStringSubject.next(data);
    // }
}