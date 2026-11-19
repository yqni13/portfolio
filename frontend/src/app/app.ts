import { afterNextRender, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/common/navbar/navbar.component';
import { Footer } from './components/common/footer/footer.component';
import { HeroComponent } from './components/pages/hero/hero.component';
import { WorkComponent } from './components/pages/work/work.component';
import { SkillsComponent } from './components/pages/skills/skills.component';
import { AboutComponent } from './components/pages/about/about.component';
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
import { PreloadService } from './services/preload.service';
import { default as workData } from './data/work.json';
import { ResourceOption } from './utils/enums/resource-option.enum';
import { PreloadData } from './utils/interfaces/preload.interface';
import { Project } from './utils/interfaces/work.interface';
import { environment } from '../environments/environment';
import { InitComponent } from './components/common/init/init.component';
import { TransitionService } from './services/transition.service';
import { EasingFnOption } from './utils/enums/easing-fn.enum';
import { DeviceOption } from './utils/enums/device-option.enum';
import { DeviceService } from './services/device.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.html',
	styleUrl: './app.scss',
	imports: [
		InitComponent,
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
export class App implements OnInit {

	private readonly device = inject(DeviceService);
	private readonly preload = inject(PreloadService);
	private readonly navigation = inject(NavigationService);
	private readonly transition = inject(TransitionService);
	protected readonly observe = inject(ObservationService);
	protected readonly notifyModal = inject(NotifyModalService);

	protected readonly title = signal('portfolio');
	protected readonly scrolledToBottom = signal(false);
	protected readonly isInitialized = signal(false);
	protected readonly isDevEnv = computed(() => environment.ENV_MODE === 'development');
	private readonly isMobileDevice = computed(() => this.observe.activeDevice() === DeviceOption.MOBILE);

	protected readonly IndicatorOptionEnum = IndicatorOption;

	private delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	constructor() {
		afterNextRender(() => {
			this.handleScrollDownIndicator();
		})
	}

	async ngOnInit() {
		this.device.setDeviceInfo();

		const images: PreloadData[] = this.mapImagesToPreload();
		this.preload.preloadMultiple(images);

		if (!this.isDevEnv()) {
			await this.delay(this.isMobileDevice() ? 5750 : 6250);
			this.closeInitAnimation();
		}
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

	private mapPreloadWorkCardThumbnails(): PreloadData[] {
		const preloadData: PreloadData[] = [];
		(workData as Project[]).forEach((entry: Project) => {
			preloadData.push({
				option: ResourceOption.IMG,
				url: `${environment.API_STORAGE_URL}${entry.thumbnail}`
			});
		})
		return preloadData;
	}

	private mapImagesToPreload(): PreloadData[] {
		const preloadData = this.mapPreloadWorkCardThumbnails();
		preloadData.push({
			option: ResourceOption.IMG, url: 'yqni13_logo.webp'
		});

		return preloadData;
	}

	private closeInitAnimation() {
		const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!document.startViewTransition || reduceMotion) {
			this.isInitialized.set(true);
			return;
		}

		this.transition.applyRippleEffect({
			fn: () => this.isInitialized.set(true),
			duration: 5000,
			easing: EasingFnOption.EASE_IN
		});
	}
}
