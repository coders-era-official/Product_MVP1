import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RoleService } from '../../../../../core/services/role.service';
import type { Role } from '../../models/role.model';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterLink, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListComponent implements OnInit {
  readonly displayedColumns = ['roleCode', 'roleName', 'permissions', 'status', 'createdAt'];
  roles: Role[] = [];
  filteredRoles: Role[] = [];
  searchQuery = '';

  constructor(
    private readonly roleService: RoleService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles;
      this.applyFilter();
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.applyFilter();
  }

  toggleStatus(role: Role): void {
    const payload = {
      roleName: role.roleName,
      roleCode: role.roleCode,
      description: role.description,
      permissions: role.permissions,
      status: role.status === 'Active' ? 'Inactive' : 'Active',
    } as const;

    this.roleService.updateRole(role.id, payload).subscribe((updatedRole) => {
      this.roles = this.roles.map((item) => (item.id === updatedRole.id ? updatedRole : item));
      this.applyFilter();
    });
  }

  goBack(): void {
    void this.router.navigate(['/setup/role']);
  }

  private applyFilter(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredRoles = this.roles.filter((role) => {
      const haystack = `${role.roleName} ${role.roleCode} ${role.permissions.join(' ')}`.toLowerCase();
      return query === '' || haystack.includes(query);
    });
    this.cdr.markForCheck();
  }
}
