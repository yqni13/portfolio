import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './modules/hero/hero.component';
import { Navbar } from './common/components/navbar/navbar.component';
import { WorkComponent } from './modules/work/work.component';
import { SkillsComponent } from './modules/skills/skills.component';
import { AboutComponent } from './modules/about/about.component';
import { ExperienceComponent } from './modules/experience/experience.component';
import { ContactComponent } from './modules/contact/contact.component';
import { Footer } from './common/components/footer/footer.component';

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
