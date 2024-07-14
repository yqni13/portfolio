import { Injectable } from '@angular/core';
import { JsonItem } from '../interface/jsonProjectDataRequest';
import { PortfolioType } from '../enums/portfolio-type.enum';

@Injectable({
    providedIn: 'root'
})
export class FilterJSONService {

    private source: JsonItem = {};
    private typeFilter = '';
    private resultKeys: string[] = []; // TODO(yqni13): solution without this temp guide?
    private exceptionKeys: string[] = [];

    loopSource(keyword: string | null): JsonItem {
        this.clearResultsArray();
        if(this.typeFilter === PortfolioType.all && (!keyword || keyword == null))
            return this.source;

        const filteredSource: JsonItem = {};
        if(keyword != null) keyword = keyword.toLowerCase();
        Object.entries(this.source).forEach(([outerKey, outerValue]) => {

            if(this.typeFilter === PortfolioType.all && !keyword) {
                this.resultKeys.push(outerKey);
                
            } else {
                let isFilteredType = false;
                Object.entries(outerValue).forEach(([innerKey, innerValue]) => {

                    // check first property if type is correct or all types wanted
                    if(innerKey === 'type')
                        if (this.typeFilter === PortfolioType.all || this.typeFilter === innerValue)
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

    setSource(data: JsonItem) {
        this.source = data;
    }

    setTypeFilter(data: PortfolioType) {
        this.typeFilter = data;
    }

    setExceptionKeys(data: string[]) {
        this.exceptionKeys = data;
    }
    
    clearResultsArray() {
        this.resultKeys = [];
    }

}