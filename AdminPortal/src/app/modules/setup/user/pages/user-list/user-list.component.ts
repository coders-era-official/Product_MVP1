import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import type { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery = '';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.applyFilter();
      this.cdr.markForCheck();
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.applyFilter();
  }

  toggleStatus(user: User): void {
    this.userService.updateStatus(user.id, user.status === 'Active' ? 'Inactive' : 'Active').subscribe((updatedUser) => {
      this.users = this.users.map((item) => (item.id === updatedUser.id ? updatedUser : item));
      this.applyFilter();
      this.cdr.markForCheck();
    });
  }

  getInitials(user: User): string {
    return `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase();
  }

  goBack(): void {
    void this.router.navigate(['/setup/user']);
  }

  private applyFilter(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredUsers = this.users.filter((user) => {
      const haystack = `${user.userCode} ${user.firstName} ${user.lastName} ${user.email} ${user.phone}`.toLowerCase();
      return query === '' || haystack.includes(query);
    });
    this.cdr.markForCheck();
  }
}
