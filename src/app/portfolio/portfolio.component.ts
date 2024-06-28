import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from '../../api/service/shared-data.service';
import { IJsonItem } from '../../api/model/jsonProjectDataRequest';
import { FilterJSONService } from '../../api/service/filter-json.service';
import { PortfolioType } from '../../api/static/portfolio-type.enum';
import * as jsonData from '../../api/json/project-data.json';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {

  @ViewChild('keywordInputField') keywordInputField!: ElementRef;
  
  portfolioType = PortfolioType; // need to use in html
  activeType: PortfolioType = 'all';
  hasInput = false;
  hasOutput = true;
  projectData: IJsonItem = jsonData;
  keywordInput = '';
  exceptionProperties: string[] = [
    "githublink",
    "cardScreenPath",
    "techURLs",
    "techImgClasses"
  ]

  constructor(
    private sharedDataService: SharedDataService,
    private filterJsonService: FilterJSONService
  ) { }

  ngOnInit() {
    this.filterJsonService.setSource(this.projectData);
    this.filterForType(PortfolioType.all);
    this.filterJsonService.setExceptionKeys(this.exceptionProperties);
    this.projectData = this.filterJsonService.loopSource('');
    this.checkForEmptyResults();
    this.setPortfolioCards();
  }
  
  filterForKeyword(val: string) {
    this.projectData = this.filterJsonService.loopSource(val);
    this.checkForEmptyResults();
    this.setPortfolioCards();
  }
  
  setPortfolioCards() { 
    this.sharedDataService.setSourceData(this.projectData);
  }
  
  filterForType(type: PortfolioType) {
    this.activeType = type;
    this.filterJsonService.setTypeFilter(type);
    this.projectData = this.filterJsonService.loopSource(this.keywordInput);
    this.checkForEmptyResults();
    this.setPortfolioCards();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detectKeywordInput(event: any) {
    if(event.target.value) 
      this.hasInput = true
    else {
      this.hasInput = false;
      this.filterForKeyword('');
    }
    this.keywordInput = event.target.value;
  }

  removeKeyword() {
    this.keywordInputField.nativeElement.value = '';
    this.keywordInput = '';
    this.hasInput = false;
    this.filterForKeyword('');
  }

  checkForEmptyResults() {
    if(Object.keys(this.projectData).length) 
      this.hasOutput = true 
    else 
      this.hasOutput = false ;
  }
}
