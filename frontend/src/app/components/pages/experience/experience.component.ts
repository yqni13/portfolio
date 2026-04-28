import { Component } from "@angular/core";
import { default as expCollection } from "../../../data/experience.json";
import { CommonModule } from "@angular/common";
import { BaseComponent } from "../base.component";
import { Experience } from "../../../utils/interfaces/experience.interface";

@Component({
    selector: 'app-experience',
    imports: [CommonModule],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss',
})
export class ExperienceComponent extends BaseComponent {

    protected experiences: Experience[] = expCollection;

    constructor() {
        super();
        this.data = {
            title: 'Experience',
            subTitle: 'My professional journey.'
        };
    }
}