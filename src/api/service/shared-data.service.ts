import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { JsonItem } from '../model/jsonProjectDataRequest';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {
    // private dataStringSubject = new BehaviorSubject<string>('Initial data');
    // dataString$ = this.dataStringSubject.asObservable();

    private dataJSONSubject = new ReplaySubject<JsonItem>(1);
    dataJSON$ = this.dataJSONSubject.asObservable();

    setDataJson (data: JsonItem) {
        this.dataJSONSubject.next(data);
    }

    /// No use currently, keep for learning
    // setDataString (data: string) {
    //     this.dataStringSubject.next(data);
    // }
}