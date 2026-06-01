import { getCookie } from './get-cookie';

/**
 * Cookie name for the cart GUID is "cart-{locale}" in culture-region format (e.g. "cart-en-US").
 * Only safe to call in the browser (document is defined).
 */
const CART_COOKIE_PREFIX = 'cart-';

/** Normalize locale to culture-region format (e.g. en-us → en-US) to match the cookie name. */
function toCookieLocale(locale: string): string {
  return locale.replace(
    /-([a-z]{2})$/,
    (_, region) => `-${region.toUpperCase()}`,
  );
}

export function getCartGuidFromCookie(locale: string): string | null {
  if (!locale) return null;

  const name = `${CART_COOKIE_PREFIX}${toCookieLocale(locale)}`;
  return getCookie(name);
}
