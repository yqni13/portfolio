import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { IJsonItem } from "../../../api/model/jsonProjectDataRequest";
import { SharedDataService } from "../../../api/service/shared-data.service";
import { Observable, of } from "rxjs";

@Component({
    selector: 'template-portfolio-card',
    templateUrl: './template-portfolio-card.component.html',
    styleUrl: './template-portfolio-card.component.scss'
})
export class TemplatePortfolioCardComponent implements OnInit, OnDestroy{

    projectData: Observable<IJsonItem> = new Observable<IJsonItem>;
    subscriptionSource$: any;

    constructor(private sharedDataService: SharedDataService) { }

    ngOnInit() {
        this.subscriptionSource$ = this.sharedDataService.sourceData$.subscribe(data => {
            this.projectData = of(data);
        })
    }

    ngOnDestroy() {
        this.subscriptionSource$.unsubscribe();
    }    

}