import { Component, inject, input, OnInit, output, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Project } from "../../../../utils/interfaces/work.interface";
import { environment } from "../../../../../environments/environment";
import { PreloadService } from "../../../../services/preload.service";
import { ResourceOption } from "../../../../utils/enums/resource-option.enum";

@Component({
    selector: 'app-workcard',
    imports: [
        CommonModule
    ],
    templateUrl: './work-card.component.html',
    styleUrl: "./work-card.component.scss",
    host: {
        '(click)': 'closeDetailsByOutsideTouch($event)',
        '(document:keydown.escape)': 'closeDetails()'
    }
})
export class WorkCardComponent implements OnInit {

    data = input.required<Project>();
    readonly byChange = output<boolean>();

    private readonly preload = inject(PreloadService);

    protected cdnUrlBase = environment.API_STORAGE_URL.trim();
    protected readonly isLoading = signal(true);

    ngOnInit() {
        this.preload.preloadSingle({
            option: ResourceOption.IMG,
            url: `${environment.API_STORAGE_URL}${this.data().thumbnail}`
        }).then(() => this.isLoading.set(false));
    }

    closeDetails() {
        this.byChange.emit(true);
    }

    closeDetailsByOutsideTouch(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if(target.className === 'workcard-detail') {
            this.closeDetails();
        }
    }
}