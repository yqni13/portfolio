import { Component, input } from "@angular/core";
import { IndicatorOption } from "../../../../utils/enums/indicator-option.enum";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-scrolldown-indicator',
    imports: [
        CommonModule
    ],
    template: `
    <div class="scrolldown-indicator-wrapper">
        <a [ngClass]="'a-option-' + option()">
            <span [ngClass]="'span-option-' + option()"></span>
            <span [ngClass]="'span-option-' + option()"></span>
            <span [ngClass]="'span-option-' + option()"></span>
        </a>
    </div>
    `,
    styleUrl: './scroll-down.indicator.component.scss'
})
export class ScrollDownIndicatorComponent {

    readonly option = input<IndicatorOption>(IndicatorOption.MAIN);

}