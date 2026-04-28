import { CommonModule } from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ObservationService } from "../../../services/observe.service";
import { Subscription } from "rxjs";
import { ThemeOption } from "../../../utils/enums/theme-option.enum";

@Component({
    selector: 'app-background',
    imports: [
        CommonModule
    ],
    templateUrl: './background.component.html',
    styleUrl: './background.component.scss',
})
export class BackgroundComponent implements OnInit, OnDestroy{

    private readonly observe = inject(ObservationService);

    protected activeTheme: ThemeOption = ThemeOption.DARK;
    protected themeEnum = ThemeOption;

    private subscriptionTheme$ = new Subscription();

    ngOnInit() {
        this.subscriptionTheme$ = this.observe.themeOption$.subscribe(theme => {
            this.activeTheme = theme;
        })
    }

    ngOnDestroy() {
        this.subscriptionTheme$.unsubscribe();
    }
}