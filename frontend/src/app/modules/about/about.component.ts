import { Component } from "@angular/core";
import { BaseComponent } from "../base.component";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
    imports: []
})
export class AboutComponent extends BaseComponent {

    constructor() {
        super();
        this.data = {
            title: 'About',
            subTitle: 'safasfds'
        }
    }
}