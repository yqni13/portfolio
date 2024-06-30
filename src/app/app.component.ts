import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public version = '2.5.0';
  public copyrightYear: number = new Date().getFullYear();
  public setDark = "";
  public setLight = "";
  public isAccepted = false;
  
  private mobileNavExpended = false;
  private collapseNavbarWidth = 768;
  
  constructor(private router: Router) {
    router.events.subscribe(e => {
      if(e instanceof NavigationStart)
        window.scrollTo(0,0)
    })
  }

  ngOnInit() {
    this.checkThemeCookie();
    this.checkAlertCookie();
    
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
  }
  
  setDarkMode() {
    this.setDark = "setVisible";
    this.setLight = "setHidden";
    localStorage.setItem("theme", "dark");
    document.body.setAttribute("data-theme", 'dark');
  }
  
  setLightMode() {
    this.setDark = "setHidden";
    this.setLight = "setVisible";
    localStorage.setItem("theme", "light");
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
    if(screenWidth <= this.collapseNavbarWidth && closeAfterRouting)  this.mobileNavExpended = true;
    if(screenWidth > this.collapseNavbarWidth && !closeAfterRouting) return;

    if(screenWidth <= this.collapseNavbarWidth) {
      if(this.mobileNavExpended) {
        document.body.setAttribute("data-nav", 'navMobileCollapsed')
        this.mobileNavExpended = false;
      } else {
        document.body.setAttribute("data-nav", 'navMobileExtended')
        this.mobileNavExpended = true;
      }
    }
  }

  checkThemeCookie() {
    const theme = localStorage.getItem("theme");
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

  checkAlertCookie() {
    const alertCookie = localStorage.getItem("yqni13-alert");
    switch(alertCookie) {
      case 'true':
        this.isAccepted = true;
        break;
      case 'false':
        this.isAccepted = false;
        break;
      default:
        this.isAccepted = false;
    }
  }

  openAlertMsg() {
    this.isAccepted = false;
  }

  closeAlertMsg() {
    this.isAccepted = true;
    localStorage.setItem('yqni13-alert', 'true');
  }


}

