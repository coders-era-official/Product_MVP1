import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../../../../../core/services/customer-service.service';
import { ServiceCategoryService } from '../../../../../core/services/service-category.service';
import type { ServiceCategory } from '../../../service-category/models/service-category.model';

type ServiceStatus = 'Active' | 'Inactive';

@Component({
  selector: 'app-cs-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cs-form.component.html',
  styleUrl: './cs-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsFormComponent implements OnInit {
  categories: ServiceCategory[] = [];
  nextNumber = 1;
  successMessage = '';
  readonly form = this.fb.group({
    serviceName: ['', Validators.required],
    categoryId: ['', Validators.required],
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

  ngOnInit(): void {
    this.nextNumber = this.customerServiceService.getNextServiceNumber();
    this.serviceCategoryService.getCategories().subscribe((categories) => {
      this.categories = categories.filter((item) => item.status === 'Active');
      this.cdr.markForCheck();
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const category = this.categories.find((item) => item.id === raw.categoryId);
    if (!category) {
      return;
    }
    this.customerServiceService
      .createService({
        serviceName: raw.serviceName ?? '',
        categoryId: category.id,
        categoryName: category.categoryName,
        description: raw.description ?? '',
        status: raw.status ?? 'Active',
      })
      .subscribe((service) => {
        this.successMessage = `Service created successfully as #${service.serviceNumber}.`;
        this.nextNumber = this.customerServiceService.getNextServiceNumber();
        this.form.reset({ serviceName: '', categoryId: '', description: '', status: 'Active' });
        this.cdr.markForCheck();
      });
  }

  goBack(): void {
    void this.router.navigate(['/setup/customer-service']);
  }
}
