import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor() {
        //
    }

    navigateToTop(document: Document) {
        if(document.scrollingElement !== null) {
            document.scrollingElement.scrollTop = 0;
        }
    }

    navigateToHeader(id: string, document: Document) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}