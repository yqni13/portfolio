import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ThemeOption } from "../../../shared/enums/theme-option.enum";

@Component({
    selector: 'app-badge',
    template: `
    <a class="badge-wrapper" href="{{link}}" target="_blank">
        <i class="icon-base" ngClass="{{icon}}" [ngStyle]="customStyle ? customStyle : null"></i>
        <span>{{name}}</span>
    </a>
    `,
    styleUrl: './badge.component.scss',
    imports: [CommonModule]
})
export class BadgeComponent implements OnInit {

    @Input() icon: string;
    @Input() name: string;
    @Input() link: string;
    @Input() hasBlackWhiteBg: boolean;

    protected selectedTheme: ThemeOption;
    protected customStyle?: Record<string, string>;


    constructor() {
        this.icon = '';
        this.name = '';
        this.link = '';
        this.hasBlackWhiteBg = false;

        this.selectedTheme = ThemeOption.DARK;
    }

    ngOnInit() {
        if(this.hasBlackWhiteBg) {
            this.customStyle = {'color': 'var(--theme-body-text)'};
        }
    }
}