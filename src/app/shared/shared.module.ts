import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { TemplatePortfolioCardComponent } from "../templates/portfolio-card/template-portfolio-card.component";
import { FormsModule } from "@angular/forms";
import { Yqni13CommonModule } from "../common/yqni13-common.modules";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Yqni13CommonModule
    ],
    exports: [
        TemplatePortfolioCardComponent,
        Yqni13CommonModule
    ],
    declarations: [TemplatePortfolioCardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}