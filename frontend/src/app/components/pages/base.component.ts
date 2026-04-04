import { Component } from "@angular/core";
import { BaseComponentData } from "../../utils/interfaces/base-data.interface";

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