import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../core/services/role.service';
import type { Role } from '../../models/role.model';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListComponent implements OnInit {
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

  onSearch(): void {
    this.applyFilter();
  }

  toggleStatus(role: Role): void {
    this.roleService.updateRoleStatus(role.id, role.status === 'Active' ? 'Inactive' : 'Active');
  }

  goBack(): void {
    void this.router.navigate(['/setup/role']);
  }

  private applyFilter(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredRoles = this.roles.filter((role) => {
      const haystack = `${role.roleName} ${role.roleCode}`.toLowerCase();
      return query === '' || haystack.includes(query);
    });
    this.cdr.markForCheck();
  }
}
