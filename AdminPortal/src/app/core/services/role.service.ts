import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Role } from '../../modules/setup/role/models/role.model';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private readonly apiUrl = `${environment.apiBaseUrl}/roles`;
  private readonly rolesSubject = new BehaviorSubject<Role[]>(this.getMockRoles());
  readonly roles$: Observable<Role[]> = this.rolesSubject.asObservable();

  getRoles(): Observable<Role[]> {
    // TODO: replace with -> this.http.get<Role[]>(this.apiUrl)
    return this.roles$;
  }

  createRole(payload: Partial<Role>): Observable<Role> {
    // TODO: replace with -> this.http.post<Role>(this.apiUrl, payload)
    const newRole: Role = {
      id: `ROLE-${Date.now()}`,
      roleName: payload.roleName ?? '',
      roleCode: (payload.roleCode ?? '').toUpperCase(),
      description: payload.description ?? '',
      permissions: payload.permissions ?? [],
      status: payload.status ?? 'Active',
      createdAt: new Date(),
    };
    this.rolesSubject.next([newRole, ...this.rolesSubject.value]);
    return of(newRole);
  }

  updateRoleStatus(id: string, status: 'Active' | 'Inactive'): void {
    // TODO: replace with -> this.http.patch(`${this.apiUrl}/${id}`, { status })
    this.rolesSubject.next(this.rolesSubject.value.map((role) => (role.id === id ? { ...role, status } : role)));
  }

  private getMockRoles(): Role[] {
    return [
      {
        id: 'ROLE-001',
        roleName: 'Super Admin',
        roleCode: 'SUPER_ADMIN',
        description: 'Full access to all modules',
        permissions: ['read', 'write', 'delete', 'manage'],
        status: 'Active',
        createdAt: new Date('2025-01-01'),
      },
      {
        id: 'ROLE-002',
        roleName: 'Manager',
        roleCode: 'MANAGER',
        description: 'Can manage customers and services',
        permissions: ['read', 'write'],
        status: 'Active',
        createdAt: new Date('2025-01-15'),
      },
      {
        id: 'ROLE-003',
        roleName: 'Viewer',
        roleCode: 'VIEWER',
        description: 'Read-only access',
        permissions: ['read'],
        status: 'Active',
        createdAt: new Date('2025-02-01'),
      },
    ];
  }
}
