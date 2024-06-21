import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { IJsonItem } from "../../../api/model/jsonProjectDataRequest";
import { SharedDataService } from "../../../api/service/shared-data.service";

@Component({
    selector: 'template-portfolio-card',
    templateUrl: './template-portfolio-card.component.html',
    styleUrl: './template-portfolio-card.component.scss'
})
export class TemplatePortfolioCardComponent implements OnInit, OnDestroy{

    projectData: IJsonItem = {};
    projectKeys: {[key:string]: number} = {};
    subscription$: any;

    constructor(private sharedDataService: SharedDataService) {}


    ngOnInit() {
        this.subscription$ = this.sharedDataService.data$.subscribe(data => {
            this.projectData = data;
            // this.projectKeys = 
        })
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

    

}