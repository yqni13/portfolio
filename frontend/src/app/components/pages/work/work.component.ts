import { Component, DOCUMENT, Inject, OnInit } from "@angular/core";
import { BaseComponent } from "../base.component";
import { default as projectData } from "../../../data/work.json";
import { Project } from "../../../utils/interfaces/work.interface";
import { CommonModule } from "@angular/common";
import { WorkCardComponent } from "../../common/modal/work-card/work-card.component";
import { ProjectMandate } from "../../../utils/enums/work.enum";
import { PreloadService } from "../../../services/preload.service";
import { ResourceOption } from "../../../utils/enums/resource-option.enum";
import { environment } from "../../../../environments/environment";

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss',
    imports: [
        CommonModule,
        WorkCardComponent
    ],
    host: {
        '(click)': 'preventOpenDetails($event)'
    }
})
export class WorkComponent extends BaseComponent implements OnInit {

    protected projects: Project[];
    protected allRepoLink: string;
    protected cardDetails: Project | null;

    constructor(
        private readonly preload: PreloadService,
        @Inject(DOCUMENT) private document: Document
    ) {
        super();
        this.data = {
            title: 'Selected Work',
            subTitle: 'High-impact applications built with precision and care.'
        }
        this.projects = this.toProjectArray(projectData);
        this.allRepoLink = 'https://github.com/yqni13?tab=repositories';
        this.cardDetails = null;
    }

    async ngOnInit() {
        for(const project of this.projects) {
            await this.preload.preloadSingle({
                option: ResourceOption.IMG,
                url: `${environment.API_STORAGE_URL}${project.thumbnail}`
            });
        }
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