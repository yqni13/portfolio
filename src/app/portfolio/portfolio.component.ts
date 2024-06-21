import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../api/service/shared-data.service';
import { IJsonItem } from '../../api/model/jsonProjectDataRequest';
import { FilterJSONService } from '../../api/service/filter-json.service';

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
    private filterJsonService: FilterJSONService
  ) {
    this.projectData = this.projectJSONData;
    this.filterJsonService.initializeResults();
  }

  ngOnInit() {
    this.setPortfolioCardData(); // dont need later on
    this.filterJsonService.setSource(this.projectData);
    this.filterForType('all');
    this.filterJsonService.setExceptionKeys(this.exceptionProperties);
    this.filterJsonService.loopSource('');
    // does this stay in memory?
    this.numberOfTechnologies = this.filterJsonService.getNumberOfTechnologies();
  }
  
  filterResults(val: string) {
    this.filterJsonService.loopSource(val);
    this.numberOfTechnologies = this.filterJsonService.getNumberOfTechnologies();
  }

  // TODO remove!
  setPortfolioCardData() { 
    this.sharedDataService.setSourceData(this.projectData);
  }

  filterForType(type: string) {
    this.filterJsonService.setTypeFilter(type);
    this.filterJsonService.loopSource(this.keywordInput);
    this.numberOfTechnologies = this.filterJsonService.getNumberOfTechnologies();
  }

}
