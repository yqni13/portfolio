import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IJsonItem } from '../model/jsonProjectDataRequest';

@Injectable({
    providedIn: 'root'
})
export class FilterJSONService {

    private source: IJsonItem = {};
    private typeFilter: string = '';
    private resultKeys: string[] = []; // TODO: can be removed, because numberOfTech... has all data necessary
    private numberOfTechnologyPerProject: {[key: string]: number} = {};
    private exceptionKeys: string[] = [];

    loopSource(keyword: string) {
        this.clearResultsArray();
        Object.entries(this.source).forEach(([outerKey, outerValue]) => {

            // NO filter && NO keyword >> no inner loop necessary
            if(this.typeFilter == 'all' && !keyword) {
                this.resultKeys.push(outerKey);
            } else {
                var isFilteredType: boolean = false;
                Object.entries(outerValue).forEach(([innerKey, innerValue]) => {

                    // check first property if type is correct or all types wanted
                    if(innerKey == 'type')
                        (this.typeFilter == 'all' || this.typeFilter == innerValue) 
                            ? isFilteredType = true
                            : isFilteredType = false;

                    if(isFilteredType && !this.exceptionKeys.includes(innerKey) && innerValue.toLowerCase().includes(keyword) && !this.resultKeys.includes(outerKey))
                        this.resultKeys.push(outerKey);
                })
            }
            if(this.resultKeys.includes(outerKey) && !Object.keys(this.numberOfTechnologyPerProject).includes(outerKey)) {
                Object.assign(this.numberOfTechnologyPerProject, {[outerKey]: outerValue.techURLs.length});
            }
        })
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

    getNumberOfTechnologies() {
        return this.numberOfTechnologyPerProject;
    }

    // addKeywordToArray(entry: string) {
    //     if(!this.keywords.includes(entry)) this.keywords.push(entry);
    // }

    // removeKeywordFromArray(entry: string) {
    //     const index = this.keywords.indexOf(entry);
    //     if (index > -1)
    //         this.keywords.splice(index, 1);
    // }

    // clearKeywordsArray() {
    //     this.keywords = [];
    // }
    
    clearResultsArray() {
        this.resultKeys = [];
        this.numberOfTechnologyPerProject = {};
    }

    initializeResults() {
        Object.entries(this.source).forEach(([outerKey, outerValue]) => {
            this.resultKeys.push(outerKey);
        })
    }
}