import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
 
  title = 'portfolio';
  setDark: string = "";
  setLight: string = "";

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['']);
    this.setDark = "setVisible";
    this.setLight = "setHidden";
  }

  setDarkMode() {
    this.setDark = "setVisible";
    this.setLight = "setHidden";
  }

  setLightMode() {
    this.setDark = "setHidden";
    this.setLight = "setVisible";
  }
}
