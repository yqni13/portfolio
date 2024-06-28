import { Component, OnDestroy, OnInit } from "@angular/core";
import { IJsonItem } from "../../../api/model/jsonProjectDataRequest";
import { SharedDataService } from "../../../api/service/shared-data.service";
import { Observable, Subscription, of } from "rxjs";

@Component({
    selector: 'template-portfolio-card',
    templateUrl: './template-portfolio-card.component.html',
    styleUrl: './template-portfolio-card.component.scss'
})
export class TemplatePortfolioCardComponent implements OnInit, OnDestroy{

    public projectData: Observable<IJsonItem> = new Observable<IJsonItem>;
    private subscription$ = new Subscription();

    constructor(private sharedDataService: SharedDataService) { }

    ngOnInit() {
        this.subscription$ = this.sharedDataService.sourceData$.subscribe(data => {
            this.projectData = of(data);
        })
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }    

}