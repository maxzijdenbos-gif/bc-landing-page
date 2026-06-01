import { z } from 'zod';

export const envSchema = z
  .object({
    ACCESS_AMPLIENCE_CONFIG_DELIVERY_KEY: z.string(),
    ACCESS_AMPLIENCE_SECRET_KEY_AMPLIENCE: z.string(),
    ACCESS_AMPLIENCE_SECRET_KEY_INTERNAL: z.string(),
    ACCESS_RESTRICTED_LOCALE_PASSWORD_HASH: z.hash('sha256', { enc: 'base64' }),
    ACCESS_RESTRICTED_LOCALE_USERNAME_HASH: z.hash('sha256', { enc: 'base64' }),
    AMPLIENCE_GLOBAL_REPOSITORY_ID: z.string(),
    AMPLIENCE_NEXT_API_ROUTE_KEY: z.string(),
    AMPLIENCE_PAT: z.string(),
    BUILD_TARGET: z.enum(['storybook', 'nextjs']),
    KLAVIYO_API_KEY: z.string(),
    KLAVIYO_NEWSLETTER_LIST_ID: z.string(),
    NEXT_PUBLIC_ALLOWED_LOCALES: z
      .string()
      .transform((val) => val.split(',').map((string) => string.trim())),
    NEXT_PUBLIC_AMPLIENCE_BASE_PATH: z.string().optional(),
    NEXT_PUBLIC_AMPLIENCE_GLOBAL_LOCALE: z.string(),
    NEXT_PUBLIC_AMPLIENCE_HUB_ID: z.enum([
      'giantdev',
      'giantuat',
      'giantprod',
      'livdev',
      'livuat',
      'livprod',
    ]),
    NEXT_PUBLIC_AMPLIENCE_MAIN_SITE_URL: z.url(),
    NEXT_PUBLIC_AMPLIENCE_STAGING_ENV: z.hostname(),
    NEXT_PUBLIC_AMPLIENCE_VISUALISATION_DOMAIN: z.hostname(),
    NEXT_PUBLIC_AVAILABLE_COUNTRIES: z
      .string()
      .transform((val) => val.split(',').map((string) => string.trim())),
    NEXT_PUBLIC_DOMAIN_NAME: z.url(),
    NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string().optional(),
    NEXT_PUBLIC_THEME_NAME: z.enum(['giant', 'liv']),
    NEXT_PUBLIC_VWO_ACCOUNT_ID: z.string().optional(),
    NEXT_PUBLIC_VWO_SETTINGS_TOLERANCE: z.coerce
      .number<string>()
      .int()
      .positive()
      .default(2000),
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    REVALIDATE_TIME: z.coerce.number<string>().int().positive().default(600),
  })
  .readonly();

// Type for the input environment variables (before validation)
export type EnvSchemaInput = z.input<typeof envSchema>;

// Type for the validated environment variables
export type EnvSchemaOutput = z.output<typeof envSchema>;
