import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/common/navbar/navbar.component';
import { AboutComponent } from './components/pages/about/about.component';
import { Footer } from './components/common/footer/footer.component';
import { HeroComponent } from './components/pages/hero/hero.component';
import { WorkComponent } from './components/pages/work/work.component';
import { SkillsComponent } from './components/pages/skills/skills.component';
import { ExperienceComponent } from './components/pages/experience/experience.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { NavigationService } from './services/navigation.service';
import { NotifyModalComponent } from './components/common/modal/notify-modal/notify-modal.component';
import { NotifyModalService } from './services/notify-modal.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: './app.html',
	styleUrl: './app.scss',
	imports: [
		CommonModule,
		Navbar,
		HeroComponent,
		WorkComponent,
		SkillsComponent,
		AboutComponent,
		ExperienceComponent,
		ContactComponent,
		Footer,
		RouterOutlet,
		NotifyModalComponent
	],
})
export class App implements OnInit {

	protected readonly title = signal('portfolio');
	private sectionIds: string[];

	constructor(
		public readonly notifyModal: NotifyModalService,
		private readonly navigate: NavigationService
	) {
		this.sectionIds = ["head-home", "head-work", "head-skills", "head-about", "head-experience", "head-contact"];
	}

	ngOnInit() {
		this.navigate.observe(this.sectionIds);
	}
}
