import { Component } from "@angular/core";
import { JsonProjectDataRequest } from "../../../api/model/jsonProjectDataRequest";

@Component({
    selector: 'app-portfolio-modules',
    templateUrl: './portfolio-modules.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioModulesComponent {
    
    projectJSONData = require("../../../api/json/project-data.json");
    projectData: JsonProjectDataRequest[];

    constructor() {
        this.projectData = this.projectJSONData;
    }

}