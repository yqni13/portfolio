import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { IUserData } from '../../api/model/userData';
import { SharedDataService } from '../../api/service/shared-data.service';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  protected user$: Observable<IUserData> = new Observable<IUserData>;
  private subscription$ = new Subscription();

  constructor(
    private elementRef: ElementRef,
    private sharedDataService: SharedDataService
  ) { 
    //
  }
  
  ngOnInit() {
    this.subscription$ = this.sharedDataService.sourceData$.subscribe(data => {
      this.user$ = of(data);
    })  
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
    this.subscription$.unsubscribe();
  }
}
