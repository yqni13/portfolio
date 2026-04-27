import { Component } from "@angular/core";
import { BaseComponent } from "../base.component";
import { default as projectData } from "../../../data/work.json";
import { Project } from "../../../utils/interfaces/work.interface";
import { CommonModule } from "@angular/common";
import { WorkCardComponent } from "../../common/modal/work-card/work-card.component";
import { ProjectMandate } from "../../../utils/enums/work.enum";

@Component({
    selector: 'app-work',
    imports: [
        CommonModule,
        WorkCardComponent
    ],
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss',
    host: {
        '(window:click)': 'preventOpenDetails($event)'
    }
})
export class WorkComponent extends BaseComponent {

    protected projects: Project[] = this.toProjectArray(projectData);
    protected allRepoLink: string = 'https://github.com/yqni13?tab=repositories';
    protected cardDetails: Project | null = null;

    constructor() {
        super();
        this.data = {
            title: 'Selected Work',
            subTitle: 'High-impact applications built with precision and care.'
        }
    }

    openDetails(data: Project) {
        document.body.style.setProperty('overflow', 'hidden');
        this.cardDetails = data;
    }

    closeDetails(isClosing: boolean) {
        if(isClosing) {
            this.cardDetails = null;
            document.body.style.setProperty('overflow', 'auto');
        }
    }

    preventOpenDetails($event: any) {
        const classname = $event.target.className;
        if(classname === 'prevent-details' || classname.includes('prevent-details')) {
            this.closeDetails(true as any);
        }
    }

    private toProjectArray(data: any[]): Project[] {
        const arr: Project[] = [];
        data.forEach(project => {
            const entry = {
                thumbnail: project.thumbnail,
                name: project.name,
                type: {
                    stack: project.type.stack,
                    mandate: project.type.mandate as ProjectMandate
                },
                intro: project.intro,
                description: project.description,
                impact: project.impact,
                links: {
                    repo: project.links.repo,
                    demo: project.links.demo ?? null,
                    live: project.links.live ?? null,
                },
                techstack: project.techstack
            };
            if(!entry.links.demo) {
                delete entry.links.demo;
            }
            if(!entry.links.live) {
                delete entry.links.live;
            }
            arr.push(entry);
        })
        return arr;
    }
}