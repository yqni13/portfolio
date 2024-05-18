import { Component } from "@angular/core";

interface MyProjectJSON {
    order: number
    title: string
    version: string
    type: string
    text: string
}

@Component({
    selector: 'app-portfolio-frontend',
    templateUrl: './portfolio-frontend.component.html',
    styleUrl: '../portfolio.component.scss'
})
export class PortfolioFrontendComponent {
    
    projectJSONData = require("../../../json/project-data.json");
    projectData: MyProjectJSON[];

    constructor() {
        this.projectData = this.projectJSONData;
    }

}