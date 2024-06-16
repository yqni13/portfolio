import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../api/service/shared-data.service';
import { JsonItem } from '../../api/model/jsonProjectDataRequest';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {


  projectJSONData = require("../../api/json/project-data.json");
  projectData: JsonItem;

  constructor(private sharedDataService: SharedDataService) {
    this.projectData = this.projectJSONData;
  }

  ngOnInit() {
    this.setDataJSONPortfolioAll();
  }

  setDataJSONPortfolioAll() {
    this.sharedDataService.setDataJson(this.projectData);
  }
}
