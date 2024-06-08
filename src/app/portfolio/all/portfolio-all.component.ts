import { Component } from "@angular/core";
import { JsonProjectDataRequest } from "../../../api/model/jsonProjectDataRequest";

@Component({
    selector: 'app-portfolio-all',
    templateUrl: './portfolio-all.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioAllComponent {
    
    projectJSONData = require("../../../api/json/project-data.json");
    projectData: JsonProjectDataRequest[];

    constructor() {
        this.projectData = this.projectJSONData;
    }
    
}