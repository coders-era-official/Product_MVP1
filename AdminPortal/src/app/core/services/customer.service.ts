import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Customer } from '../../modules/setup/customer-main/models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly apiUrl = `${environment.apiBaseUrl}/customers`;

  private readonly customersSubject = new BehaviorSubject<Customer[]>([]);
  readonly customers$: Observable<Customer[]> = this.customersSubject.asObservable();

  private readonly selectedCustomerSubject = new BehaviorSubject<Customer | null>(null);
  readonly selectedCustomer$: Observable<Customer | null> = this.selectedCustomerSubject.asObservable();

  getCustomers(): Observable<Customer[]> {
    // TODO: Replace with HttpClient call -> this.http.get<Customer[]>(this.apiUrl)
    if (this.customersSubject.value.length === 0) {
      this.customersSubject.next(this.getMockCustomers());
    }
    return this.customers$;
  }

  initiateCustomer(payload: Partial<Customer>): Observable<Customer> {
    // TODO: Replace with HttpClient call -> this.http.post<Customer>(this.apiUrl, payload)
    const newCustomer: Customer = {
      id: `CUST-${Date.now()}`,
      firstName: payload.firstName ?? '',
      lastName: payload.lastName ?? '',
      email: payload.email ?? '',
      phone: payload.phone ?? '',
      companyName: payload.companyName ?? '',
      companyType: payload.companyType ?? '',
      gstNumber: payload.gstNumber ?? '',
      companySize: payload.companySize ?? '',
      industry: payload.industry ?? '',
      addressLine1: payload.addressLine1 ?? '',
      addressLine2: payload.addressLine2 ?? '',
      city: payload.city ?? '',
      state: payload.state ?? '',
      pincode: payload.pincode ?? '',
      country: payload.country ?? 'India',
      planName: payload.planName ?? '',
      billingCycle: payload.billingCycle ?? 'Monthly',
      status: 'Pending',
      onboardedAt: new Date(),
    };
    const current = this.customersSubject.value;
    this.customersSubject.next([newCustomer, ...current]);
    return of(newCustomer);
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomerSubject.next(customer);
  }

  getEndpoint(): string {
    return this.apiUrl;
  }

  private getMockCustomers(): Customer[] {
    return [
      {
        id: 'CUST-001',
        firstName: 'Arjun',
        lastName: 'Mehta',
        email: 'arjun@techcorp.in',
        phone: '9876543210',
        companyName: 'TechCorp India',
        companyType: 'Pvt Ltd',
        gstNumber: '27AABCT1332L1ZR',
        companySize: '51-200',
        industry: 'Technology',
        addressLine1: '4th Floor, Bandra Kurla Complex',
        addressLine2: 'BKC',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400051',
        country: 'India',
        planName: 'Growth',
        billingCycle: 'Annually',
        status: 'Active',
        onboardedAt: new Date('2025-01-15'),
      },
      {
        id: 'CUST-002',
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya@startupx.io',
        phone: '9123456780',
        companyName: 'StartupX',
        companyType: 'LLP',
        gstNumber: '07AAECS1234F1Z5',
        companySize: '1-10',
        industry: 'Fintech',
        addressLine1: 'Cyber Hub, DLF Phase 2',
        addressLine2: '',
        city: 'Gurugram',
        state: 'Haryana',
        pincode: '122002',
        country: 'India',
        planName: 'Starter',
        billingCycle: 'Monthly',
        status: 'Pending',
        onboardedAt: new Date('2025-03-01'),
      },
    ];
  }
}
