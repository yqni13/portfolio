import { Component, DOCUMENT, Inject } from "@angular/core";
import { BaseComponent } from "../base.component";
import { default as projectData } from "../../../data/work.json";
import { Project } from "../../../utils/interfaces/work.interface";
import { WorkCardComponent } from "../../common/work-card/work-card.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss',
    imports: [
        CommonModule,
        WorkCardComponent
    ]
})
export class WorkComponent extends BaseComponent {

    protected projects: Project[] = projectData;
    protected allRepoLink: string;
    protected cardDetails: Project | null;

    constructor(@Inject(DOCUMENT) private document: Document,) {
        super();
        this.data = {
            title: 'Selected Work',
            subTitle: 'High-impact applications built with precision and care.'
        }
        this.allRepoLink = 'https://github.com/yqni13?tab=repositories';
        this.cardDetails = null;
    }

    openDetails(data: Project) {
        this.document.body.style.setProperty('overflow', 'hidden');
        this.cardDetails = data;
    }

    closeDetails(event: Event) {
        if(event) {
            this.cardDetails = null;
            this.document.body.style.setProperty('overflow', 'auto');
        }
    }
}