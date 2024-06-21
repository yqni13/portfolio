import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../api/service/shared-data.service';
import { IJsonItem } from '../../api/model/jsonProjectDataRequest';
import { FilteredJSONService } from '../../api/service/search-filter.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  
  projectJSONData = require("../../api/json/project-data.json");
  projectData: IJsonItem;
  keywordInput: string = '';
  numberOfTechnologies: {[key: string]: number} = {};
  exceptionProperties: string[] = [
    "githublink",
    "cardScreenPath",
    "techURLs",
    "techImgClasses"
  ]

  constructor(
    private sharedDataService: SharedDataService,
    private searchFilterService: FilteredJSONService
  ) {
    this.projectData = this.projectJSONData;
    this.searchFilterService.initializeResults();
  }

  ngOnInit() {
    this.setPortfolioCardData();
    this.searchFilterService.setExceptionKeys(this.exceptionProperties);
    this.searchFilterService.setSource(this.projectData);
    this.searchFilterService.loopSource();
    this.numberOfTechnologies = this.searchFilterService.getNumberOfTechnologies();
  }
  
  filterResults(val: string) {
    this.searchFilterService.setKeyword(val);
    this.searchFilterService.loopSource();
    this.numberOfTechnologies = this.searchFilterService.getNumberOfTechnologies();
  }

  setPortfolioCardData() {
    this.sharedDataService.setData(this.projectData);
    // this.sharedDataService.setData(this.)
  }
}
