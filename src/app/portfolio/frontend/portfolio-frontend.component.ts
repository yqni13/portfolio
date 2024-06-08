import { Component } from "@angular/core";
import { JsonProjectDataRequest } from "../../../api/model/jsonProjectDataRequest";

@Component({
    selector: 'app-portfolio-frontend',
    templateUrl: './portfolio-frontend.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioFrontendComponent {
    
    projectJSONData = require("../../../api/json/project-data.json");
    projectData: JsonProjectDataRequest[];

    constructor() {
        this.projectData = this.projectJSONData;
    }

}