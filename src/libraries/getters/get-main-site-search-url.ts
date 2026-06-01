/** Main-site search URL for a keyword (matches header search submit). */
export function getMainSiteSearchUrlForKeyword(
  keyword: string,
  locale: string,
): string {
  const prefix = `/${locale.split('-')[1]?.toLowerCase()}/search?keyword=`;

  return prefix + encodeURIComponent(keyword);
}
