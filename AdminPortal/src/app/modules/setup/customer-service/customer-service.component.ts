import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-service-master',
  standalone: true,
  templateUrl: './customer-service.component.html',
  styleUrl: './customer-service.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerServiceComponent {
  constructor(private readonly router: Router) {}

  goBack(): void {
    void this.router.navigate(['/setup']);
  }

  navigate(target: 'form' | 'list'): void {
    void this.router.navigate(['/setup/customer-service', target]);
  }
}
