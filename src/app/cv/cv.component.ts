import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { ScrollService } from '../../api/service/scroll-window.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent implements AfterViewInit, OnDestroy {

  isBottomScrolled = false;

  constructor(private scrollService: ScrollService, private elementRef: ElementRef) {
    //
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
