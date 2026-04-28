import { Component } from "@angular/core";
import { BaseComponentData } from "../../utils/interfaces/base-data.interface";

@Component({
    selector: 'app-base',
    template: ``
})
export class BaseComponent {

    protected data: BaseComponentData = { title: '', subTitle: '' };

}