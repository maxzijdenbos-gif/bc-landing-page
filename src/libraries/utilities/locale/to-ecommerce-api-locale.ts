/**
 * E-commerce API expects .NET culture with uppercase region (e.g. `en-US`).
 * Next.js `router.locale` is often lowercase region (`en-us`).
 */
export function toEcommerceApiLocale(locale: string): string {
  return locale.replace(
    /-([a-z]{2})$/,
    (_, region) => `-${region.toUpperCase()}`,
  );
}
