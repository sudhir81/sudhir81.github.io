import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent implements AfterViewInit, OnDestroy {
  /** Selector for every tile/card type across the site. */
  private static readonly SELECTOR =
    '.card, .tile, .stat-tile, .partner-card, .proj-card, .project-card';
  /** Catch-up speed; tuned for ~0.25s settle at 60fps. */
  private static readonly EASE = 0.18;
  /** How strongly tiles lag relative to the page. */
  private static readonly INTENSITY = 0.6;
  /** px cap so fast scrolling/flicks stay subtle. */
  private static readonly MAX_LAG = 26;

  private nodes: HTMLElement[] = [];
  private smooth = 0;
  private rafId: number | null = null;

  constructor(private router: Router, private zone: NgZone) {}

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.smooth = window.scrollY || window.pageYOffset || 0;
    this.refreshNodes();

    // Re-scan for tile/card elements after every route change, since the
    // routed page content swaps out under <router-outlet>.
    this.router.events.subscribe(() => this.refreshNodes());

    // Run the animation loop outside Angular's zone so it doesn't trigger
    // change detection on every frame.
    this.zone.runOutsideAngular(() => {
      this.rafId = requestAnimationFrame(this.tick);
    });
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private refreshNodes(): void {
    // Defer slightly so the new route's DOM has actually rendered.
    setTimeout(() => {
      this.nodes = Array.prototype.slice.call(
        document.querySelectorAll(AppComponent.SELECTOR)
      );
    }, 0);
  }

  private tick = (): void => {
    const target = window.scrollY || window.pageYOffset || 0;
    this.smooth += (target - this.smooth) * AppComponent.EASE;

    let lag = (target - this.smooth) * AppComponent.INTENSITY;
    if (lag > AppComponent.MAX_LAG) lag = AppComponent.MAX_LAG;
    if (lag < -AppComponent.MAX_LAG) lag = -AppComponent.MAX_LAG;

    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].style.setProperty('--parallax', lag.toFixed(2) + 'px');
    }

    this.rafId = requestAnimationFrame(this.tick);
  };
}
