import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IJsonItem } from '../model/jsonProjectDataRequest';

@Injectable({
    providedIn: 'root'
})
export class SearchFilterService {


    private source: IJsonItem = {};
    private keywords: string[] = [];
    private keyword: string = '';
    private resultKeys: string[] = [];

    loopSource() {
        this.clearResultsArray();
        // handle multiple keywords to include in portfolio object?
        var isIncluded: boolean = false;
        Object.entries(this.source).forEach(([outerKey, outerValue]) => {
            Object.values(outerValue).forEach((innerValue) => {
                if(innerValue.toLowerCase().includes(this.keyword.toLowerCase()) && !this.resultKeys.includes(outerKey)) {
                    // if(!this.keywords.includes(outerKey)) this.resultKeys.push(outerKey)
                    this.resultKeys.push(outerKey)
                }
            })
        })
        console.log("results: ", this.resultKeys);
    }

    setSource(data: IJsonItem) {
        this.source = data;
    }

    setKeyword(data: string) {
        this.keyword = data;
        // this.addKeywordToArray(this.keyword);
    }

    addKeywordToArray(entry: string) {
        if(!this.keywords.includes(entry)) this.keywords.push(entry);
    }

    removeKeywordFromArray(entry: string) {
        const index = this.keywords.indexOf(entry);
        if (index > -1)
            this.keywords.splice(index, 1);
    }

    clearKeywordsArray() {
        this.keywords = [];
    }
    
    clearResultsArray() {
        this.resultKeys = [];
    }

    initializeResults() {
        Object.entries(this.source).forEach(([outerKey, outerValue]) => {
            this.resultKeys.push(outerKey);
        })
    }
}