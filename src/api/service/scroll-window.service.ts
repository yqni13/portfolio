/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ScrollService {

    getScrollMaxHeight(): number {        
        const body = document.body;
        const html = document.documentElement;
    
        const documentHeight = Math.max(
            body.scrollHeight,
            body.clientHeight,
            html.clientHeight,
            html.scrollHeight,
            html.clientHeight
        );

        const windowHeight = window.innerHeight;
        
        return documentHeight - windowHeight;
    }
}