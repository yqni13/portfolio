import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from './portfolio.component';
import { SharedDataService } from '../shared/service/shared-data.service';
import { FilterJSONService } from '../shared/service/filter-json.service';
import { ScrollService } from '../shared/service/scroll-window.service';
import { ErrorService } from '../shared/service/error.service';
import { SharedModule } from '../shared/shared.module';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PortfolioComponent],
      providers: [
        SharedDataService,
        FilterJSONService,
        ScrollService,
        ErrorService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
