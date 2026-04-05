import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  standalone: true,
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleComponent {
  constructor(private readonly router: Router) {}

  goBack(): void {
    void this.router.navigate(['/setup']);
  }

  navigate(target: 'form' | 'list'): void {
    void this.router.navigate(['/setup/role', target]);
  }
}
