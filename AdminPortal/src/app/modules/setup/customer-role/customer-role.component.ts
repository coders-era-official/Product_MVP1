import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  imports: [CommonModule, FormsModule],
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
  isSubmitting = false;
  isSubmitted = false;
  searchQuery = '';
  filteredCustomers: Customer[] = [];
  savedAssignment: CustomerRoleAssignment | null = null;

  constructor(
    private readonly customerService: CustomerService,
    private readonly roleService: RoleService,
    private readonly customerServiceService: CustomerServiceService,
    private readonly customerRoleService: CustomerRoleService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
      this.filteredCustomers = customers;
      this.cdr.markForCheck();
    });
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles.filter((role) => role.status === 'Active');
      this.cdr.markForCheck();
    });
    this.customerServiceService.getServices().subscribe((services) => {
      this.availableServices = services.filter((service) => service.status === 'Active');
      this.cdr.markForCheck();
    });
  }

  searchCustomers(query: string): void {
    this.searchQuery = query;
    const normalized = query.trim().toLowerCase();
    this.filteredCustomers = this.customers.filter((customer) => {
      const haystack = `${customer.firstName} ${customer.lastName} ${customer.companyName} ${customer.id}`.toLowerCase();
      return normalized === '' || haystack.includes(normalized);
    });
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.customerRoleService.getAssignments().subscribe((assignments) => {
      const existing = assignments.find((item) => item.customerId === customer.id);
      if (existing) {
        this.selectedRole = this.roles.find((role) => role.id === existing.roleId) ?? null;
        this.assignedServices = [...existing.assignedServices];
      } else {
        this.selectedRole = null;
        this.assignedServices = [];
      }
      this.cdr.markForCheck();
    });
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

  removeService(serviceId: string): void {
    this.assignedServices = this.assignedServices.filter((item) => item.serviceId !== serviceId);
  }

  submitAssignment(): void {
    if (!this.selectedCustomer || !this.selectedRole || this.assignedServices.length === 0) {
      return;
    }
    this.isSubmitting = true;
    this.customerRoleService
      .saveAssignment({
        customerId: this.selectedCustomer.id,
        customerName: `${this.selectedCustomer.firstName} ${this.selectedCustomer.lastName}`,
        companyName: this.selectedCustomer.companyName,
        roleId: this.selectedRole.id,
        roleName: this.selectedRole.roleName,
        assignedServices: this.assignedServices,
        status: 'Active',
      })
      .subscribe((assignment) => {
        this.savedAssignment = assignment;
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.cdr.markForCheck();
      });
  }

  resetForm(): void {
    this.selectedCustomer = null;
    this.selectedRole = null;
    this.assignedServices = [];
    this.savedAssignment = null;
    this.isSubmitted = false;
    this.isSubmitting = false;
    this.searchQuery = '';
    this.filteredCustomers = this.customers;
  }

  goBack(): void {
    void this.router.navigate(['/setup']);
  }

  get customerLabel(): string {
    if (!this.selectedCustomer) {
      return 'None selected';
    }
    return `${this.selectedCustomer.firstName} ${this.selectedCustomer.lastName} (${this.selectedCustomer.companyName})`;
  }

  get isReadyToSubmit(): boolean {
    return this.selectedCustomer !== null && this.selectedRole !== null && this.assignedServices.length > 0;
  }

  trackByServiceId(_index: number, item: AssignedService): string {
    return item.serviceId;
  }
}
