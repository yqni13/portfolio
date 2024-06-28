import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit{

  public user_age = 0;

  constructor() {
    // comment to avoid triggering eslint
  }

  ngOnInit() {
    this.user_age = this.getAge(new Date("1993/06/03"));
  }

  getAge(birthday: Date) {
    const today = new Date();
    let thisYear = 0;
    if (today.getMonth() < birthday.getMonth()) {
        thisYear = 1;
    } else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
        thisYear = 1;
    }
    return today.getFullYear() - birthday.getFullYear() - thisYear;
}
}
