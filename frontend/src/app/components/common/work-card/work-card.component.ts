import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Project } from "../../../utils/interfaces/work.interface";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-workcard',
    templateUrl: './work-card.component.html',
    styleUrl: "./work-card.component.scss",
    imports: [CommonModule]
})
export class WorkCardComponent {

    @Input() data: Project;
    @Output() byChange: EventEmitter<any>;

    constructor() {
        this.data = {
            thumbnail: '',
            name: '',
            type: '',
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
}