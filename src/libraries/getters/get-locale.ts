import {
  AVAILABLE_LOCALES,
  FALLBACK_LOCALE,
  normalizeLocale,
} from './locale-config';

const getConfiguredBasePathSegment = () =>
  (process.env.NEXT_PUBLIC_AMPLIENCE_BASE_PATH ?? '').replace(/^\//, '').trim();

const stripQueryAndHash = (path: string): string =>
  path.split('?')[0].split('#')[0] || '';

/**
 * Next `router.asPath` includes `basePath` when set (e.g. `/discover/en-us/...`).
 * Strip it before reading locale or slug segments.
 */
export const stripConfiguredBasePath = (pathname: string): string => {
  const base = getConfiguredBasePathSegment();

  if (!base) {
    return pathname.startsWith('/') ? pathname : `/${pathname}`;
  }

  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const prefix = `/${base}`;

  if (normalized === prefix) {
    return '/';
  }

  if (normalized.startsWith(`${prefix}/`)) {
    const rest = normalized.slice(prefix.length);

    return rest.startsWith('/') ? rest : `/${rest}`;
  }

  return normalized;
};

/** Slug path after `/{locale}/` for navigation matching (Amplience keys use `locale/slug`). */
export const getPathForNavigationMatch = (
  asPath: string | undefined,
  locale: string,
): string => {
  if (!asPath) return '';

  const pathOnly = stripQueryAndHash(asPath);
  const stripped = stripConfiguredBasePath(pathOnly);
  const clean = stripped.replace(/^\//, '');
  const loc = normalizeLocale(locale);
  const parts = clean.split('/').filter(Boolean);

  if (parts[0] && parts[0] === loc) {
    return parts.slice(1).join('/');
  }

  return clean;
};

const isLocale = (locale?: string): locale is Locale => {
  return AVAILABLE_LOCALES.includes(normalizeLocale(locale));
};

const getLocale = (locale?: string): Locale => {
  const normalizedLocale = normalizeLocale(locale);

  if (isLocale(normalizedLocale)) {
    return normalizedLocale;
  }

  return FALLBACK_LOCALE;
};

export const getLocaleFromPath = (pathname: string): Locale | false => {
  const locale = normalizeLocale(pathname.split('/')[0]);

  return isLocale(locale) ? locale : false;
};

export interface PathLocaleInfo {
  cleanPath: string;
  localeInPath: Locale | false;
  normalizedPath: string;
}

export const extractLocaleFromPath = (path: string): PathLocaleInfo => {
  const pathOnly = stripQueryAndHash(path);
  const stripped = stripConfiguredBasePath(pathOnly);
  const normalizedPath = stripped === '/' ? '' : stripped;
  const cleanPath = normalizedPath.replace(/^\//, '');
  const localeInPath = getLocaleFromPath(cleanPath);

  return {
    cleanPath,
    localeInPath,
    normalizedPath,
  };
};

export const getLocaleFromAsPath = (asPath?: string): Locale => {
  if (!asPath) return FALLBACK_LOCALE;

  const pathWithoutQuery = stripQueryAndHash(asPath);
  const stripped = stripConfiguredBasePath(pathWithoutQuery);
  const cleanPath = stripped.replace(/^\//, '');
  const localeFromPath = getLocaleFromPath(cleanPath);

  return localeFromPath || FALLBACK_LOCALE;
};

export { FALLBACK_LOCALE };

export default getLocale;
