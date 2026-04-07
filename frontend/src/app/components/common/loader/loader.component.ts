import { Component } from "@angular/core";

@Component({
    selector: 'app-loader',
    template: `
    <div class="loader-wrapper">
        <div class="loader">
            <span>Loading...</span>
        </div>
    </div>
    `,
    styleUrl: './loader.component.scss',
})
export class LoaderComponent {}