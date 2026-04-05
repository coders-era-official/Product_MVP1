import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-category',
  standalone: true,
  templateUrl: './service-category.component.html',
  styleUrl: './service-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCategoryComponent {
  constructor(private readonly router: Router) {}

  goBack(): void {
    void this.router.navigate(['/setup']);
  }

  navigate(target: 'form' | 'list'): void {
    void this.router.navigate(['/setup/service-category', target]);
  }
}
