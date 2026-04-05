import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../../../core/services/customer.service';
import type { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
  ],
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerViewComponent implements OnInit {
  readonly displayedColumns = ['id', 'customer', 'company', 'contact', 'plan', 'status', 'onboardedAt'];
  readonly statuses: Array<'All' | Customer['status']> = ['All', 'Active', 'Pending', 'Inactive'];

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchQuery = '';
  filterStatus: 'All' | Customer['status'] = 'All';

  constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  onFilterStatus(status: 'All' | Customer['status']): void {
    this.filterStatus = status;
    this.applyFilters();
  }

  getInitials(customer: Customer): string {
    return `${customer.firstName[0] ?? ''}${customer.lastName[0] ?? ''}`.toUpperCase();
  }

  goBack(): void {
    void this.router.navigate(['/setup/customer-main']);
  }

  goToInitiate(): void {
    void this.router.navigate(['/setup/customer-main/initiate']);
  }

  private loadCustomers(): void {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
      this.applyFilters();
    });
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
