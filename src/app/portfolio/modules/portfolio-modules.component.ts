import { Component, OnInit } from "@angular/core";
import { JsonItem } from "../../../api/model/jsonProjectDataRequest";
import { SharedDataService } from "../../../api/service/shared-data.service";

@Component({
    selector: 'app-portfolio-modules',
    templateUrl: './portfolio-modules.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioModulesComponent implements OnInit {
    
    projectData: JsonItem = {};

    constructor(private sharedDataService: SharedDataService) {}

    ngOnInit() {        
        this.sharedDataService.dataJSON$.subscribe(data => {
            this.projectData = data;
        })
    }

}