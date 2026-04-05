import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Customer, CustomerPayload } from '../../modules/setup/customer-main/models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly apiUrl = `${environment.apiBaseUrl}/customers`;

  constructor(private readonly http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  initiateCustomer(payload: CustomerPayload): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, payload);
  }

  updateCustomer(id: number, payload: CustomerPayload): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, payload);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
