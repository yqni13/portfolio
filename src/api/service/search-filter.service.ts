import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { JsonItem } from '../model/jsonProjectDataRequest';

@Injectable({
    providedIn: 'root'
})
export class SearchFilterService {


    private source: JsonItem = {};
    private keywords: string[] = [];
    private keyword: string = '';

    loopSource() {
        Object.entries(this.source).forEach(([outerKey, outerValue]) => {
            // console.log(`first loop - outerKey: ${outerKey}, outerValue: ${JSON.stringify(outerValue)}`)
            Object.entries(outerValue).forEach(([innerKey, innerValue]) => {
                // console.log(`outerkey: ${outerKey}, innerKey: ${innerKey}, value: ${innerValue}`)
                if(innerValue.toLowerCase().includes(this.keyword.toLowerCase())) {
                    console.log(`entry found for keyword ('${this.keyword}'):\n[key: ${outerKey}, title: ${outerValue.title}, values: ${JSON.stringify(outerValue)}]`);
                }
            })
        })
    }

    setSource(data: JsonItem) {
        this.source = data;
    }

    setKeyword(data: string) {
        this.keyword = data;
        this.addKeywordToArray(this.keyword);
    }

    addKeywordToArray(entry: string) {
        this.keywords.push(entry);
    }

    
    
}