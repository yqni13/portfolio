import { Component } from "@angular/core";
import { default as metaData } from "../../../../../package.json";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: []
})
export class Footer {

    protected version: string;

    constructor() {
        this.version = metaData.version;
    }
}