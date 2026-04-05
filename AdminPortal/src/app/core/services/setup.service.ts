import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import type {
  AuthSettings,
  DatabaseConfig,
  EnvironmentSettings,
  SetupConfig,
} from '../models/setup-config.model';

const STORAGE_KEY = 'at_setup_config_v1';

/** Partial update shape for nested merge. */
export interface SetupConfigUpdate {
  environment?: Partial<EnvironmentSettings>;
  database?: Partial<DatabaseConfig>;
  auth?: Partial<AuthSettings>;
}

/**
 * Persists and shares setup wizard state across `/setup/*` routes.
 * Uses `localStorage` for refresh survival; call `resetConfig()` to clear.
 */
@Injectable({ providedIn: 'root' })
export class SetupService {
  private readonly defaultConfig: SetupConfig = {
    environment: {
      apiBaseUrl: 'http://localhost:3000/api',
      port: 3000,
      environment: 'dev',
    },
    database: {
      host: 'localhost',
      name: 'amazing_technical_ui',
      user: 'app_user',
      password: '',
    },
    auth: {
      jwtSecretHint: '',
      tokenExpiry: '24h',
    },
  };

  private readonly configSubject = new BehaviorSubject<SetupConfig>(this.loadFromStorage());

  /** Emits the current setup configuration and subsequent updates. */
  readonly config$: Observable<SetupConfig> = this.configSubject.asObservable();

  /** Returns the latest config snapshot synchronously. */
  getConfig(): SetupConfig {
    return this.configSubject.value;
  }

  /**
   * Merges partial nested updates into the current config, persists,
   * and notifies subscribers.
   */
  saveConfig(update: SetupConfigUpdate): void {
    const c = this.configSubject.value;
    const next: SetupConfig = {
      environment: { ...c.environment, ...update.environment },
      database: { ...c.database, ...update.database },
      auth: { ...c.auth, ...update.auth },
    };
    this.persist(next);
  }

  /** Replaces the entire configuration (e.g. after form submit). */
  setFullConfig(config: SetupConfig): void {
    this.persist(config);
  }

  /** Clears persisted storage and resets to factory defaults. */
  resetConfig(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    const fresh: SetupConfig = {
      environment: { ...this.defaultConfig.environment },
      database: { ...this.defaultConfig.database },
      auth: { ...this.defaultConfig.auth },
    };
    this.persist(fresh);
  }

  private persist(config: SetupConfig): void {
    this.configSubject.next(config);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      /* ignore */
    }
  }

  private loadFromStorage(): SetupConfig {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return this.cloneDefaults();
      }
      const parsed = JSON.parse(raw) as SetupConfig;
      return this.mergeWithDefaults(parsed);
    } catch {
      return this.cloneDefaults();
    }
  }

  private cloneDefaults(): SetupConfig {
    return {
      environment: { ...this.defaultConfig.environment },
      database: { ...this.defaultConfig.database },
      auth: { ...this.defaultConfig.auth },
    };
  }

  private mergeWithDefaults(parsed: SetupConfig): SetupConfig {
    return {
      environment: { ...this.defaultConfig.environment, ...parsed.environment },
      database: { ...this.defaultConfig.database, ...parsed.database },
      auth: { ...this.defaultConfig.auth, ...parsed.auth },
    };
  }
}
