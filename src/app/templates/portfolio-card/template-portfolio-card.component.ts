import { Component, OnDestroy, OnInit } from "@angular/core";
import { JsonItem } from "../../shared/interface/jsonProjectDataRequest.interface";
import { SharedDataService } from "../../shared/service/shared-data.service";
import { Observable, Subscription, of } from "rxjs";

@Component({
    selector: 'yqni13-template-portfolio-card',
    templateUrl: './template-portfolio-card.component.html',
    styleUrl: './template-portfolio-card.component.scss'
})
export class TemplatePortfolioCardComponent implements OnInit, OnDestroy{

    protected projectData$: Observable<JsonItem> = new Observable<JsonItem>;
    private subscription$ = new Subscription();

    constructor(private sharedDataService: SharedDataService) { }

    ngOnInit() {
        this.subscription$ = this.sharedDataService.sharedData$.subscribe(data => {
            this.projectData$ = of(data);
        })
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

}