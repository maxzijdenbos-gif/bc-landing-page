import { ParsedUrlQuery } from 'querystring';

interface LocaleParams extends ParsedUrlQuery {
  locale?: string | string[];
  slug?: string | string[];
}

export const getLocaleParam = (params?: ParsedUrlQuery) => {
  const locale = (params as LocaleParams | undefined)?.locale;

  return typeof locale === 'string' ? locale : undefined;
};

export const getSlugParam = (params?: ParsedUrlQuery) => {
  const slug = (params as LocaleParams | undefined)?.slug;

  if (Array.isArray(slug)) return slug;
  if (typeof slug === 'string') return [slug];

  return [];
};
