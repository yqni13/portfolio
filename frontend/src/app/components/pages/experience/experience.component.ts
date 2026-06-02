import { Component, signal } from "@angular/core";
import { default as expCollection } from "../../../data/experience.json";
import { CommonModule } from "@angular/common";
import { BaseComponent } from "../base.component";
import { Experience } from "../../../utils/interfaces/experience.interface";
import { ToggleComponent } from "../../common/toggle/toggle.component";

@Component({
    selector: 'app-experience',
    imports: [
        CommonModule,
        ToggleComponent
    ],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss',
})
export class ExperienceComponent extends BaseComponent {

    protected experiences: Experience[] = expCollection;
    protected readonly showCertifications = signal(false);

    constructor() {
        super();
        this.data = {
            title: 'Experience',
            subTitle: 'My professional journey.'
        };
    }

    mapExperienceList(status: boolean) {
        this.showCertifications.set(status);
    }
}