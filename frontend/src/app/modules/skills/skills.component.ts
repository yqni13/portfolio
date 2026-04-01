import { Component } from "@angular/core";
import { default as skillset } from "./skills.json";
import { SkillCollection } from "../../shared/interfaces/skill.interface";
import { BadgeComponent } from "../../common/components/badge/badge.component";

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss',
    imports: [BadgeComponent]
})
export class SkillsComponent {

    protected skills: SkillCollection[] = skillset;

    constructor() {
        //
    }
}