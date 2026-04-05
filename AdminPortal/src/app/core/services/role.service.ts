import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Role, RolePayload } from '../../modules/setup/role/models/role.model';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private readonly apiUrl = `${environment.apiBaseUrl}/roles`;

  constructor(private readonly http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  getRole(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }

  createRole(payload: RolePayload): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, payload);
  }

  updateRole(id: number, payload: RolePayload): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, payload);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
