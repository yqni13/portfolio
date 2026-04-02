import { Component } from "@angular/core";
import { BaseComponent } from "../base.component";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    imports: []
})
export class ContactComponent extends BaseComponent {

    constructor() {
        super();
        this.data = {
            title: 'Contact',
            subTitle: 'Get in touch.'
        };
    }
}