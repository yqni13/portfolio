import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/common/navbar/navbar.component';
import { AboutComponent } from './components/pages/about/about.component';
import { Footer } from './components/common/footer/footer.component';
import { HeroComponent } from './components/pages/hero/hero.component';
import { WorkComponent } from './components/pages/work/work.component';
import { SkillsComponent } from './components/pages/skills/skills.component';
import { ExperienceComponent } from './components/pages/experience/experience.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { NotifyModalComponent } from './components/common/modal/notify-modal/notify-modal.component';
import { NotifyModalService } from './services/notify-modal.service';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './components/common/background/background.component';
import { ScrollDownIndicatorComponent } from './components/common/indicator/scroll-down/scroll-down.indicator.component';
import { NavigationService } from './services/navigation.service';
import { IndicatorOption } from './utils/enums/indicator-option.enum';
import { ObservationService } from './services/observe.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.html',
	styleUrl: './app.scss',
	imports: [
		BackgroundComponent,
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
		NotifyModalComponent,
		ScrollDownIndicatorComponent
	],
})
export class App {

	readonly observe = inject(ObservationService);
	readonly notifyModal = inject(NotifyModalService);
	private readonly navigation = inject(NavigationService);

	protected readonly title = signal('portfolio');
	protected readonly scrolledToBottom = signal(false);
	protected readonly IndicatorOptionEnum = IndicatorOption;

	constructor() {
		afterNextRender(() => {
			this.handleScrollDownIndicator();
		})
	}

	private handleScrollDownIndicator() {
		const scrollHandler = () => {
			const max = this.navigation.getScrollMaxHeight();
			const scrolled = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			this.scrolledToBottom.set(Math.ceil(scrolled) >= max);
		};

		window.addEventListener('scroll', scrollHandler, { passive: true });
		// No cleanup/destroyref necessary as root component does not get destroyed.
	}
}
