import { Component, OnInit } from "@angular/core";
import { JsonItem } from "../../../api/model/jsonProjectDataRequest";
import { SharedDataService } from "../../../api/service/shared-data.service";

@Component({
    selector: 'app-portfolio-all',
    templateUrl: './portfolio-all.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioAllComponent implements OnInit {
    
    projectData: JsonItem = {};

    constructor(private sharedDataService: SharedDataService) {}

    ngOnInit() {        
        this.sharedDataService.dataJSON$.subscribe(data => {
            this.projectData = data;
        })
    }
    
}