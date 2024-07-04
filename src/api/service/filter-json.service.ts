import { Injectable } from '@angular/core';
import { IJsonItem } from '../model/jsonProjectDataRequest';

@Injectable({
    providedIn: 'root'
})
export class FilterJSONService {

    private source: IJsonItem = {};
    private typeFilter = '';
    private resultKeys: string[] = []; // TODO(yqni13): solution without this temp guide?
    private exceptionKeys: string[] = [];

    loopSource(keyword: string): IJsonItem {
        this.clearResultsArray();
        if(this.typeFilter == 'all' && !keyword)
            return this.source;

        const filteredSource: IJsonItem = {};
        keyword = keyword.toLowerCase();
        Object.entries(this.source).forEach(([outerKey, outerValue]) => {

            if(this.typeFilter == 'all' && !keyword) {
                this.resultKeys.push(outerKey);
                
            } else {
                let isFilteredType = false;
                Object.entries(outerValue).forEach(([innerKey, innerValue]) => {

                    // check first property if type is correct or all types wanted
                    if(innerKey == 'type')
                        if (this.typeFilter == 'all' || this.typeFilter == innerValue)
                            isFilteredType = true
                        else 
                            isFilteredType = false;

                    if(isFilteredType && !this.exceptionKeys.includes(innerKey) && innerValue.toLowerCase().includes(keyword) && !this.resultKeys.includes(outerKey)) {
                        this.resultKeys.push(outerKey);
                        Object.assign(filteredSource, {[outerKey]: outerValue})
                    }
                })
            }
        })
        return filteredSource;
    }

    setSource(data: IJsonItem) {
        this.source = data;
    }

    setTypeFilter(data: string) {
        this.typeFilter = data;
    }

    setExceptionKeys(data: string[]) {
        this.exceptionKeys = data;
    }
    
    clearResultsArray() {
        this.resultKeys = [];
    }

}