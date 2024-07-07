import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from '../../api/service/shared-data.service';
import { IJsonItem } from '../../api/model/jsonProjectDataRequest';
import { FilterJSONService } from '../../api/service/filter-json.service';
import { PortfolioType } from '../../api/static/portfolio-type.enum';
import {default as jsonData } from '../../api/json/project-data.json';
import { ScrollService } from '../../api/service/scroll-window.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('keywordInputField') keywordInputField!: ElementRef;
  @ViewChild('portfolioScroll') portfolioScroll!: ElementRef;
  
  portfolioType = PortfolioType; // need to use in html
  activeType: PortfolioType = 'all';
  hasInput = false;
  hasOutput = true;
  projectData: IJsonItem;
  keywordInput = '';
  exceptionProperties: string[] = [
    "githublink",
    "cardScreenPath",
    "techURLs",
    "techImgClasses"
  ]
  isBottomScrolled = false;

  constructor(
    private sharedDataService: SharedDataService,
    private filterJsonService: FilterJSONService,
    private scrollService: ScrollService,
    private elementRef: ElementRef
  ) { 
    this.projectData = jsonData;
  }

  ngOnInit() {
    this.filterJsonService.setSource(this.projectData);
    this.filterForType(PortfolioType.all);
    this.filterJsonService.setExceptionKeys(this.exceptionProperties);
    this.projectData = this.filterJsonService.loopSource('');
    this.checkForEmptyResults();
    this.setPortfolioCards();
  }

  ngAfterViewInit() {
    const body = document.body;
    const html = document.documentElement;
    const scrollMaxHeight = this.scrollService.getScrollMaxHeight(body, html, window);
    window.onscroll = () => {
      if (Math.ceil(document.documentElement.scrollTop) >= scrollMaxHeight || 
      Math.ceil(document.body.scrollTop) >= scrollMaxHeight) {
          this.isBottomScrolled = true;
      } else 
        this.isBottomScrolled = false;
    };
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

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

}
