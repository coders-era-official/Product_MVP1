import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../../core/services/customer.service';
import type { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-initiate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-initiate.component.html',
  styleUrl: './customer-initiate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInitiateComponent implements OnInit {
  currentStep = 0;
  isSubmitting = false;
  isSubmitted = false;

  readonly steps = [
    { label: 'Basic Info', icon: '👤' },
    { label: 'Company', icon: '🏢' },
    { label: 'Address', icon: '📍' },
    { label: 'Plan', icon: '📦' },
  ] as const;

  basicInfoForm!: FormGroup;
  companyForm!: FormGroup;
  addressForm!: FormGroup;
  planForm!: FormGroup;

  readonly companyTypes = ['Pvt Ltd', 'LLP', 'Sole Proprietor', 'Partnership', 'Public Ltd'];
  readonly companySizes = ['1-10', '11-50', '51-200', '200+'];
  readonly industries = ['Technology', 'Fintech', 'Healthcare', 'E-commerce', 'Education', 'Manufacturing', 'Other'];
  readonly indianStates = [
    'Maharashtra',
    'Delhi',
    'Karnataka',
    'Tamil Nadu',
    'Gujarat',
    'Haryana',
    'Telangana',
    'Rajasthan',
    'Uttar Pradesh',
    'West Bengal',
  ];
  readonly plans: ReadonlyArray<{ name: string; price: string; features: ReadonlyArray<string> }> = [
    { name: 'Starter', price: 'Rs 999/mo', features: ['Up to 5 users', '10 GB storage', 'Email support'] },
    { name: 'Growth', price: 'Rs 2,999/mo', features: ['Up to 25 users', '50 GB storage', 'Priority support'] },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited users', 'Unlimited storage', 'Dedicated support'],
    },
  ];
  readonly billingCycles = ['Monthly', 'Annually'];

  selectedPlan = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.basicInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    });

    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      companyType: ['', Validators.required],
      gstNumber: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/)]],
      companySize: ['', Validators.required],
      industry: ['', Validators.required],
    });

    this.addressForm = this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      country: ['India', Validators.required],
    });

    this.planForm = this.fb.group({
      planName: ['', Validators.required],
      billingCycle: ['Monthly', Validators.required],
    });
  }

  get currentForm(): FormGroup {
    return [this.basicInfoForm, this.companyForm, this.addressForm, this.planForm][this.currentStep];
  }

  nextStep(): void {
    if (this.currentForm.invalid) {
      this.currentForm.markAllAsTouched();
      return;
    }
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep += 1;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
    }
  }

  selectPlan(planName: string): void {
    this.selectedPlan = planName;
    this.planForm.patchValue({ planName });
    this.planForm.get('planName')?.markAsTouched();
  }

  submitForm(): void {
    const forms = [this.basicInfoForm, this.companyForm, this.addressForm, this.planForm];
    for (const form of forms) {
      if (form.invalid) {
        form.markAllAsTouched();
      }
    }
    if (forms.some((form) => form.invalid)) {
      return;
    }

    this.isSubmitting = true;
    const payload: Partial<Customer> = {
      ...this.basicInfoForm.getRawValue(),
      ...this.companyForm.getRawValue(),
      ...this.addressForm.getRawValue(),
      ...this.planForm.getRawValue(),
    };

    this.customerService.initiateCustomer(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.isSubmitted = true;
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }

  goToView(): void {
    void this.router.navigate(['/setup/customer-main/view']);
  }

  goBack(): void {
    void this.router.navigate(['/setup/customer-main']);
  }

  resetFlow(): void {
    this.isSubmitted = false;
    this.isSubmitting = false;
    this.currentStep = 0;
    this.selectedPlan = '';
    this.basicInfoForm.reset();
    this.companyForm.reset();
    this.addressForm.reset({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
    });
    this.planForm.reset({
      planName: '',
      billingCycle: 'Monthly',
    });
  }

  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return Boolean(control && control.invalid && control.touched);
  }
}
