/**
 * Escapes characters that are unsafe in XML text or attribute content.
 *
 * Replaces the five predefined XML entities:
 * `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`, `'` → `&apos;`, `"` → `&quot;`.
 *
 * Use this when interpolating arbitrary strings into XML documents (e.g. a
 * sitemap `<loc>` value) to guarantee the output remains well-formed.
 *
 * @param str The raw string to escape.
 * @returns The input with unsafe characters replaced by their XML entities.
 *
 * @example
 *   escapeXml('a & b <c>') // => 'a &amp; b &lt;c&gt;'
 */
export function escapeXml(str: string): string {
  return str.replace(/[<>&'"]/g, (char: string): string => {
    switch (char) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return char;
    }
  });
}
