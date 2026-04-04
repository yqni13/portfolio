import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Project } from "../../../utils/interfaces/work.interface";
import { CommonModule } from "@angular/common";

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
export class WorkCardComponent {

    @Input() data: Project;
    @Output() byChange: EventEmitter<any>;

    constructor() {
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