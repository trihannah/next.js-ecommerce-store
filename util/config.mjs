import { readFileSync } from 'node:fs';
import dotenv from 'dotenv';

export function setEnvironmentVariables() {
  if (process.env.NODE_ENV === 'production' || process.env.CI) {
    if (process.env.POSTGRES_URL) {
      process.env.PGHOST = process.env.POSTGRES_HOST;
      process.env.PGDATABASE = process.env.POSTGRES_DATABASE;
      process.env.PGUSERNAME = process.env.POSTGRES_USER;
      process.env.PGPASSWORD = process.env.POSTGRES_PASSWORD;
    }
    return;
  }

  dotenv.config();

  const unconfiguredEnvVars = Object.keys(
    dotenv.parse(readFileSync('./.env.example')),
  ).filter((exampleKey) => !process.env[exampleKey]);

  if (unconfiguredEnvVars.length > 0) {
    throw new Error(
      `.env.example environment ${
        unconfiguredEnvVars.length > 1 ? 'variables' : 'variable'
      } ${unconfiguredEnvVars.join(', ')} not configured in .env file`,
    );
  }
}
