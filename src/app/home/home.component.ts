import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user = {
    firstname: "Lukas",
    lastname: "Varga",
    alias: "yqni13"
  }
  
  constructor() { 
    // comment to avoid triggering eslint
  }
}
