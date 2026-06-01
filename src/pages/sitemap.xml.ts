import { GetServerSideProps } from 'next';
import config from 'next.config';
import { ALLOWED_LOCALES } from 'libraries/getters/locale-config';
import { joinUrl } from 'libraries/utilities/url';
import { escapeXml } from 'libraries/utilities/xml';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const rootUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME;
  const localeSitemaps = ALLOWED_LOCALES.map((locale) => {
    const loc = joinUrl(rootUrl, config.basePath, locale, 'sitemap.xml');

    return `<sitemap><loc>${escapeXml(loc)}</loc></sitemap>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${localeSitemaps}</sitemapindex>`;

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
