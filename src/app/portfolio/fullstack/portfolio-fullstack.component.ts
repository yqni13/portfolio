import { Component, OnDestroy, OnInit } from "@angular/core";
import { IJsonItem } from "../../../api/model/jsonProjectDataRequest";
import { SharedDataService } from "../../../api/service/shared-data.service";

@Component({
    selector: 'app-portfolio-fullstack',
    templateUrl: './portfolio-fullstack.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioFullstackComponent implements OnInit, OnDestroy {
    
    projectData: IJsonItem = {};
    subscription$: any;

    constructor(private sharedDataService: SharedDataService) {}

    ngOnInit() {        
        this.subscription$ = this.sharedDataService.dataJSON$.subscribe(data => {
            this.projectData = data;
        })
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

}