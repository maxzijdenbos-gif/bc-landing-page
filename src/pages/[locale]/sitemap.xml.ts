import { GetServerSideProps, PreviewData } from 'next';
import config from 'next.config';
import { getHierarchyByKey } from 'integrations/content/amplience/endpoints/hierarchy-api/get-hierarchy';
import { getLocaleParam } from 'libraries/getters/get-page-route-params';
import {
  FALLBACK_LOCALE,
  isAllowedLocale,
  normalizeLocale,
} from 'libraries/getters/locale-config';
import { joinUrl } from 'libraries/utilities/url';
import { escapeXml } from 'libraries/utilities/xml';

const recursivelyGenerateUrls = async (
  { content, children }: { children: any[]; content: any },
  urls: Set<string> = new Set(),
  locale = FALLBACK_LOCALE,
  stagingEnvironment?: string,
) => {
  if (content?.pageMetaData?.index) {
    if (content?._meta?.deliveryKey) {
      urls.add(content._meta.deliveryKey);
    } else if (content?._meta?.deliveryKeys?.values?.length > 0) {
      const match = content._meta.deliveryKeys.values.find(
        (item: { value: string }) => item.value.startsWith(locale),
      );
      if (match?.value) urls.add(match.value);
    }
  }

  await Promise.all(
    children.map((child) =>
      recursivelyGenerateUrls(child, urls, locale, stagingEnvironment),
    ),
  );

  return urls;
};

const getFallbackLocaleHomepage = () => {
  const basePath = process.env.NEXT_PUBLIC_AMPLIENCE_BASE_PATH;

  return `${basePath ? `/${basePath}` : ''}/${FALLBACK_LOCALE}`;
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  previewData,
  res,
}) => {
  const locale = normalizeLocale(getLocaleParam(params));

  if (!isAllowedLocale(locale)) {
    return {
      redirect: {
        destination: getFallbackLocaleHomepage(),
        permanent: false,
      },
    };
  }

  const rootUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME;
  const stagingEnvironment = previewData as PreviewData | undefined;
  const hierarchy = await getHierarchyByKey(locale, {
    locale,
    maximumDepth: 14,
  });
  const urls = await recursivelyGenerateUrls(
    hierarchy,
    undefined,
    locale,
    stagingEnvironment?.toString(),
  );

  const sitemap = Array.from(urls)
    .map((path) => {
      const pageUrl = joinUrl(rootUrl, config.basePath, path);

      return `<url><loc>${escapeXml(encodeURI(pageUrl))}</loc></url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400',
  );
  res.end(xml);

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
