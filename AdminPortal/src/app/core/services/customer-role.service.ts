import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { CustomerRoleAssignment } from '../../modules/setup/customer-role/models/customer-role.model';

@Injectable({ providedIn: 'root' })
export class CustomerRoleService {
  private readonly apiUrl = `${environment.apiBaseUrl}/customer-roles`;
  private readonly assignmentsSubject = new BehaviorSubject<CustomerRoleAssignment[]>([]);
  readonly assignments$: Observable<CustomerRoleAssignment[]> = this.assignmentsSubject.asObservable();

  getAssignments(): Observable<CustomerRoleAssignment[]> {
    // TODO: replace with -> this.http.get<CustomerRoleAssignment[]>(this.apiUrl)
    return this.assignments$;
  }

  saveAssignment(payload: Partial<CustomerRoleAssignment>): Observable<CustomerRoleAssignment> {
    // TODO: replace with -> this.http.post<CustomerRoleAssignment>(this.apiUrl, payload)
    const assignment: CustomerRoleAssignment = {
      id: `CRA-${Date.now()}`,
      customerId: payload.customerId ?? '',
      customerName: payload.customerName ?? '',
      companyName: payload.companyName ?? '',
      roleId: payload.roleId ?? '',
      roleName: payload.roleName ?? '',
      assignedServices: payload.assignedServices ?? [],
      assignedAt: new Date(),
      status: payload.status ?? 'Active',
    };
    const rest = this.assignmentsSubject.value.filter((item) => item.customerId !== assignment.customerId);
    this.assignmentsSubject.next([assignment, ...rest]);
    return of(assignment);
  }
}
