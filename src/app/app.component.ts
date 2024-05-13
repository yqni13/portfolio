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
  isLightTheme = true;
  mobileNavExpended = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['home']);
    this.setDark = "setVisible";
    this.setLight = "setHidden";
    this.setNavWidthDynamically(window.screen.width);
    var widthRequestSlowedDown = _.debounce( () => {
      this.setNavWidthDynamically(window.screen.width);
    }, 125)
    window.addEventListener("resize", widthRequestSlowedDown, false);
  }
  
  setDarkMode() {
    this.setDark = "setVisible";
    this.setLight = "setHidden";
    document.body.setAttribute("data-theme", 'dark');
  }
  
  setLightMode() {
    this.setDark = "setHidden";
    this.setLight = "setVisible";
    document.body.setAttribute("data-theme", 'light');
  }

  setNavWidthDynamically(width: number): void {
    // sets data attribute for body and in media.scss style settings are applied

    if(width > 768) {
      document.body.setAttribute("data-nav", 'navDesktop');
    } else {
      document.body.setAttribute("data-nav", 'navMobileCollapsed');
    }
  }

  expandNavMobile(closeAfterRouting = false): void {
    const screenWidth = window.screen.width;
    if(screenWidth <= 768 && closeAfterRouting)  this.mobileNavExpended = true;
    if(screenWidth > 768 && !closeAfterRouting) return;

    if(screenWidth <= 768) {
      if(this.mobileNavExpended) {
        document.body.setAttribute("data-nav", 'navMobileCollapsed')
        this.mobileNavExpended = false;
      } else {
        document.body.setAttribute("data-nav", 'navMobileExtended')
        this.mobileNavExpended = true;
      }
    }
  }


}

