import { Component, inject, signal } from "@angular/core";
import { BaseComponent } from "../base.component";
import { default as projectData } from "../../../data/work.json";
import { Project } from "../../../utils/interfaces/work.interface";
import { CommonModule } from "@angular/common";
import { WorkCardComponent } from "../../common/modal/work-card/work-card.component";
import { ProjectMandate } from "../../../utils/enums/work.enum";
import { ResourceOption } from "../../../utils/enums/resource-option.enum";
import { environment } from "../../../../environments/environment";
import { PreloadService } from "../../../services/preload.service";

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

    private readonly preload = inject(PreloadService);

    protected readonly cardDetails = signal<Project | null>(null);

    protected allRepoLink = 'https://github.com/yqni13?tab=repositories';
    protected projects: Project[] = this.mapProjectData(projectData as unknown as Project[]);

    constructor() {
        super();
        this.data = {
            title: 'Selected Work',
            subTitle: 'High-impact applications built with precision and care.'
        }
    }

    openDetails(data: Project) {
        this.cardDetails.set(data);
    }

    closeDetails(isClosing: boolean) {
        if(isClosing) {
            this.cardDetails.set(null);
        }
    }

    preventOpenDetails(event: MouseEvent) {
        const classname = (event.target as HTMLElement).className;
        if(classname === 'prevent-details' || classname.includes('prevent-details')) {
            this.closeDetails(true);
        }
    }

    private mapProjectData(data: Project[]): Project[] {
        return data.map(project => ({
            ...project,
            type: {
                stack: project.type.stack,
                mandate: project.type.mandate as ProjectMandate
            },
            links: {
                repo: project.links.repo,
                ...(project.links.demo && { demo: project.links.demo }),
                ...(project.links.live && { live: project.links.live })
            }
        }));
    }

    preloadThumbnail(path: string) {
        this.preload.preloadSingle({
            option: ResourceOption.IMG,
            url: `${environment.API_STORAGE_URL}${path}`
        });
    }
}