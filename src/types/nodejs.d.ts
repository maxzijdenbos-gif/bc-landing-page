import type { EnvSchemaInput } from 'libraries/utilities/schemas/env-schema';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaInput {}
  }
}
export {};
