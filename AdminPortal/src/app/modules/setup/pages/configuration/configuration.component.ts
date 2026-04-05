import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import type { DeploymentEnvironment } from '../../../../core/models/setup-config.model';
import { SetupService } from '../../../../core/services/setup.service';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationComponent implements OnInit {
  protected step = 0;
  protected readonly totalSteps = 3;

  protected form!: FormGroup;

  protected readonly envOptions: { value: DeploymentEnvironment; label: string }[] = [
    { value: 'dev', label: 'Development' },
    { value: 'staging', label: 'Staging' },
    { value: 'prod', label: 'Production' },
  ];

  protected readonly tokenExpiryOptions = ['1h', '8h', '24h', '7d', '30d'] as const;

  constructor(
    private readonly fb: FormBuilder,
    private readonly setupService: SetupService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const c = this.setupService.getConfig();
    this.form = this.fb.group({
      apiBaseUrl: [c.environment.apiBaseUrl, [Validators.required]],
      port: [c.environment.port, [Validators.required, Validators.min(1), Validators.max(65535)]],
      environment: [c.environment.environment, Validators.required],
      dbHost: [c.database.host, Validators.required],
      dbName: [c.database.name, Validators.required],
      dbUser: [c.database.user, Validators.required],
      dbPassword: [c.database.password],
      jwtSecretHint: [c.auth.jwtSecretHint],
      tokenExpiry: [c.auth.tokenExpiry, Validators.required],
    });
    this.cdr.markForCheck();
  }

  protected prev(): void {
    if (this.step > 0) {
      this.step--;
      this.cdr.markForCheck();
    }
  }

  protected next(): void {
    if (!this.validateStep()) {
      this.cdr.markForCheck();
      return;
    }
    this.persistStep();
    if (this.step < this.totalSteps - 1) {
      this.step++;
    }
    this.cdr.markForCheck();
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }
    const v = this.form.getRawValue();
    this.setupService.setFullConfig({
      environment: {
        apiBaseUrl: v['apiBaseUrl'] as string,
        port: Number(v['port']),
        environment: v['environment'] as DeploymentEnvironment,
      },
      database: {
        host: v['dbHost'] as string,
        name: v['dbName'] as string,
        user: v['dbUser'] as string,
        password: (v['dbPassword'] as string) ?? '',
      },
      auth: {
        jwtSecretHint: (v['jwtSecretHint'] as string) ?? '',
        tokenExpiry: v['tokenExpiry'] as string,
      },
    });
    void this.router.navigate(['/setup/completion']);
    this.cdr.markForCheck();
  }

  private validateStep(): boolean {
    const keys: Record<number, string[]> = {
      0: ['apiBaseUrl', 'port', 'environment'],
      1: ['dbHost', 'dbName', 'dbUser'],
      2: ['tokenExpiry'],
    };
    const fields = keys[this.step] ?? [];
    let valid = true;
    for (const f of fields) {
      const ctrl = this.form.get(f);
      ctrl?.markAsTouched();
      if (ctrl?.invalid) {
        valid = false;
      }
    }
    return valid;
  }

  private persistStep(): void {
    const v = this.form.getRawValue();
    if (this.step === 0) {
      this.setupService.saveConfig({
        environment: {
          apiBaseUrl: v['apiBaseUrl'] as string,
          port: Number(v['port']),
          environment: v['environment'] as DeploymentEnvironment,
        },
      });
    }
    if (this.step === 1) {
      this.setupService.saveConfig({
        database: {
          host: v['dbHost'] as string,
          name: v['dbName'] as string,
          user: v['dbUser'] as string,
          password: (v['dbPassword'] as string) ?? '',
        },
      });
    }
  }

  protected fieldError(field: string): string | null {
    const c = this.form.get(field);
    if (!c || !c.touched || !c.errors) {
      return null;
    }
    if (c.errors['required']) {
      return 'This field is required';
    }
    if (c.errors['min']) {
      return 'Value is too small';
    }
    if (c.errors['max']) {
      return 'Value is too large';
    }
    return 'Invalid value';
  }
}
