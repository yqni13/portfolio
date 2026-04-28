import { Component, inject } from "@angular/core";
import { NavigationService } from "../../../services/navigation.service";

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent {

    private readonly navigate = inject(NavigationService);

    protected data: Record<string, string> = {
        intro: 'Hi, I\'m',
        name: 'Lukas Varga',
        title: 'Full-Stack Developer',
        text: 'I build scalable end-to-end applications with Angular, Node.js, Express.js, and PostgreSQL. My focus is on clean architecture, maintainability, testability and production-ready quality.'
    };
    protected cv: Record<string, string> = {
        path: '/assets/pdf/CV_LukasVarga_portfolio.pdf',
        name: 'CV_LukasVarga'
    };

    scrollToHeader(id: string) {
        this.navigate.navigateToHeader(id, document);
    }
}