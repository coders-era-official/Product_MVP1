import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-docs',
  standalone: true,
  template: `
    <div class="page">
      <h1>Documentation</h1>
      <p class="muted">Placeholder page — wire your content or CMS here.</p>
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
export class DocsComponent {}
