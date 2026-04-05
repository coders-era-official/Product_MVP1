import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  CustomerService,
  CustomerServicePayload,
} from '../../modules/setup/customer-service/models/customer-service.model';

@Injectable({ providedIn: 'root' })
export class CustomerServiceService {
  private readonly apiUrl = `${environment.apiBaseUrl}/customer-services`;

  constructor(private readonly http: HttpClient) {}

  getServices(): Observable<CustomerService[]> {
    return this.http.get<CustomerService[]>(this.apiUrl);
  }

  createService(payload: CustomerServicePayload): Observable<CustomerService> {
    return this.http.post<CustomerService>(this.apiUrl, payload);
  }

  updateService(id: number, payload: CustomerServicePayload): Observable<CustomerService> {
    return this.http.put<CustomerService>(`${this.apiUrl}/${id}`, payload);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
