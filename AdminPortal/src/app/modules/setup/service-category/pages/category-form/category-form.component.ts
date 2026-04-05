import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ServiceCategoryService } from '../../../../../core/services/service-category.service';
import type { ServiceCategoryPayload } from '../../models/service-category.model';

type CategoryStatus = 'Active' | 'Inactive';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent implements OnInit {
  nextNumber = 1;
  successMessage = '';
  readonly form = this.fb.group({
    categoryNumber: [1, [Validators.required, Validators.min(1)]],
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

  get categoryForm(): FormGroup {
    return this.form;
  }

  ngOnInit(): void {
    this.serviceCategoryService.getCategories().subscribe((categories) => {
      this.nextNumber = categories.length === 0 ? 1 : Math.max(...categories.map((item) => item.categoryNumber)) + 1;
      this.form.patchValue({ categoryNumber: this.nextNumber });
      this.cdr.markForCheck();
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const payload: ServiceCategoryPayload = {
      categoryNumber: Number(raw.categoryNumber),
      categoryName: raw.categoryName ?? '',
      description: raw.description ?? '',
      status: raw.status ?? 'Active',
    };

    this.serviceCategoryService.createCategory(payload).subscribe((category) => {
      this.successMessage = `Category #${category.categoryNumber} created.`;
      this.form.reset({ categoryNumber: category.categoryNumber + 1, status: 'Active' });
      this.cdr.markForCheck();
    });
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  toggleStatus(): void {
    const nextStatus: CategoryStatus = this.form.get('status')?.value === 'Active' ? 'Inactive' : 'Active';
    this.form.patchValue({ status: nextStatus });
  }

  submitForm(): void {
    this.submit();
  }

  goBack(): void {
    void this.router.navigate(['/setup/service-category']);
  }
}
