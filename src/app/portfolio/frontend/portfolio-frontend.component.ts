import { Component } from "@angular/core";
import { JsonItem } from "../../../api/model/jsonProjectDataRequest";

@Component({
    selector: 'app-portfolio-frontend',
    templateUrl: './portfolio-frontend.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioFrontendComponent {
    
    projectJSONData = require("../../../api/json/project-data.json");
    projectData: JsonItem;

    constructor() {
        this.projectData = this.projectJSONData;
    }

}