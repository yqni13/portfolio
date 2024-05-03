import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PortfolioMiniComponent } from "./mini/portfolio-mini.component";
import { PortfolioFrontendComponent } from "./frontend/portfolio-frontend.component";
import { PortfolioAllComponent } from "./all/portfolio-all.component";
import { PortfolioFullstackComponent } from "./fullstack/portfolio-fullstack.component";


const routes: Routes = [
    {
        path: 'all',
        component: PortfolioAllComponent,
    },
    {
        path: 'frontend',
        component: PortfolioFrontendComponent,
    },
    {
        path: 'fullstack',
        component: PortfolioFullstackComponent,
    },
    {
        path: 'mini',
        component: PortfolioMiniComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PortfolioRoutingModule { }