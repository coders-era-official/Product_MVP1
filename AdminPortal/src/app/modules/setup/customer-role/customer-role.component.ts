import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { CustomerRoleService } from '../../../core/services/customer-role.service';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerServiceService } from '../../../core/services/customer-service.service';
import { RoleService } from '../../../core/services/role.service';
import type { Customer } from '../customer-main/models/customer.model';
import type { AssignedService, CustomerRoleAssignment } from './models/customer-role.model';
import type { CustomerService as ServiceItem } from '../customer-service/models/customer-service.model';
import type { Role } from '../role/models/role.model';

@Component({
  selector: 'app-customer-role',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
  ],
  templateUrl: './customer-role.component.html',
  styleUrl: './customer-role.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerRoleComponent implements OnInit {
  selectedCustomer: Customer | null = null;
  selectedRole: Role | null = null;
  availableServices: ServiceItem[] = [];
  assignedServices: AssignedService[] = [];
  customers: Customer[] = [];
  roles: Role[] = [];
  assignments: CustomerRoleAssignment[] = [];
  isSubmitting = false;
  isSubmitted = false;
  successMessage = '';
  searchQuery = '';
  filteredCustomers: Customer[] = [];

  constructor(
    private readonly customerService: CustomerService,
    private readonly roleService: RoleService,
    private readonly customerServiceService: CustomerServiceService,
    private readonly customerRoleService: CustomerRoleService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    forkJoin({
      customers: this.customerService.getCustomers(),
      roles: this.roleService.getRoles(),
      services: this.customerServiceService.getServices(),
      assignments: this.customerRoleService.getAssignments(),
    }).subscribe(({ customers, roles, services, assignments }) => {
      this.customers = customers;
      this.filteredCustomers = customers;
      this.roles = roles.filter((role) => role.status === 'Active');
      this.availableServices = services.filter((service) => service.status === 'Active');
      this.assignments = assignments;
      this.cdr.markForCheck();
    });
  }

  searchCustomers(query: string): void {
    this.searchQuery = query;
    const normalized = this.searchQuery.trim().toLowerCase();
    this.filteredCustomers = this.customers.filter((customer) => {
      const haystack = `${customer.firstName} ${customer.lastName} ${customer.companyName} ${customer.id}`.toLowerCase();
      return normalized === '' || haystack.includes(normalized);
    });
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    const existing = this.assignments.find((assignment) => assignment.customerId === customer.id);
    this.selectedRole = this.roles.find((role) => role.id === existing?.roleId) ?? null;
    this.assignedServices = existing ? [...existing.assignedServices] : [];
  }

  selectRole(role: Role): void {
    this.selectedRole = role;
  }

  assignService(service: ServiceItem): void {
    if (this.assignedServices.some((item) => item.serviceId === service.id)) {
      return;
    }
    this.assignedServices = [
      ...this.assignedServices,
      {
        serviceId: service.id,
        serviceNumber: service.serviceNumber,
        serviceName: service.serviceName,
        categoryName: service.categoryName,
      },
    ];
  }

  removeService(serviceId: number): void {
    this.assignedServices = this.assignedServices.filter((item) => item.serviceId !== serviceId);
  }

  getInitials(customer: Customer): string {
    return `${customer.firstName[0] ?? ''}${customer.lastName[0] ?? ''}`.toUpperCase();
  }

  resetForm(): void {
    this.selectedCustomer = null;
    this.selectedRole = null;
    this.assignedServices = [];
    this.searchQuery = '';
    this.filteredCustomers = this.customers;
  }

  get availableServicesForAssignment(): ServiceItem[] {
    return this.availableServices.filter((service) => !this.assignedServices.some((item) => item.serviceId === service.id));
  }

  submitAssignment(): void {
    if (!this.selectedCustomer || !this.selectedRole || this.assignedServices.length === 0) {
      return;
    }

    this.isSubmitting = true;
    this.customerRoleService
      .saveAssignment({
        customerId: this.selectedCustomer.id,
        roleId: this.selectedRole.id,
        serviceIds: this.assignedServices.map((item) => item.serviceId),
        status: 'Active',
      })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.isSubmitted = true;
          this.successMessage = 'Customer role mapping saved successfully.';
          this.cdr.markForCheck();
        },
        error: () => {
          this.isSubmitting = false;
          this.successMessage = 'Unable to save customer role mapping right now.';
          this.cdr.markForCheck();
        },
      });
  }

  goBack(): void {
    void this.router.navigate(['/setup']);
  }
}
