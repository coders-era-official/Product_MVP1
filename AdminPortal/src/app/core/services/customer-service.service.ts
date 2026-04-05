import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { CustomerService } from '../../modules/setup/customer-service/models/customer-service.model';

@Injectable({ providedIn: 'root' })
export class CustomerServiceService {
  private readonly apiUrl = `${environment.apiBaseUrl}/customer-services`;
  private readonly servicesSubject = new BehaviorSubject<CustomerService[]>(this.getMockServices());
  readonly services$: Observable<CustomerService[]> = this.servicesSubject.asObservable();

  getServices(): Observable<CustomerService[]> {
    // TODO: replace with -> this.http.get<CustomerService[]>(this.apiUrl)
    return this.services$;
  }

  createService(payload: Partial<CustomerService>): Observable<CustomerService> {
    // TODO: replace with -> this.http.post<CustomerService>(this.apiUrl, payload)
    const current = this.servicesSubject.value;
    const nextNumber = current.length === 0 ? 1 : Math.max(...current.map((item) => item.serviceNumber)) + 1;
    const service: CustomerService = {
      id: `SVC-${Date.now()}`,
      serviceNumber: nextNumber,
      serviceName: payload.serviceName ?? '',
      categoryId: payload.categoryId ?? '',
      categoryName: payload.categoryName ?? '',
      description: payload.description ?? '',
      status: payload.status ?? 'Active',
      createdAt: new Date(),
    };
    this.servicesSubject.next([...current, service]);
    return of(service);
  }

  updateStatus(id: string, status: 'Active' | 'Inactive'): void {
    // TODO: replace with -> this.http.patch(`${this.apiUrl}/${id}`, { status })
    this.servicesSubject.next(this.servicesSubject.value.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  getNextServiceNumber(): number {
    const current = this.servicesSubject.value;
    return current.length === 0 ? 1 : Math.max(...current.map((item) => item.serviceNumber)) + 1;
  }

  private getMockServices(): CustomerService[] {
    return [
      {
        id: 'SVC-001',
        serviceNumber: 1,
        serviceName: 'Front Desk Management',
        categoryId: 'CAT-001',
        categoryName: 'Hotel Management',
        description: 'Reception and guest check-in workflows.',
        status: 'Active',
        createdAt: new Date('2025-01-10'),
      },
      {
        id: 'SVC-002',
        serviceNumber: 2,
        serviceName: 'Room Booking System',
        categoryId: 'CAT-001',
        categoryName: 'Hotel Management',
        description: 'Reservations, calendars, and occupancy controls.',
        status: 'Active',
        createdAt: new Date('2025-01-12'),
      },
      {
        id: 'SVC-003',
        serviceNumber: 3,
        serviceName: 'Patient Records',
        categoryId: 'CAT-002',
        categoryName: 'Hospital Management',
        description: 'Patient profiles, diagnosis, and visit history.',
        status: 'Active',
        createdAt: new Date('2025-01-15'),
      },
      {
        id: 'SVC-004',
        serviceNumber: 4,
        serviceName: 'OPD Management',
        categoryId: 'CAT-002',
        categoryName: 'Hospital Management',
        description: 'Outpatient queues, scheduling, and doctor allocation.',
        status: 'Active',
        createdAt: new Date('2025-01-18'),
      },
      {
        id: 'SVC-005',
        serviceNumber: 5,
        serviceName: 'Fee Management',
        categoryId: 'CAT-003',
        categoryName: 'School Management',
        description: 'Invoices, fee collection, and reminders.',
        status: 'Active',
        createdAt: new Date('2025-02-01'),
      },
    ];
  }
}
