import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import _ from 'underscore';
import { UserDataModel } from './shared/interface/userData';
import { SharedDataService } from './shared/service/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  protected version: string;
  protected copyrightYear: number;
  protected darkMode: string;
  protected lightMode: string;
  protected author: UserDataModel;
  private mobileNavExpanded: boolean;
  private collapseNavbarWidth: number;
  readonly OWNER: string;

  
  constructor(
    private router: Router,
    private sharedDataService: SharedDataService
  ) {
    router.events.subscribe(e => {
      if(e instanceof NavigationStart) {
        window.scrollTo(0,0);
      }
    })

    this.version = '2.6.7';
    this.darkMode = '';
    this.lightMode = '';
    this.copyrightYear = new Date().getFullYear();
    this.author = {
      firstname: 'Lukas',
      lastname: 'Varga',
      alias: 'yqni13'
    };
    this.OWNER = `${this.author.firstname} ${this.author.lastname}`;
    this.mobileNavExpanded = false;
    this.collapseNavbarWidth = 768;

  }

  ngOnInit() {
    this.checkThemeCookie();
    
    this.setNavWidthDynamically(window.screen.width);
    this.setNavWidthDynamically(document.body.clientWidth);

    // adapt to device screen resolution
    const screenWidthRequestSlowedDown = _.debounce( () => {
      this.setNavWidthDynamically(window.screen.width);
    }, 250)
    window.addEventListener("resize", screenWidthRequestSlowedDown, false);
    
    // adapt to zoom level
    const clientWidthRequestSlowedDown = _.debounce( () => {
      this.setNavWidthDynamically(document.body.clientWidth);
    }, 250)
    window.addEventListener("resize", clientWidthRequestSlowedDown, false);

    this.shareDataWithHomeComp();
  }
  
  shareDataWithHomeComp() {
    this.sharedDataService.setSharedData(this.author);
  }
  
  setDarkMode() {
    this.darkMode = 'setVisible';
    this.lightMode = 'setHidden';
    localStorage.setItem("theme", 'dark');
    document.body.setAttribute("data-theme", 'dark');
  }
  
  setLightMode() {
    this.darkMode = 'setHidden';
    this.lightMode = 'setVisible';
    localStorage.setItem("theme", 'light');
    document.body.setAttribute("data-theme", 'light');
  }

  setNavWidthDynamically(width: number): void {
    // sets data attribute for body and in media.scss style settings are applied
    if(width > this.collapseNavbarWidth) {
      document.body.setAttribute("data-nav", 'navDesktop');
    } else {
      document.body.setAttribute("data-nav", 'navMobileCollapsed');
    }
  }

  expandNavMobile(closeAfterRouting = false): void {
    const screenWidth = window.screen.width;

    if(screenWidth <= this.collapseNavbarWidth && closeAfterRouting) {
      this.mobileNavExpanded = true;
    }
    
    if(screenWidth > this.collapseNavbarWidth && !closeAfterRouting) {
      return;
    }

    if(screenWidth <= this.collapseNavbarWidth) {
      if(this.mobileNavExpanded) {
        document.body.setAttribute("data-nav", 'navMobileCollapsed')
        this.mobileNavExpanded = false;
      } else {
        document.body.setAttribute("data-nav", 'navMobileExpanded')
        this.mobileNavExpanded = true;
      }
    }
  }

  checkThemeCookie() {
    const theme = localStorage.getItem('theme');
    if(!theme) {
      this.setDarkMode();      
      return;
    }

    if(theme === 'dark') {
      this.setDarkMode();
    } else if (theme === 'light') {
      this.setLightMode();
    }
  }
}

