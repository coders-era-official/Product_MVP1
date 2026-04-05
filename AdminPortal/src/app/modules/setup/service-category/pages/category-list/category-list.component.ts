import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceCategoryService } from '../../../../../core/services/service-category.service';
import type { ServiceCategory } from '../../models/service-category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit {
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

  toggle(category: ServiceCategory): void {
    this.serviceCategoryService.updateStatus(category.id, category.status === 'Active' ? 'Inactive' : 'Active');
  }

  goBack(): void {
    void this.router.navigate(['/setup/service-category']);
  }
}
