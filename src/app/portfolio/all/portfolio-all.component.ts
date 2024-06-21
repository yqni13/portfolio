import { Component, OnDestroy, OnInit } from "@angular/core";
import { IJsonItem } from "../../../api/model/jsonProjectDataRequest";
import { SharedDataService } from "../../../api/service/shared-data.service";
import { FilterJSONService } from "../../../api/service/filter-json.service";

@Component({
    selector: 'app-portfolio-all',
    templateUrl: './portfolio-all.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioAllComponent implements OnInit, OnDestroy {
    
    projectData: IJsonItem = {};
    subscription$: any;

    constructor(
        private sharedDataService: SharedDataService,
        private filterJsonService: FilterJSONService
    ) {}

    ngOnInit() {        
        this.subscription$ = this.sharedDataService.sourceData$.subscribe(data => {
            this.projectData = data;
        })

    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
    
}