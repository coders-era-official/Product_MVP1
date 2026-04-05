import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { ServiceCategory } from '../../modules/setup/service-category/models/service-category.model';

@Injectable({ providedIn: 'root' })
export class ServiceCategoryService {
  private readonly apiUrl = `${environment.apiBaseUrl}/service-categories`;
  private readonly categoriesSubject = new BehaviorSubject<ServiceCategory[]>(this.getMockCategories());
  readonly categories$: Observable<ServiceCategory[]> = this.categoriesSubject.asObservable();

  getCategories(): Observable<ServiceCategory[]> {
    // TODO: replace with -> this.http.get<ServiceCategory[]>(this.apiUrl)
    return this.categories$;
  }

  createCategory(payload: Partial<ServiceCategory>): Observable<ServiceCategory> {
    // TODO: replace with -> this.http.post<ServiceCategory>(this.apiUrl, payload)
    const current = this.categoriesSubject.value;
    const nextNumber = current.length === 0 ? 1 : Math.max(...current.map((item) => item.categoryNumber)) + 1;
    const category: ServiceCategory = {
      id: `CAT-${Date.now()}`,
      categoryNumber: nextNumber,
      categoryName: payload.categoryName ?? '',
      description: payload.description ?? '',
      status: payload.status ?? 'Active',
      createdAt: new Date(),
    };
    this.categoriesSubject.next([...current, category]);
    return of(category);
  }

  updateStatus(id: string, status: 'Active' | 'Inactive'): void {
    // TODO: replace with -> this.http.patch(`${this.apiUrl}/${id}`, { status })
    this.categoriesSubject.next(
      this.categoriesSubject.value.map((category) => (category.id === id ? { ...category, status } : category)),
    );
  }

  getNextCategoryNumber(): number {
    const current = this.categoriesSubject.value;
    return current.length === 0 ? 1 : Math.max(...current.map((item) => item.categoryNumber)) + 1;
  }

  private getMockCategories(): ServiceCategory[] {
    return [
      {
        id: 'CAT-001',
        categoryNumber: 1,
        categoryName: 'Hotel Management',
        description: 'Services for hotel and hospitality industry',
        status: 'Active',
        createdAt: new Date('2025-01-01'),
      },
      {
        id: 'CAT-002',
        categoryNumber: 2,
        categoryName: 'Hospital Management',
        description: 'Healthcare and hospital management services',
        status: 'Active',
        createdAt: new Date('2025-01-01'),
      },
      {
        id: 'CAT-003',
        categoryNumber: 3,
        categoryName: 'School Management',
        description: 'Education and school management services',
        status: 'Active',
        createdAt: new Date('2025-01-01'),
      },
      {
        id: 'CAT-004',
        categoryNumber: 4,
        categoryName: 'Restaurant Management',
        description: 'Food and restaurant management services',
        status: 'Active',
        createdAt: new Date('2025-02-01'),
      },
    ];
  }
}
