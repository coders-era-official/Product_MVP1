import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CustomerServiceService } from '../../../../../core/services/customer-service.service';
import { ServiceCategoryService } from '../../../../../core/services/service-category.service';
import type { CustomerService } from '../../models/customer-service.model';
import type { ServiceCategory } from '../../../service-category/models/service-category.model';

@Component({
  selector: 'app-cs-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule],
  templateUrl: './cs-list.component.html',
  styleUrl: './cs-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsListComponent implements OnInit {
  readonly displayedColumns = ['serviceNumber', 'serviceName', 'categoryName', 'description', 'status'];
  services: CustomerService[] = [];
  filteredServices: CustomerService[] = [];
  categories: ServiceCategory[] = [];
  searchQuery = '';
  categoryFilter: number | 'All' = 'All';

  constructor(
    private readonly customerServiceService: CustomerServiceService,
    private readonly serviceCategoryService: ServiceCategoryService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.serviceCategoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.applyFilters();
    });
    this.customerServiceService.getServices().subscribe((services) => {
      this.services = services;
      this.applyFilters();
    });
  }

  goBack(): void {
    void this.router.navigate(['/setup/customer-service']);
  }

  onFilterChange(query?: string, categoryId?: number | 'All'): void {
    if (typeof query === 'string') {
      this.searchQuery = query;
    }
    if (categoryId !== undefined) {
      this.categoryFilter = categoryId;
    }
    this.applyFilters();
  }

  toggleStatus(service: CustomerService): void {
    this.customerServiceService
      .updateService(service.id, {
        serviceNumber: service.serviceNumber,
        serviceName: service.serviceName,
        categoryId: service.categoryId,
        description: service.description,
        status: service.status === 'Active' ? 'Inactive' : 'Active',
      })
      .subscribe((updatedService) => {
        this.services = this.services.map((item) => (item.id === updatedService.id ? updatedService : item));
        this.applyFilters();
      });
  }

  private applyFilters(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredServices = this.services.filter((service) => {
      const matchesSearch =
        query === '' ||
        `${service.serviceName} ${service.categoryName} ${service.description}`.toLowerCase().includes(query);
      const matchesCategory = this.categoryFilter === 'All' || service.categoryId === this.categoryFilter;
      return matchesSearch && matchesCategory;
    });
    this.cdr.markForCheck();
  }
}
