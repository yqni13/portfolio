import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Project } from "../../../../utils/interfaces/work.interface";
import { ProjectMandate } from "../../../../utils/enums/work.enum";
import { environment } from "../../../../../environments/environment";
import { PreloadService } from "../../../../services/preload.service";
import { ResourceOption } from "../../../../utils/enums/resource-option.enum";

@Component({
    selector: 'app-workcard',
    templateUrl: './work-card.component.html',
    styleUrl: "./work-card.component.scss",
    imports: [
        CommonModule
    ],
    host: {
        '(click)': 'closeDetailsByOutsideTouch($event)',
        '(document:keydown.escape)': 'closeDetails()'
    }
})
export class WorkCardComponent implements OnInit {

    @Input() data: Project;
    @Output() byChange: EventEmitter<any>;

    protected cdnUrlBase: string;

    constructor(
        private readonly preload: PreloadService,
    ) {
        this.data = {
            thumbnail: '',
            name: '',
            type: {
                stack: '',
                mandate: '' as ProjectMandate
            },
            intro: '',
            description: '',
            impact: [],
            links: { repo: '' },
            techstack: []
        };
        this.byChange = new EventEmitter<any>();

        this.cdnUrlBase = environment.API_STORAGE_URL;
    }

    async ngOnInit() {
        await this.preload.preloadSingle({
            option: ResourceOption.IMG,
            url: `${environment.API_STORAGE_URL}${this.data.thumbnail}`
        });
    }

    closeDetails() {
        this.byChange.emit(true);
    }

    closeDetailsByOutsideTouch($event: any) {
        if($event.target.className === 'workcard-detail') {
            this.closeDetails();
        }
    }
}