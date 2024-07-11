/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[yqni13Var]',
})
export class VarDirective {
    @Input()
    set yqni13Var(context: unknown) {
        this.context.$implicit = this.context.yqni13Var = context;

        if (!this.hasView) {
            this.vcRef.createEmbeddedView(this.templateRef, this.context);
            this.hasView = true;
        }
    }

    private context: {
        $implicit: unknown;
        yqni13Var: unknown;
    } = {
        $implicit: null,
        yqni13Var: null,
    };

    private hasView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private vcRef: ViewContainerRef
    ) {}
}