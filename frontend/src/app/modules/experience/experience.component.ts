import { Component } from "@angular/core";
import { BaseComponent } from "../base.component";
import { Experience } from "../../shared/interfaces/experience.interface";
import { default as expCollection } from "./experience.json";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss',
    imports: [CommonModule]
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