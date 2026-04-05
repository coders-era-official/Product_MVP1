import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('routeFade', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('300ms ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MainLayoutComponent {
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  /** Increments on each navigation end to re-run the fade transition. */
  protected routeAnim = 0;

  constructor() {
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
      this.routeAnim++;
      this.cdr.markForCheck();
    });
  }
}
