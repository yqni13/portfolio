import { Component } from "@angular/core";
import { BaseComponentData } from "../shared/interfaces/base-data.interface";

@Component({
    selector: 'app-base',
    template: ``,
    imports: []
})
export class BaseComponent {

    protected data: BaseComponentData;

    constructor() {
        this.data = {
            title: '',
            subTitle: ''
        };
    }
}