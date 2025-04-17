/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { ScrollService } from '../shared/service/scroll-window.service';
import * as content from '../shared/data/cv-skill-data.json';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent implements AfterViewInit, OnDestroy {

  protected isBottomScrolled: boolean;
  protected skillList: any;
  protected experienceList: any;

  constructor(private scrollService: ScrollService, private elementRef: ElementRef) {
    this.isBottomScrolled = false;
    this.skillList = Object.values(content['cv-skills']['skills']);
    this.experienceList = Object.values(content['cv-skills']['experience']);
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

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }
}
