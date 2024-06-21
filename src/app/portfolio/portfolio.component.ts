import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from '../../api/service/shared-data.service';
import { IJsonItem } from '../../api/model/jsonProjectDataRequest';
import { FilterJSONService } from '../../api/service/filter-json.service';
import { PortfolioType } from '../../api/static/portfolio-type.enum';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {

  @ViewChild('keywordInputField') keywordInputField!: ElementRef; 
  
  portfolioType = PortfolioType; // need to use in html
  activeType: PortfolioType = 'all';
  hasInput: boolean = false;
  projectJSONData = require("../../api/json/project-data.json");
  projectData: IJsonItem;
  keywordInput: string = '';
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
    this.filterJsonService.setSource(this.projectData);
    this.filterForType(PortfolioType.all);
    this.filterJsonService.setExceptionKeys(this.exceptionProperties);
    this.projectData = this.filterJsonService.loopSource('');
    this.setPortfolioCards();
  }
  
  filterResults(val: string) {
    this.projectData = this.filterJsonService.loopSource(val);
    this.setPortfolioCards();
  }
  
  setPortfolioCards() { 
    this.sharedDataService.setSourceData(this.projectData);
  }
  
  filterForType(type: PortfolioType) {
    this.activeType = type;
    this.filterJsonService.setTypeFilter(type);
    this.projectData = this.filterJsonService.loopSource(this.keywordInput);
    this.setPortfolioCards();
  }

  sendKeywordInput(event: any) {
    event.target.value ? this.hasInput = true : this.hasInput = false;
    this.keywordInput = event.target.value;
    console.log("keyword: ", this.keywordInput);
    console.log("hasInput: ", this.hasInput);
  }

  removeKeyword() {
    this.keywordInputField.nativeElement.value = '';
    this.hasInput = false;
    this.filterResults('');
  }
}
