import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ServiceCategoryService } from '../../../../../core/services/service-category.service';
import type { ServiceCategory } from '../../models/service-category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit {
  readonly displayedColumns = ['categoryNumber', 'categoryName', 'description', 'status', 'createdAt'];
  categories: ServiceCategory[] = [];

  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.serviceCategoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.cdr.markForCheck();
    });
  }

  toggleStatus(category: ServiceCategory): void {
    this.serviceCategoryService
      .updateCategory(category.id, {
        categoryNumber: category.categoryNumber,
        categoryName: category.categoryName,
        description: category.description,
        status: category.status === 'Active' ? 'Inactive' : 'Active',
      })
      .subscribe((updatedCategory) => {
        this.categories = this.categories.map((item) => (item.id === updatedCategory.id ? updatedCategory : item));
        this.cdr.markForCheck();
      });
  }

  goBack(): void {
    void this.router.navigate(['/setup/service-category']);
  }
}
