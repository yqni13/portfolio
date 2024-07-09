import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CvComponent } from './cv/cv.component';
import { TemplateModule } from './templates/template.module';
import { Yqni13CommonModule } from '../api/common/yqni13-common.modules';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CvComponent,
    PortfolioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    TemplateModule,
    Yqni13CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
