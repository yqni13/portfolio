import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CvComponent } from './cv/cv.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioFrontendComponent } from './portfolio/frontend/portfolio-frontend.component';
import { PortfolioModulesComponent } from './portfolio/modules/portfolio-modules.component';
import { PortfolioAllComponent } from './portfolio/all/portfolio-all.component';
import { PortfolioFullstackComponent } from './portfolio/fullstack/portfolio-fullstack.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About'
  },
  {
    path: 'cv',
    component: CvComponent,
    title: 'CV'
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    title: 'Portfolio',
    children: [
      {
        path: '',
        redirectTo: '/portfolio/all',
        pathMatch: 'full'
      },
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
        component: PortfolioModulesComponent
      }
    ]
  },
  {
    path: '**', // if parameter is unknown (manually changed)
    redirectTo: '/home',
    title: 'Home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
