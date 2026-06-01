import { NextRouter } from 'next/router';
import { InternalLinkMapTypeRecord } from 'libraries/contexts/internal-navigation-context';
import {
  extractLocaleFromPath,
  getLocaleFromAsPath,
  getLocaleFromPath,
} from './get-locale';

const domainAndBasePath = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${
  process.env.NEXT_PUBLIC_AMPLIENCE_BASE_PATH
    ? `/${process.env.NEXT_PUBLIC_AMPLIENCE_BASE_PATH}`
    : ''
}`;

export const getUrlFromPath = (path: string) => {
  if (!process.env.NEXT_PUBLIC_DOMAIN_NAME) return null;

  return `${domainAndBasePath}/${path}`;
};

export const getFullPathFromInternalLinkRef = (
  linkRef: BaseLink['internalLinkRef'] | null,
  internalLinks?: InternalLinkMapTypeRecord,
  router?: NextRouter,
) => {
  const localeFromRouterPath = getLocaleFromAsPath(router?.asPath);
  const localeForPath =
    getLocaleFromPath(localeFromRouterPath) || localeFromRouterPath;
  let pathname =
    linkRef &&
    linkRef?.[0]?.id &&
    internalLinks?.[linkRef?.[0].id]?.[localeForPath];

  if (pathname) {
    pathname = `/${pathname}`;
  }

  let canonical = pathname;

  if (!canonical && router?.asPath) {
    const { localeInPath, normalizedPath } = extractLocaleFromPath(
      router.asPath,
    );

    if (localeInPath) {
      // asPath already contains locale, use it as-is
      canonical = normalizedPath.startsWith('/')
        ? normalizedPath
        : `/${normalizedPath}`;
    } else {
      // asPath doesn't have locale, prepend current locale
      canonical = `/${localeFromRouterPath}${normalizedPath}`;
    }
  }

  if (router?.pathname === '/404' || router?.pathname === '/500') {
    return;
  }

  canonical = canonical?.split('?')[0] || '';

  return canonical.startsWith('http')
    ? canonical
    : `${domainAndBasePath}${canonical}`;
};
