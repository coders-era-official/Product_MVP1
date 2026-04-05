import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  ServiceCategory,
  ServiceCategoryPayload,
} from '../../modules/setup/service-category/models/service-category.model';

@Injectable({ providedIn: 'root' })
export class ServiceCategoryService {
  private readonly apiUrl = `${environment.apiBaseUrl}/service-categories`;

  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(this.apiUrl);
  }

  createCategory(payload: ServiceCategoryPayload): Observable<ServiceCategory> {
    return this.http.post<ServiceCategory>(this.apiUrl, payload);
  }

  updateCategory(id: number, payload: ServiceCategoryPayload): Observable<ServiceCategory> {
    return this.http.put<ServiceCategory>(`${this.apiUrl}/${id}`, payload);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
