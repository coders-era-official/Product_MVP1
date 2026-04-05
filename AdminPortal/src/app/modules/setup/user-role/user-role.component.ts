import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerServiceService } from '../../../core/services/customer-service.service';
import { RoleService } from '../../../core/services/role.service';
import { UserRoleService } from '../../../core/services/user-role.service';
import { UserService } from '../../../core/services/user.service';
import type { Customer } from '../customer-main/models/customer.model';
import type { CustomerService as CustomerServiceModel } from '../customer-service/models/customer-service.model';
import type { Role } from '../role/models/role.model';
import type { User } from '../user/models/user.model';
import type { UserAssignedService } from './models/user-role.model';

@Component({
  selector: 'app-user-role',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRoleComponent implements OnInit {
  allUsers: User[] = [];
  allRoles: Role[] = [];
  allCustomers: Customer[] = [];
  allServices: CustomerServiceModel[] = [];

  filteredUsers: User[] = [];
  filteredCustomers: Customer[] = [];

  selectedUser: User | null = null;
  selectedRole: Role | null = null;
  selectedCustomer: Customer | null = null;

  availableServices: CustomerServiceModel[] = [];
  assignedServices: UserAssignedService[] = [];

  userSearchQuery = '';
  customerSearchQuery = '';
  isSubmitting = false;
  isSubmitted = false;

  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly customerService: CustomerService,
    private readonly customerServiceService: CustomerServiceService,
    private readonly userRoleService: UserRoleService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    forkJoin({
      users: this.userService.getUsers(),
      roles: this.roleService.getRoles(),
      customers: this.customerService.getCustomers(),
      services: this.customerServiceService.getServices(),
    }).subscribe(({ users, roles, customers, services }) => {
      this.allUsers = users.filter((user) => user.status === 'Active');
      this.filteredUsers = this.allUsers;
      this.allRoles = roles.filter((role) => role.status === 'Active');
      this.allCustomers = customers;
      this.filteredCustomers = customers;
      this.allServices = services.filter((service) => service.status === 'Active');
      this.availableServices = this.allServices;
    });
  }

  get canSubmit(): boolean {
    return !!this.selectedUser && !!this.selectedRole && !!this.selectedCustomer;
  }

  searchUsers(query: string): void {
    this.userSearchQuery = query;
    const normalized = query.trim().toLowerCase();
    this.filteredUsers = this.allUsers.filter((user) =>
      `${user.userCode} ${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(normalized),
    );
  }

  searchCustomers(query: string): void {
    this.customerSearchQuery = query;
    const normalized = query.trim().toLowerCase();
    this.filteredCustomers = this.allCustomers.filter((customer) =>
      `${customer.customerCode} ${customer.firstName} ${customer.lastName} ${customer.companyName}`.toLowerCase().includes(normalized),
    );
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    this.filteredUsers = this.allUsers;
    this.userSearchQuery = '';
  }

  selectRole(role: Role): void {
    this.selectedRole = role;
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.customerSearchQuery = '';
    this.filteredCustomers = this.allCustomers;
    this.availableServices = this.allServices;
    this.assignedServices = [];
  }

  assignService(service: CustomerServiceModel): void {
    if (this.assignedServices.some((item) => item.serviceId === String(service.id))) {
      return;
    }
    this.assignedServices = [
      ...this.assignedServices,
      {
        serviceId: String(service.id),
        serviceNumber: service.serviceNumber,
        serviceName: service.serviceName,
        categoryName: service.categoryName,
      },
    ];
  }

  removeService(serviceId: string): void {
    this.assignedServices = this.assignedServices.filter((service) => service.serviceId !== serviceId);
  }

  getAvailableServices(): CustomerServiceModel[] {
    return this.availableServices.filter(
      (service) => !this.assignedServices.some((item) => item.serviceId === String(service.id)),
    );
  }

  submitAssignment(): void {
    if (!this.canSubmit || !this.selectedUser || !this.selectedRole || !this.selectedCustomer) {
      return;
    }
    this.isSubmitting = true;
    this.userRoleService
      .saveAssignment({
        userId: this.selectedUser.id,
        userCode: this.selectedUser.userCode,
        userName: `${this.selectedUser.firstName} ${this.selectedUser.lastName}`,
        roleId: String(this.selectedRole.id),
        roleName: this.selectedRole.roleName,
        roleCode: this.selectedRole.roleCode,
        customerId: String(this.selectedCustomer.id),
        customerCode: this.selectedCustomer.customerCode,
        customerName: `${this.selectedCustomer.firstName} ${this.selectedCustomer.lastName}`,
        companyName: this.selectedCustomer.companyName,
        assignedServices: this.assignedServices,
        status: 'Active',
      })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.isSubmitted = true;
        },
        error: () => {
          this.isSubmitting = false;
        },
      });
  }

  resetForm(): void {
    this.selectedUser = null;
    this.selectedRole = null;
    this.selectedCustomer = null;
    this.assignedServices = [];
    this.availableServices = this.allServices;
    this.userSearchQuery = '';
    this.customerSearchQuery = '';
    this.filteredUsers = this.allUsers;
    this.filteredCustomers = this.allCustomers;
    this.isSubmitted = false;
  }

  getInitials(person: Pick<User | Customer, 'firstName' | 'lastName'>): string {
    return `${person.firstName[0] ?? ''}${person.lastName[0] ?? ''}`.toUpperCase();
  }

  goBack(): void {
    void this.router.navigate(['/setup']);
  }
}
