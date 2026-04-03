import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/common/navbar/navbar.component';
import { AboutComponent } from './components/pages/about/about.component';
import { Footer } from './components/common/footer/footer.component';
import { HeroComponent } from './components/pages/hero/hero.component';
import { WorkComponent } from './components/pages/work/work.component';
import { SkillsComponent } from './components/pages/skills/skills.component';
import { ExperienceComponent } from './components/pages/experience/experience.component';
import { ContactComponent } from './components/pages/contact/contact.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.html',
	styleUrl: './app.scss',
	imports: [
		Navbar,
		HeroComponent,
		WorkComponent,
		SkillsComponent,
		AboutComponent,
		ExperienceComponent,
		ContactComponent,
		Footer,
		RouterOutlet
	],
})
export class App {

	protected readonly title = signal('portfolio');


	constructor() {
		//
	}

}
