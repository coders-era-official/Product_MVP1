import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../../../../../core/services/customer-service.service';
import { ServiceCategoryService } from '../../../../../core/services/service-category.service';
import type { CustomerService } from '../../models/customer-service.model';
import type { ServiceCategory } from '../../../service-category/models/service-category.model';

interface ServiceGroup {
  categoryName: string;
  categoryNumber: number;
  items: CustomerService[];
}

@Component({
  selector: 'app-cs-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cs-list.component.html',
  styleUrl: './cs-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsListComponent implements OnInit {
  services: CustomerService[] = [];
  groups: ServiceGroup[] = [];
  categories: ServiceCategory[] = [];
  searchQuery = '';
  categoryFilter = 'All';

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

  onFilterChange(): void {
    this.applyFilters();
  }

  toggle(service: CustomerService): void {
    this.customerServiceService.updateStatus(service.id, service.status === 'Active' ? 'Inactive' : 'Active');
  }

  private applyFilters(): void {
    const query = this.searchQuery.trim().toLowerCase();
    const filtered = this.services.filter((service) => {
      const matchesSearch = query === '' || service.serviceName.toLowerCase().includes(query);
      const matchesCategory = this.categoryFilter === 'All' || service.categoryId === this.categoryFilter;
      return matchesSearch && matchesCategory;
    });

    const categoryMap = new Map<string, number>(this.categories.map((item) => [item.id, item.categoryNumber]));
    const grouped = new Map<string, ServiceGroup>();
    for (const item of filtered.sort((a, b) => a.categoryName.localeCompare(b.categoryName) || a.serviceNumber - b.serviceNumber)) {
      const existing = grouped.get(item.categoryId);
      if (existing) {
        existing.items.push(item);
      } else {
        grouped.set(item.categoryId, {
          categoryName: item.categoryName,
          categoryNumber: categoryMap.get(item.categoryId) ?? 0,
          items: [item],
        });
      }
    }
    this.groups = Array.from(grouped.values());
    this.cdr.markForCheck();
  }
}
