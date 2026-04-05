import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-setup-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './setup-home.component.html',
  styleUrls: ['./setup-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupHomeComponent {
  protected readonly cards = [
    {
      title: 'Customer Main',
      body: 'Onboard and manage customers in your system from one setup workspace.',
      icon: '👥',
      link: '/setup/customer-main',
    },
    {
      title: 'Role',
      body: 'Define roles and the permissions available across your product.',
      icon: '🔐',
      link: '/setup/role',
    },
    {
      title: 'Service Category',
      body: 'Manage service categories such as hotel, hospital, school, and more.',
      icon: '🗂️',
      link: '/setup/service-category',
    },
    {
      title: 'Customer Service',
      body: 'Define services and link them to categories for assignment.',
      icon: '⚙️',
      link: '/setup/customer-service',
    },
    {
      title: 'Customer Role',
      body: 'Assign roles and services to a customer from one screen.',
      icon: '🔗',
      link: '/setup/customer-role',
    },
  ] as const;
}
