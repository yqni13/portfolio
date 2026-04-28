import { CommonModule } from "@angular/common";
import { Component, input, OnInit } from "@angular/core";
import { ThemeOption } from "../../../utils/enums/theme-option.enum";

@Component({
    selector: 'app-badge',
    imports: [CommonModule],
    template: `
    <a class="badge" href="{{link()}}" target="_blank">
        <i class="icon-base" ngClass="{{icon()}}" [ngStyle]="customStyle ? customStyle : null"></i>
        <span>{{name()}}</span>
    </a>
    `,
    styleUrl: './badge.component.scss'
})
export class BadgeComponent implements OnInit {

    readonly icon = input.required<string>();
    readonly name = input.required<string>();
    readonly link = input.required<string>();
    readonly bgBlackAndWhite = input(false);

    protected selectedTheme: ThemeOption = ThemeOption.DARK;
    protected customStyle?: Record<string, string>;

    ngOnInit() {
        if(this.bgBlackAndWhite()) {
            this.customStyle = {'color': 'var(--theme-body-text)'};
        }
    }
}