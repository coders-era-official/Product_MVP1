import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../../core/services/customer.service';
import type { Customer, CustomerPayload } from '../models/customer.model';

interface PlanOption {
  name: string;
  price: string;
  features: string[];
}

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
  errorMessage = '';
  submittedCustomer: Customer | null = null;

  readonly steps = [
    { label: 'Basic Info', icon: '👤' },
    { label: 'Company', icon: '🏢' },
    { label: 'Address', icon: '📍' },
    { label: 'Plan', icon: '📦' },
  ] as const;
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
  readonly plans: PlanOption[] = [
    { name: 'Starter', price: '₹999', features: ['1 Admin user', 'Basic onboarding', 'Email support'] },
    { name: 'Growth', price: '₹2,499', features: ['5 Team members', 'Advanced roles', 'Priority support'] },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited services', 'Custom workflows', 'Dedicated manager'] },
  ];
  readonly billingCycles = ['Monthly', 'Annually'];

  basicInfoForm!: FormGroup;
  companyForm!: FormGroup;
  addressForm!: FormGroup;
  planForm!: FormGroup;

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
      gstNumber: [''],
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

  get selectedPlan(): string {
    return this.planForm.get('planName')?.value ?? '';
  }

  nextStep(): void {
    if (this.currentForm.invalid) {
      this.currentForm.markAllAsTouched();
      return;
    }
    this.currentStep += 1;
  }

  prevStep(): void {
    this.currentStep -= 1;
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  selectPlan(planName: string): void {
    this.planForm.patchValue({ planName });
  }

  submitForm(): void {
    const forms = [this.basicInfoForm, this.companyForm, this.addressForm, this.planForm];
    forms.forEach((form) => form.markAllAsTouched());
    if (forms.some((form) => form.invalid)) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    const payload: CustomerPayload = {
      ...(this.basicInfoForm.getRawValue() as Omit<CustomerPayload, 'status'>),
      ...(this.companyForm.getRawValue() as Omit<CustomerPayload, 'status'>),
      ...(this.addressForm.getRawValue() as Omit<CustomerPayload, 'status'>),
      ...(this.planForm.getRawValue() as Omit<CustomerPayload, 'status'>),
      status: 'Pending',
    };

    this.customerService.initiateCustomer(payload).subscribe({
      next: (customer) => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.submittedCustomer = customer;
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Customer onboarding failed. Please verify the form values and try again.';
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
    this.errorMessage = '';
    this.currentStep = 0;
    this.submittedCustomer = null;
    this.basicInfoForm.reset();
    this.companyForm.reset();
    this.addressForm.reset({ country: 'India' });
    this.planForm.reset({ billingCycle: 'Monthly' });
  }
}
