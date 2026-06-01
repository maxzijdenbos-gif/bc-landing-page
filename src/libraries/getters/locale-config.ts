const normalizeLocaleValue = (locale: string) => locale.trim().toLowerCase();

const parseLocaleList = (value: string | undefined): string[] =>
  (value || '').split(',').map(normalizeLocaleValue).filter(Boolean);

const unique = (values: string[]) => [...new Set(values)];

const availableLocales = unique(
  parseLocaleList(process.env.NEXT_PUBLIC_AVAILABLE_COUNTRIES),
);
const allowedLocalesFromEnv = unique(
  parseLocaleList(process.env.NEXT_PUBLIC_ALLOWED_LOCALES),
);

export const AVAILABLE_LOCALES = availableLocales.length
  ? availableLocales
  : ['en-us'];

export const ALLOWED_LOCALES = allowedLocalesFromEnv.length
  ? allowedLocalesFromEnv
  : AVAILABLE_LOCALES;

export const FALLBACK_LOCALE = AVAILABLE_LOCALES[0];

export const normalizeLocale = (locale?: string) =>
  locale ? normalizeLocaleValue(locale) : '';

export const isAllowedLocale = (locale?: string) =>
  ALLOWED_LOCALES.includes(normalizeLocale(locale));

export const isSupportedLocale = (locale?: string) =>
  AVAILABLE_LOCALES.includes(normalizeLocale(locale));
