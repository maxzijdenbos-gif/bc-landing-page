/**
 * Joins URL parts with a single `/` separator.
 *
 * - Falsy parts (undefined, empty string) are skipped.
 * - Trailing slashes on the first part are trimmed.
 * - Leading and trailing slashes on interior/trailing parts are trimmed, so
 *   passing `basePath` variants with or without slashes yields the same result.
 * - Protocol separators (e.g. `https://`) in the first part are preserved.
 *
 * @example
 *   joinUrl('https://example.com/', '/base/', 'en', 'sitemap.xml')
 *   // => 'https://example.com/base/en/sitemap.xml'
 */
export function joinUrl(...parts: (string | undefined | null)[]): string {
  return parts
    .filter((part): part is string => Boolean(part))
    .map((part, index) =>
      index === 0 ? part.replace(/\/+$/, '') : part.replace(/^\/+|\/+$/g, ''),
    )
    .filter(Boolean)
    .join('/');
}
