import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../api/service/shared-data.service';
import { IJsonItem } from '../../api/model/jsonProjectDataRequest';
import { SearchFilterService } from '../../api/service/search-filter.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {


  projectJSONData = require("../../api/json/project-data.json");
  projectData: IJsonItem;
  keywordInput: string = '';

  constructor(
    private sharedDataService: SharedDataService,
    private searchFilterService: SearchFilterService
  ) {
    this.projectData = this.projectJSONData;
    this.searchFilterService.initializeResults();
  }

  ngOnInit() {
    this.setDataJSONPortfolio();
    this.searchFilterService.setSource(this.projectData);
  }
  
  filterResults(val: string) {
    this.searchFilterService.setKeyword(val);
    this.searchFilterService.loopSource();
  }

  setDataJSONPortfolio() {
    this.sharedDataService.setDataJson(this.projectData);
  }
}
