/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ScrollService } from '../../api/service/scroll-window.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {

  public user_age = 0;
  public isBottomScrolled = false;
  componentBody:any;
  componentHtml:any;

  constructor(private scrollService: ScrollService, private elementRef: ElementRef) {
    //
  }
  
  ngOnInit() {
    this.user_age = this.getAge(new Date("1993/06/03"));
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

  getAge(birthday: Date) {
    const today = new Date();
    let thisYear = 0;
    if (today.getMonth() < birthday.getMonth()) {
        thisYear = 1;
    } else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
        thisYear = 1;
    }
    return today.getFullYear() - birthday.getFullYear() - thisYear;
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

}
