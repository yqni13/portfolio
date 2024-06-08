import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
 
  title = 'portfolio';
  setDark: string = "";
  setLight: string = "";
  mobileNavExpended = false;
  collapseNavbarWidth = 780; // add buffer because of error-prone screen width detection

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkThemeCookie();
    
    this.setNavWidthDynamically(window.screen.width);
    this.setNavWidthDynamically(document.body.clientWidth);

    // adapt to device screen resolution
    var screenWidthRequestSlowedDown = _.debounce( () => {
      this.setNavWidthDynamically(window.screen.width);
    }, 250)
    window.addEventListener("resize", screenWidthRequestSlowedDown, false);
    
    // adapt to zoom level
    var clientWidthRequestSlowedDown = _.debounce( () => {
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
    let theme = localStorage.getItem("theme");
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

