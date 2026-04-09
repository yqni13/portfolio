import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ObservationService } from "../../../services/observe.service";
import { Subscription } from "rxjs";
import { ThemeOption } from "../../../utils/enums/theme-option.enum";

@Component({
    selector: 'app-background',
    templateUrl: './background.component.html',
    styleUrl: './background.component.scss',
    imports: [
        CommonModule
    ]
})
export class BackgroundComponent implements OnInit, OnDestroy{

    protected activeTheme: ThemeOption;
    protected themeEnum = ThemeOption;

    private subscriptionTheme$: Subscription;

    constructor(
        private readonly observe: ObservationService
    ) {
        this.activeTheme = ThemeOption.DARK;
        this.subscriptionTheme$ = new Subscription();
    }

    ngOnInit() {
        this.subscriptionTheme$ = this.observe.themeOption$.subscribe(theme => {
            this.activeTheme = theme;
        })
    }

    ngOnDestroy() {
        this.subscriptionTheme$.unsubscribe();
    }
}