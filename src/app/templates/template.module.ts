import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { TemplatePortfolioCardComponent } from "./portfolio-card/template-portfolio-card.component";

@NgModule({
    imports: [CommonModule],
    exports: [TemplatePortfolioCardComponent],
    declarations: [TemplatePortfolioCardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TemplateModule {}