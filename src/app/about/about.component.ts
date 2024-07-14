import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ScrollService } from '../shared/service/scroll-window.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {

  protected userAge: number;
  protected isBottomScrolled: boolean;

  constructor(private scrollService: ScrollService, private elementRef: ElementRef) {
    this.userAge = 0;
    this.isBottomScrolled = false;
  }
  
  ngOnInit() {
    this.userAge = this.getAge(new Date("1993/06/03"));
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

  getAge(birthday: Date) {
    const today = new Date();
    let thisYear = 0;
    if (today.getMonth() < birthday.getMonth()) {
        thisYear = 1;
    } else if ((today.getMonth() === birthday.getMonth()) && today.getDate() < birthday.getDate()) {
        thisYear = 1;
    }
    return today.getFullYear() - birthday.getFullYear() - thisYear;
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }
}
