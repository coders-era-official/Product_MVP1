import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../../../../core/services/customer.service';
import type { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [CommonModule, NgClass, DatePipe],
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerViewComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchQuery = '';
  filterStatus: 'All' | Customer['status'] = 'All';
  readonly statuses: Array<'All' | Customer['status']> = ['All', 'Active', 'Pending', 'Inactive'];

  constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
      this.filteredCustomers = data;
      this.cdr.markForCheck();
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  onFilterStatus(status: 'All' | Customer['status']): void {
    this.filterStatus = status;
    this.applyFilters();
  }

  goBack(): void {
    void this.router.navigate(['/setup/customer-main']);
  }

  goToInitiate(): void {
    void this.router.navigate(['/setup/customer-main/initiate']);
  }

  getInitials(customer: Customer): string {
    return `${customer.firstName.charAt(0)}${customer.lastName.charAt(0)}`.toUpperCase();
  }

  getStatusClass(status: Customer['status']): string {
    return status.toLowerCase();
  }

  private applyFilters(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredCustomers = this.customers.filter((customer) => {
      const haystack = `${customer.firstName} ${customer.lastName} ${customer.companyName} ${customer.email}`.toLowerCase();
      const matchSearch = query === '' || haystack.includes(query);
      const matchStatus = this.filterStatus === 'All' || customer.status === this.filterStatus;
      return matchSearch && matchStatus;
    });
    this.cdr.markForCheck();
  }
}
