import { NgModule } from "@angular/core";
import { PortfolioMiniComponent } from "./mini/portfolio-mini.component";
import { PortfolioFrontendComponent } from "./frontend/portfolio-frontend.component";
import { PortfolioRoutingModule } from "./portfolio-routing.module";
import { CommonModule } from "@angular/common";
import { PortfolioAllComponent } from "./all/portfolio-all.component";
import { PortfolioFullstackComponent } from "./fullstack/portfolio-fullstack.component";

@NgModule({
    declarations: [
        PortfolioAllComponent,
        PortfolioMiniComponent,
        PortfolioFrontendComponent,
        PortfolioFullstackComponent
    ],
    imports: [
        CommonModule,
        PortfolioRoutingModule
    ]
})
export class PortfolioModule {}