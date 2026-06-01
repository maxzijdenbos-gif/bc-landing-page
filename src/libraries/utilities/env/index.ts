import { z } from 'zod';
import {
  envSchema,
  type EnvSchemaOutput,
} from 'libraries/utilities/schemas/env-schema';

export type Env = EnvSchemaOutput;

// Cached validation result
let validatedEnv: Env | null = null;

export function validateEnv(): Env {
  // Return cached result if already validated, this avoids re-validation on subsequent calls
  if (validatedEnv) return validatedEnv;

  try {
    validatedEnv = envSchema.parse(process.env);
    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(
        (issue) => `${issue.path.join('.')}: ${issue.message}`,
      );
      throw new Error(
        `\n\n❌ Environment variables validation failed.\n\n${missingVars.join('\n')}\n\nPlease check your .env file.\n`,
      );
    }
    throw error;
  }
}

// Validate immediately when this module is imported
// This ensures validation happens at startup, not on every request
export const env = validateEnv();

// Helper functions for environment checks
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';

export default env;
