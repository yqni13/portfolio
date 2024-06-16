import { Component, OnDestroy, OnInit } from "@angular/core";
import { JsonItem } from "../../../api/model/jsonProjectDataRequest";
import { SharedDataService } from "../../../api/service/shared-data.service";

@Component({
    selector: 'app-portfolio-frontend',
    templateUrl: './portfolio-frontend.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioFrontendComponent implements OnInit, OnDestroy {
    
    projectData: JsonItem = {};
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