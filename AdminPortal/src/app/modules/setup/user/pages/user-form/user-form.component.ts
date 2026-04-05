import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import type { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  submittedUser: User | null = null;
  showPassword = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+/),
        ],
      ],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!field && field.invalid && (field.touched || field.dirty);
  }

  get passwordStrength(): number {
    const value = this.userForm.get('password')?.value as string | undefined;
    if (!value) {
      return 0;
    }
    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value) && /[0-9]/.test(value)) score += 1;
    if (/[!@#$%^&*]/.test(value)) score += 1;
    return score;
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    this.userService.createUser(this.userForm.value as Partial<User>).subscribe({
      next: (user) => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.submittedUser = user;
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.submittedUser = null;
    this.userForm.reset();
    this.showPassword = false;
  }

  goBack(): void {
    void this.router.navigate(['/setup/user']);
  }

  goToList(): void {
    void this.router.navigate(['/setup/user/list']);
  }
}
