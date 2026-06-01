import config from 'next.config';
import { getContentClient } from 'integrations/content/amplience/endpoints/get-content/get-content-client';
import { ContentPageResponse } from 'integrations/content/amplience/types/content-types';

const fetchParentNode = async (
  id: string,
  locale?: Locale,
  stagingEnvironment?: string,
) => {
  const response = await getContentClient({
    locale,
    stagingEnvironment,
  }).getContentItemById(id);

  return response;
};

export const getBreadCrumbFromContentPageResponse = ({
  _meta,
  pageNavigation,
  locale,
}: ContentPageResponse & { locale: string }) => {
  const localeDeliveryKey = _meta.deliveryKeys?.values.map((item) => {
    return { locale: item.value.split('/')[0], value: item.value };
  });

  return {
    internalLink:
      localeDeliveryKey?.find((item) => item.locale === locale)?.value ??
      _meta?.deliveryKey ??
      null,
    linkText:
      pageNavigation?.breadcrumbName ??
      pageNavigation?.urlName ??
      _meta?.name ??
      null,
  };
};

export const fetchBreadcrumbs = async (
  parentId: string,
  linkBuffer: BaseLink[],
  locale: Locale,
  stagingEnvironment?: string,
) => {
  const response = await fetchParentNode(parentId, locale, stagingEnvironment);

  if (response.body._meta.deliveryKey !== locale) {
    linkBuffer.push(
      getBreadCrumbFromContentPageResponse({ ...response.body, locale }),
    );
  }

  if (response.body._meta?.hierarchy?.parentId) {
    await fetchBreadcrumbs(
      response.body._meta?.hierarchy?.parentId,
      linkBuffer,
      locale,
      stagingEnvironment,
    );
  }

  return {
    breadcrumbLinks: [
      ...linkBuffer,
    ].reverse() /* Reverse to make parents go before children */,
  };
};

export const generateSchemaBreadcrumbs = (
  currentLink: BaseLink | null,
  breadcrumbs: BaseLink[],
  locale: string,
) => {
  const items = [...(breadcrumbs || [])];

  if (currentLink && currentLink.linkText !== 'Home') {
    items.push(currentLink);
  }

  const domain = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${config.basePath}/${locale}`;

  const getFallbackName = (internalLink: string) => {
    const segments = internalLink.split('/').filter(Boolean);

    return segments[segments.length - 1]?.replace(/-/g, ' ') || 'Unknown';
  };

  const itemListElement: any[] = [
    {
      '@type': 'ListItem',
      item: {
        '@id': domain,
        '@type': 'WebPage',
        name: 'Home',
      },
      position: 1,
    },
  ];

  let lastValidId = domain;

  items.forEach(({ linkText, internalLink }, index) => {
    const isLast = index === items.length - 1;
    const position = index + 2;

    const name = linkText?.trim()
      ? linkText
      : getFallbackName(internalLink ?? '');

    const nameSlug = name.replace(/\s+/g, '-').toLowerCase();

    if (isLast) {
      itemListElement.push({
        '@type': 'ListItem',
        name,
        position,
      });
    } else {
      let id: string;

      if (internalLink) {
        id = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${config.basePath}/${internalLink}`;
        lastValidId = id;
      } else {
        id = `${lastValidId}/${nameSlug}`;
      }

      itemListElement.push({
        '@type': 'ListItem',
        item: {
          '@id': id,
          '@type': 'WebPage',
          name,
        },
        position,
      });
    }
  });

  const navigationName = currentLink?.linkText?.trim()
    ? currentLink.linkText
    : getFallbackName(currentLink?.internalLink ?? '');

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
    name: navigationName,
  });
};
