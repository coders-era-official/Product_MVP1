import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { User } from '../../modules/setup/user/models/user.model';

interface UserResponse {
  id: number;
  userCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = `${environment.apiBaseUrl}/users`;

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<UserResponse[]>(this.apiUrl).pipe(map((users) => users.map((user) => this.toUser(user))));
  }

  createUser(payload: Partial<User>): Observable<User> {
    return this.http
      .post<UserResponse>(this.apiUrl, {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        status: payload.status ?? 'Active',
      })
      .pipe(map((user) => this.toUser(user)));
  }

  updateStatus(id: string, status: 'Active' | 'Inactive'): Observable<User> {
    return this.http.patch<UserResponse>(`${this.apiUrl}/${id}/status`, { status }).pipe(map((user) => this.toUser(user)));
  }

  private toUser(user: UserResponse): User {
    return {
      id: String(user.id),
      userCode: user.userCode,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      password: '••••••••',
      status: user.status,
      createdAt: new Date(user.createdAt),
    };
  }
}
