import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CvComponent } from './cv/cv.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  {
    path: '',
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
    path: 'mywork',
    component: PortfolioComponent,
    title: 'Portfolio',
  },
  {
    path: '**', // if parameter is unknown (manually changed)
    redirectTo: '',
    title: 'Home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
