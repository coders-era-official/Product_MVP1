import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-main',
  standalone: true,
  templateUrl: './customer-main.component.html',
  styleUrl: './customer-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerMainComponent {
  constructor(private readonly router: Router) {}

  goBack(): void {
    void this.router.navigate(['/setup']);
  }

  navigate(option: 'initiate' | 'view'): void {
    void this.router.navigate(['/setup/customer-main', option]);
  }
}
