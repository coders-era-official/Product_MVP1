import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceCategoryService } from '../../../../../core/services/service-category.service';

type CategoryStatus = 'Active' | 'Inactive';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent implements OnInit {
  nextNumber = 1;
  successMessage = '';
  readonly form = this.fb.group({
    categoryName: ['', Validators.required],
    description: ['', Validators.required],
    status: ['Active' as CategoryStatus, Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly serviceCategoryService: ServiceCategoryService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.nextNumber = this.serviceCategoryService.getNextCategoryNumber();
    this.cdr.markForCheck();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    this.serviceCategoryService
      .createCategory({
        categoryName: raw.categoryName ?? '',
        description: raw.description ?? '',
        status: raw.status ?? 'Active',
      })
      .subscribe((category) => {
        this.successMessage = `Category created successfully as #${category.categoryNumber}.`;
        this.nextNumber = this.serviceCategoryService.getNextCategoryNumber();
        this.form.reset({ categoryName: '', description: '', status: 'Active' });
        this.cdr.markForCheck();
      });
  }

  goBack(): void {
    void this.router.navigate(['/setup/service-category']);
  }
}
