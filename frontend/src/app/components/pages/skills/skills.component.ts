import { Component } from "@angular/core";
import { default as skillset } from "../../../data/skills.json";
import { BadgeComponent } from "../../common/badge/badge.component";
import { BaseComponent } from "../base.component";
import { SkillCollection } from "../../../utils/interfaces/skill.interface";

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss',
    imports: [BadgeComponent]
})
export class SkillsComponent extends BaseComponent {

    protected skills: SkillCollection[] = skillset;

    constructor() {
        super();
        this.data = {
            title: 'Skills & Expertise',
            subTitle: 'Technologies and tools I am proficient with and use to build applications.'
        }
    }
}