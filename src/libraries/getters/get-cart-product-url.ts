/**
 * Normalize a cart item product URL to the main site external URL.
 * Converts relative paths like
 * /us/anthem-advanced-29-3-2025?partnumber=1008007105
 * to https://www.giant-bicycles.com/us/anthem-advanced-29-3-2025?partnumber=1008007105
 *
 * @param url - URL from cart item (relative path or already absolute)
 * @returns External URL for the main site, or null to keep as internal link
 */
export function getCartProductExternalUrl(url: string): string | null {
  if (url.startsWith('http')) {
    return url;
  }
  const mainSite = process.env.NEXT_PUBLIC_DOMAIN_NAME;
  if (!mainSite) return null;

  return `${mainSite}${url}`;
}
