import { Component } from "@angular/core";
import { JsonItem } from "../../../api/model/jsonProjectDataRequest";

@Component({
    selector: 'app-portfolio-all',
    templateUrl: './portfolio-all.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioAllComponent {
    
    projectJSONData = require("../../../api/json/project-data.json");
    projectData: JsonItem;
    constructor() {
        this.projectData = this.projectJSONData;
    }
    
}