import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from '../../api/service/shared-data.service';
import { JsonItem } from '../../api/model/jsonProjectDataRequest';
import { FilterJSONService } from '../../api/service/filter-json.service';
import { PortfolioType } from '../../api/static/portfolio-type.enum';
import {default as jsonData } from '../../api/json/project-data.json';
import { ScrollService } from '../../api/service/scroll-window.service';
import { ErrorService } from '../../api/service/error.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("keywordInputField") keywordInputField!: ElementRef;
  @ViewChild("portfolioScroll") portfolioScroll!: ElementRef;
  
  protected portfolioType = PortfolioType; // need to use in html
  protected activeType: PortfolioType = 'all';
  protected hasInput = false;
  protected hasOutput: boolean;
  protected projectData: JsonItem;
  protected keywordInput = '';
  private exceptionProperties: string[] = [
    'githublink',
    'cardScreenPath',
    'techURLs',
    'techImgClasses'
  ]
  isBottomScrolled = false;

  constructor(
    private sharedDataService: SharedDataService,
    private filterJsonService: FilterJSONService,
    private scrollService: ScrollService,
    private elementRef: ElementRef,
    private errorService: ErrorService
  ) { 
    try {
      this.projectData = jsonData;
      this.hasOutput = true;
    } catch (e: unknown) {
      this.projectData = {};
      this.hasOutput = false;
      this.errorService.handle(e);
    }
  }

  ngOnInit() {
    this.filterJsonService.setSource(this.projectData);
    this.filterJsonService.setExceptionKeys(this.exceptionProperties);
    this.projectData = this.filterJsonService.loopSource('');
    this.checkForEmptyResults();
    this.filterForType(PortfolioType.all);
  }

  ngAfterViewInit() {
    const scrollMaxHeight = this.scrollService.getScrollMaxHeight();
    window.onscroll = () => {
      if (Math.ceil(document.documentElement.scrollTop) >= scrollMaxHeight || 
      Math.ceil(document.body.scrollTop) >= scrollMaxHeight) {
          this.isBottomScrolled = true;
      } else {
        this.isBottomScrolled = false;
      }
    };
  }

  filterForKeyword(val: string) {
    this.projectData = this.filterJsonService.loopSource(val);
    this.checkForEmptyResults();
    this.setPortfolioCards();
  }

  setPortfolioCards() { 
    this.sharedDataService.setSharedData(this.projectData);
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
    if(event.target.value) {
      this.hasInput = true
    }
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
    if(Object.keys(this.projectData).length) {
      this.hasOutput = true 
    }
    else {
      this.hasOutput = false ;
    }
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

}
