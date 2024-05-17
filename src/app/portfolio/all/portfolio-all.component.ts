import { Component, OnInit } from "@angular/core";

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
export class PortfolioAllComponent implements OnInit {
    
    projectJSONData = require("../../../json/project-data.json");
    projectData: MyProjectJSON[];

    constructor() {
        this.projectData = this.projectJSONData;
    }
    
    ngOnInit() {
        // console.log("project json: ", this.projectData[0].title);
    }
}