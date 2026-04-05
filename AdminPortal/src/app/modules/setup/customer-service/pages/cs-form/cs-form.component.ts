import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomerServiceService } from '../../../../../core/services/customer-service.service';
import { ServiceCategoryService } from '../../../../../core/services/service-category.service';
import type { CustomerServicePayload } from '../../models/customer-service.model';
import type { ServiceCategory } from '../../../service-category/models/service-category.model';

type ServiceStatus = 'Active' | 'Inactive';

@Component({
  selector: 'app-cs-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './cs-form.component.html',
  styleUrl: './cs-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsFormComponent implements OnInit {
  categories: ServiceCategory[] = [];
  nextNumber = 1;
  successMessage = '';
  readonly form = this.fb.group({
    serviceNumber: [1, [Validators.required, Validators.min(1)]],
    serviceName: ['', Validators.required],
    categoryId: [null as number | null, Validators.required],
    description: [''],
    status: ['Active' as ServiceStatus, Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly customerServiceService: CustomerServiceService,
    private readonly serviceCategoryService: ServiceCategoryService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  get serviceForm(): FormGroup {
    return this.form;
  }

  ngOnInit(): void {
    this.serviceCategoryService.getCategories().subscribe((categories) => {
      this.categories = categories.filter((item) => item.status === 'Active');
      this.cdr.markForCheck();
    });
    this.customerServiceService.getServices().subscribe((services) => {
      this.nextNumber = services.length === 0 ? 1 : Math.max(...services.map((item) => item.serviceNumber)) + 1;
      this.form.patchValue({ serviceNumber: this.nextNumber });
      this.cdr.markForCheck();
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const payload: CustomerServicePayload = {
      serviceNumber: Number(raw.serviceNumber),
      serviceName: raw.serviceName ?? '',
      categoryId: Number(raw.categoryId),
      description: raw.description ?? '',
      status: raw.status ?? 'Active',
    };

    this.customerServiceService.createService(payload).subscribe((service) => {
      this.successMessage = `Service #${service.serviceNumber} created.`;
      this.form.reset({ serviceNumber: service.serviceNumber + 1, status: 'Active', categoryId: null });
      this.cdr.markForCheck();
    });
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  toggleStatus(): void {
    const nextStatus: ServiceStatus = this.form.get('status')?.value === 'Active' ? 'Inactive' : 'Active';
    this.form.patchValue({ status: nextStatus });
  }

  submitForm(): void {
    this.submit();
  }

  goBack(): void {
    void this.router.navigate(['/setup/customer-service']);
  }
}
