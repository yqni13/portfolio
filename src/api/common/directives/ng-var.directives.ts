/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[yqni13NgVar]',
})
export class VarDirective {
    @Input()
    set yqni13NgVar(context: unknown) {
        this.context.$implicit = this.context.yqni13NgVar = context;

        if (!this.hasView) {
            this.vcRef.createEmbeddedView(this.templateRef, this.context);
            this.hasView = true;
        }
    }

    private context: {
        $implicit: unknown;
        yqni13NgVar: unknown;
    } = {
        $implicit: null,
        yqni13NgVar: null,
    };

    private hasView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private vcRef: ViewContainerRef
    ) {}
}