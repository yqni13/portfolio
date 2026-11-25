import { Component, input } from "@angular/core";
import { ExtendedContributionData } from "../../../api/interfaces/github.api.interface";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-contribution',
    imports: [
        CommonModule
    ],
    templateUrl: './contribution.component.html',
    styleUrl: './contribution.component.scss'
})
export class ContributionComponent {

    readonly data = input.required<ExtendedContributionData>();
    readonly isLoaded = input(false);

}