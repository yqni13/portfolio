import { NgModule } from "@angular/core";
import { PortfolioMiniComponent } from "./mini/portfolio-mini.component";
import { PortfolioFrontendComponent } from "./frontend/portfolio-frontend.component";
import { PortfolioRoutingModule } from "./portfolio-routing.module";
import { CommonModule } from "@angular/common";
import { PortfolioAllComponent } from "./all/portfolio-all.component";

@NgModule({
    declarations: [
        PortfolioAllComponent,
        PortfolioMiniComponent,
        PortfolioFrontendComponent,
    ],
    imports: [
        CommonModule,
        PortfolioRoutingModule
    ]
})
export class PortfolioModule {}