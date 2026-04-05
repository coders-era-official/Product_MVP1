/** Environment tier for API configuration. */
export type DeploymentEnvironment = 'dev' | 'staging' | 'prod';

/** Step 1 — API / runtime environment. */
export interface EnvironmentSettings {
  apiBaseUrl: string;
  port: number;
  environment: DeploymentEnvironment;
}

/** Step 2 — database connection. */
export interface DatabaseConfig {
  host: string;
  name: string;
  user: string;
  password: string;
}

/** Step 3 — auth-related settings (non-secret hint only). */
export interface AuthSettings {
  jwtSecretHint: string;
  tokenExpiry: string;
}

/** Full setup wizard payload persisted between steps. */
export interface SetupConfig {
  environment: EnvironmentSettings;
  database: DatabaseConfig;
  auth: AuthSettings;
}
