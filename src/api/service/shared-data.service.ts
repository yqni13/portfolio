import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    private dataSubject = new BehaviorSubject<any>(1);
    data$ = this.dataSubject.asObservable();

    setData<T>(data: T) {
        this.dataSubject.next(data);
    }
}