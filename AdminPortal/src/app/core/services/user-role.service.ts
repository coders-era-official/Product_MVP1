import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { UserRoleAssignment, UserRoleAssignmentPayload } from '../../modules/setup/user-role/models/user-role.model';

interface UserRoleResponse {
  id: number;
  userId: number;
  userCode: string;
  userName: string;
  roleId: number;
  roleName: string;
  roleCode: string;
  customerId: number;
  customerCode: string;
  customerName: string;
  companyName: string;
  assignedServices: Array<{
    serviceId: number;
    serviceNumber: number;
    serviceName: string;
    categoryName: string;
  }>;
  assignedAt: string;
  status: 'Active' | 'Inactive';
}

@Injectable({ providedIn: 'root' })
export class UserRoleService {
  private readonly apiUrl = `${environment.apiBaseUrl}/user-roles`;

  constructor(private readonly http: HttpClient) {}

  getAssignments(): Observable<UserRoleAssignment[]> {
    return this.http.get<UserRoleResponse[]>(this.apiUrl).pipe(map((items) => items.map((item) => this.toAssignment(item))));
  }

  saveAssignment(payload: UserRoleAssignmentPayload): Observable<UserRoleAssignment> {
    return this.http
      .post<UserRoleResponse>(this.apiUrl, {
        userId: Number(payload.userId),
        roleId: Number(payload.roleId),
        customerId: Number(payload.customerId),
        serviceIds: payload.assignedServices.map((service) => Number(service.serviceId)),
        status: payload.status,
      })
      .pipe(map((item) => this.toAssignment(item)));
  }

  private toAssignment(item: UserRoleResponse): UserRoleAssignment {
    return {
      id: String(item.id),
      userId: String(item.userId),
      userCode: item.userCode,
      userName: item.userName,
      roleId: String(item.roleId),
      roleName: item.roleName,
      roleCode: item.roleCode,
      customerId: String(item.customerId),
      customerCode: item.customerCode,
      customerName: item.customerName,
      companyName: item.companyName,
      assignedServices: item.assignedServices.map((service) => ({
        serviceId: String(service.serviceId),
        serviceNumber: service.serviceNumber,
        serviceName: service.serviceName,
        categoryName: service.categoryName,
      })),
      assignedAt: new Date(item.assignedAt),
      status: item.status,
    };
  }
}
