import { Component } from "@angular/core";
import { BaseComponent } from "../base.component";

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss',
    imports: []
})
export class WorkComponent extends BaseComponent {

    constructor() {
        super();
        this.data = {
            title: 'Selected Work',
            subTitle: 'High-impact applications built with precision and care.'
        }
    }
}