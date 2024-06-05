import { Component } from "@angular/core";

interface MyProjectJSON {
    order: number
    title: string
    version: string
    type: string
    text: string
}
@Component({
    selector: 'app-portfolio-all',
    templateUrl: './portfolio-all.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioAllComponent {
    
    projectJSONData = require("../../../json/project-data.json");
    projectData: MyProjectJSON[];

    constructor() {
        this.projectData = this.projectJSONData;
    }
    
}