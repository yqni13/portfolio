import { Component, OnDestroy, OnInit } from "@angular/core";
import { BaseComponent } from "../base.component";
import { Subscription } from "rxjs";
import { ObservationService } from "../../../services/observe.service";
import { ThemeOption } from "../../../utils/enums/theme-option.enum";
import { CommonModule } from "@angular/common";
import { environment } from "../../../../environments/environment";
import { PreloadService } from "../../../services/preload.service";
import { ResourceOption } from "../../../utils/enums/resource-option.enum";

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
    private portraitPaths: Record<string, string>;

    constructor(
        private readonly preload: PreloadService,
        private readonly observe: ObservationService,
    ) {
        super();
        this.data = {
            title: 'About',
            subTitle: 'Who am I?'
        }

        this.myInfo = {
            alias: 'yqni13',
            intro: 'I\'m Lukas, from Austria. After a career in Transportation & Logistics in my mid 20s, I discovered my passion for software development and its endless possibilities.',
            text: 'With a keen eye for details and a strong ambition for clean, maintainable code, it\'s my pleasure to immerse myself in the development process. Specializing in the PEAN stack (PostgreSQL, Express.js, Angular and Node.js), I\'m always driven to learn and improve.\n\nOutside of work, I enjoy reading Manga and technology books, cooking, hiking and solving Sudokus. I also make a habit of exploring and analysing websites - studying what makes interfaces intuitive, where small details create big impact, and what separates good from great UX.',
            hint1: 'Want to know what',
            hint2: 'stands for?\nInvite me to an interview to find out ;)'
        };
        this.imgByTheme = {};

        this.subscriptionTheme$ = new Subscription();
        this.portraitPaths = {
            light: `${environment.API_STORAGE_URL}/container/portfolio/portrait/about_light.webp`,
            dark: `${environment.API_STORAGE_URL}/container/portfolio/portrait/about_dark.webp`
        };
    }

    async ngOnInit() {
        await this.preload.preloadMultiple([
            { option: ResourceOption.IMG, url: this.portraitPaths['light'] },
            { option: ResourceOption.IMG, url: this.portraitPaths['dark'] },
        ]);

        this.subscriptionTheme$ = this.observe.themeOption$.subscribe(theme => {
            if(theme === ThemeOption.LIGHT) {
                this.imgByTheme = {
                    'background-image': `url(${this.portraitPaths['light']})`
                };
            } else {
                this.imgByTheme = {
                    'background-image': `url(${this.portraitPaths['dark']})`
                };
            }
        })
    }

    ngOnDestroy() {
        this.subscriptionTheme$.unsubscribe();
    }
}