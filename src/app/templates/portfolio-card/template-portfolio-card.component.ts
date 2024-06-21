import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { IJsonItem } from "../../../api/model/jsonProjectDataRequest";
import { SharedDataService } from "../../../api/service/shared-data.service";
import { FilterJSONService } from "../../../api/service/filter-json.service";

@Component({
    selector: 'template-portfolio-card',
    templateUrl: './template-portfolio-card.component.html',
    styleUrl: './template-portfolio-card.component.scss'
})
export class TemplatePortfolioCardComponent implements OnInit, OnDestroy{

    projectData: IJsonItem = {};
    projectKeys: {[key:string]: number} = {};
    subscriptionSource$: any;
    subscriptionNext$: any;

    constructor(
        private sharedDataService: SharedDataService,
        private filterJsonService: FilterJSONService
    ) {
        
    }


    ngOnInit() {
        this.subscriptionSource$ = this.sharedDataService.sourceData$.subscribe(data => {
            this.projectData = data;
        })
        this.subscriptionNext$ = this.sharedDataService.nextData$.subscribe(data => {
            this.projectKeys = data;
        })
    }

    ngOnDestroy() {
        this.subscriptionSource$.unsubscribe(); 
        this.subscriptionNext$.unsubscribe();
    }

    

}