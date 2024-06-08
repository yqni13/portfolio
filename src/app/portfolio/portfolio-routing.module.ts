import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PortfolioModulesComponent } from "./mini/portfolio-modules.component";
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
        path: 'modules',
        component: PortfolioModulesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PortfolioRoutingModule { }