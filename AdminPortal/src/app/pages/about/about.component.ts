import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="page">
      <h1>About</h1>
      <p class="muted">AdminPortal is a template — replace with your mission and team story.</p>
    </div>
  `,
  styles: [
    `
      .page {
        max-width: 720px;
        margin: 0 auto;
        padding: 2rem 1rem;
      }
      .muted {
        color: var(--text-secondary);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
