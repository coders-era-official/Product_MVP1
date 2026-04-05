import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  CustomerRoleAssignment,
  CustomerRolePayload,
} from '../../modules/setup/customer-role/models/customer-role.model';

@Injectable({ providedIn: 'root' })
export class CustomerRoleService {
  private readonly apiUrl = `${environment.apiBaseUrl}/customer-roles`;

  constructor(private readonly http: HttpClient) {}

  getAssignments(): Observable<CustomerRoleAssignment[]> {
    return this.http.get<CustomerRoleAssignment[]>(this.apiUrl);
  }

  saveAssignment(payload: CustomerRolePayload): Observable<CustomerRoleAssignment> {
    return this.http.post<CustomerRoleAssignment>(this.apiUrl, payload);
  }

  updateAssignment(id: number, payload: CustomerRolePayload): Observable<CustomerRoleAssignment> {
    return this.http.put<CustomerRoleAssignment>(`${this.apiUrl}/${id}`, payload);
  }

  deleteAssignment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
