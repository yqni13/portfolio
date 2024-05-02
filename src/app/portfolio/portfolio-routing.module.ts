import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PortfolioMiniComponent } from "./mini/portfolio-mini.component";
import { PortfolioFrontendComponent } from "./frontend/portfolio-frontend.component";
import { PortfolioAllComponent } from "./all/portfolio-all.component";


const routes: Routes = [
    {
        path: 'all',
        component: PortfolioAllComponent,
    },
    {
        path: 'mini',
        component: PortfolioMiniComponent,
    },
    {
        path: 'frontend',
        component: PortfolioFrontendComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PortfolioRoutingModule { }