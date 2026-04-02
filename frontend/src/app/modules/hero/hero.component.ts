import { Component, DOCUMENT, Inject } from "@angular/core";
import { NavigationService } from "../../shared/services/navigation.service";

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
    imports: []
})
export class HeroComponent {

    protected data: any;
    protected cv: any;

    constructor(
        private readonly navigate: NavigationService,
        @Inject(DOCUMENT) private document: Document,
    ) {
        this.data = {
            intro: 'Hi, I\'m',
            name: 'Lukas Varga',
            title: 'Full-Stack Developer',
            text: 'I build scalable end-to-end applications with Angular, Node.js, Express.js, and PostgreSQL. My focus is on clean architecture, maintainability, testability and production-ready quality.'
        };
        this.cv = {
            path: 'assets/pdf/CV_LukasVarga_portfolio.pdf',
            name: 'CV_LukasVarga'
        }
    }

    scrollToHeader(id: string) {
        this.navigate.navigateToHeader(id, this.document);
    }
}