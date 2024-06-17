import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IJsonItem } from '../model/jsonProjectDataRequest';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {
    // private dataStringSubject = new BehaviorSubject<string>('Initial data');
    // dataString$ = this.dataStringSubject.asObservable();

    private dataJSONSubject = new ReplaySubject<IJsonItem>(1);
    dataJSON$ = this.dataJSONSubject.asObservable();

    setDataJson (data: IJsonItem) {
        this.dataJSONSubject.next(data);
    }

    /// No use currently, keep for learning
    // setDataString (data: string) {
    //     this.dataStringSubject.next(data);
    // }
}