import { Component, ElementRef, OnDestroy } from '@angular/core';
import { DefaultUserData, IUserData } from '../../api/model/userData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  public user: IUserData = DefaultUserData;
  
  constructor(private elementRef: ElementRef) { 
    if(history.state?.data)
      this.user = history.state?.data;
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }
}
