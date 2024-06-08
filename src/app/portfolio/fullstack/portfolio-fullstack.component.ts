import { Component } from "@angular/core";
import { JsonProjectDataRequest } from "../../../api/model/jsonProjectDataRequest";

@Component({
    selector: 'app-portfolio-fullstack',
    templateUrl: './portfolio-fullstack.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioFullstackComponent {
    
    projectJSONData = require("../../../api/json/project-data.json");
    projectData: JsonProjectDataRequest[];

    constructor() {
        this.projectData = this.projectJSONData;
    }

}