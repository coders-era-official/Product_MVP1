import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly features = [
    {
      title: 'Structured paths',
      body: 'Feature-based folders, lazy routes, and shared UI primitives ready to scale.',
      icon: '📐',
    },
    {
      title: 'Dark-first system',
      body: 'Tokens, typography, and motion tuned for long study sessions and clarity.',
      icon: '🌙',
    },
    {
      title: 'Setup wizard',
      body: 'Guide users through environment, database, and auth in a guided flow.',
      icon: '⚡',
    },
  ] as const;

  protected readonly stats = [
    { value: '10k+', label: 'Lessons tracked' },
    { value: '120+', label: 'Countries' },
    { value: '4.9', label: 'Avg. satisfaction' },
  ] as const;
}
