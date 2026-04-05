import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RoleService } from '../../../../../core/services/role.service';
import type { RolePayload } from '../../models/role.model';

type RoleStatus = 'Active' | 'Inactive';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleFormComponent {
  readonly permissionOptions = ['read', 'write', 'delete', 'manage_users', 'export'] as const;
  readonly form = this.fb.group({
    roleName: ['', [Validators.required, Validators.minLength(2)]],
    roleCode: ['', [Validators.required, Validators.pattern(/^[A-Z_]+$/)]],
    description: [''],
    permissions: this.fb.array([], [Validators.required, Validators.minLength(1)]),
    status: ['Active' as RoleStatus, Validators.required],
  });
  successMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly roleService: RoleService,
    private readonly router: Router,
  ) {}

  get roleForm(): FormGroup {
    return this.form;
  }

  get permissionsArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  togglePermission(permission: string, checked = !this.hasPermission(permission)): void {
    const values = this.permissionsArray.value as string[];
    if (checked && !values.includes(permission)) {
      this.permissionsArray.push(this.fb.control(permission));
      return;
    }
    if (!checked) {
      const index = values.indexOf(permission);
      if (index >= 0) {
        this.permissionsArray.removeAt(index);
      }
    }
  }

  hasPermission(permission: string): boolean {
    return (this.permissionsArray.value as string[]).includes(permission);
  }

  isPermissionSelected(permission: string): boolean {
    return this.hasPermission(permission);
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  uppercaseCode(): void {
    const raw = this.form.get('roleCode')?.value ?? '';
    this.form.patchValue({ roleCode: raw.toUpperCase().replace(/\s+/g, '_') });
  }

  toggleStatus(): void {
    const nextStatus: RoleStatus = this.form.get('status')?.value === 'Active' ? 'Inactive' : 'Active';
    this.form.patchValue({ status: nextStatus });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const payload: RolePayload = {
      roleName: raw.roleName ?? '',
      roleCode: raw.roleCode ?? '',
      description: raw.description ?? '',
      permissions: (raw.permissions ?? []) as string[],
      status: raw.status ?? 'Active',
    };

    this.roleService.createRole(payload).subscribe(() => {
      this.successMessage = 'Role created successfully.';
      this.form.reset({ status: 'Active' });
      while (this.permissionsArray.length > 0) {
        this.permissionsArray.removeAt(0);
      }
    });
  }

  submitForm(): void {
    this.submit();
  }

  goBack(): void {
    void this.router.navigate(['/setup/role']);
  }
}
