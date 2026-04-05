import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../core/services/role.service';

type RoleStatus = 'Active' | 'Inactive';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  get permissionsArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  togglePermission(permission: string, checked: boolean): void {
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

  uppercaseCode(): void {
    const raw = this.form.get('roleCode')?.value ?? '';
    this.form.patchValue({ roleCode: raw.toUpperCase().replace(/\s+/g, '_') });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    this.roleService
      .createRole({
        roleName: raw.roleName ?? '',
        roleCode: raw.roleCode ?? '',
        description: raw.description ?? '',
        permissions: (raw.permissions ?? []) as string[],
        status: raw.status ?? 'Active',
      })
      .subscribe(() => {
        this.successMessage = 'Role created successfully.';
        this.form.reset({ roleName: '', roleCode: '', description: '', status: 'Active' });
        while (this.permissionsArray.length > 0) {
          this.permissionsArray.removeAt(0);
        }
      });
  }

  goBack(): void {
    void this.router.navigate(['/setup/role']);
  }

  get permissionsInvalid(): boolean {
    return this.permissionsArray.invalid && this.permissionsArray.touched;
  }
}
