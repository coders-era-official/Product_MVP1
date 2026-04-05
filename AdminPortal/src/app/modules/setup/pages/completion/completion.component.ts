import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import type { SetupConfig } from '../../../../core/models/setup-config.model';
import { SetupService } from '../../../../core/services/setup.service';

@Component({
  selector: 'app-completion',
  standalone: true,
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletionComponent implements OnInit {
  protected config: SetupConfig | null = null;

  constructor(
    private readonly setupService: SetupService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.config = this.setupService.getConfig();
    this.cdr.markForCheck();
  }

  protected goDashboard(): void {
    void this.router.navigateByUrl('/');
  }

  protected reconfigure(): void {
    void this.router.navigateByUrl('/setup/configuration');
  }
}
