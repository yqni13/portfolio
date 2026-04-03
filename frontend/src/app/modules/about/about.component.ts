import { Component, OnDestroy, OnInit } from "@angular/core";
import { BaseComponent } from "../base.component";
import { Subscription } from "rxjs";
import { ObservationService } from "../../shared/services/observe.service";
import { ThemeOption } from "../../shared/enums/theme-option.enum";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
    imports: [CommonModule]
})
export class AboutComponent extends BaseComponent implements OnInit, OnDestroy {

    protected myInfo: any;
    protected imgByTheme: { [key: string]: string };

    private subscriptionTheme$: Subscription;

    constructor(
        private readonly observe: ObservationService,
    ) {
        super();
        this.data = {
            title: 'About',
            subTitle: 'Who am I?'
        }

        this.myInfo = {
            alias: 'yqni13',
            intro: 'I\'m Lukas - after a career in Transportation & Logistics in my mid 20s, I discovered my passion for software development and its endless possibilities.',
            text: 'With a keen eye for details and a strong ambition for clean, maintainable code, I love immersing myself in the development process. Specializing in the PEAN stack (PostgreSQL, Express.js, Angular and Node.js), I\'m always driven to learn and improve.\n\nOutside of work I enjoy reading Manga, cooking and hiking. I also make a habit of exploring and analysing websites - studying what makes interfaces intuitive, where small details create big impact, and what separates good from great UX.',
            hint1: 'Want to know what',
            hint2: 'stands for?\nInvite me to an interview to find out ;)'
        };
        this.imgByTheme = {};

        this.subscriptionTheme$ = new Subscription();
    }

    ngOnInit() {
        this.subscriptionTheme$ = this.observe.themeOption$.subscribe(theme => {
            if(theme === ThemeOption.LIGHT) {
                this.imgByTheme = {'background-image': 'url(\"/assets/img/placeholder_about_light.jpg\")'};
            } else {
                this.imgByTheme = {'background-image': 'url(\"/assets/img/placeholder_about_dark.jpg\")'};
            }
        })
    }

    ngOnDestroy() {
        this.subscriptionTheme$.unsubscribe();
    }
}