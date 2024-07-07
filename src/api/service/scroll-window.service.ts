/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ScrollService {

    getScrollMaxHeight(body: any, html: any, currentWindow: any): number {        
    
        const documentHeight = Math.max(
            body.scrollHeight,
            body.clientHeight,
            html.clientHeight,
            html.scrollHeight,
            html.clientHeight
        );

        const windowHeight = currentWindow.innerHeight;
        
        return documentHeight - windowHeight;
    }
}