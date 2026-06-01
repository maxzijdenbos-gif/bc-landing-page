import { describe, expect, it } from 'vitest';
import { escapeXml } from './xml';

describe('escapeXml', () => {
  it('escapes the five predefined XML entities', () => {
    expect(escapeXml('<')).toBe('&lt;');
    expect(escapeXml('>')).toBe('&gt;');
    expect(escapeXml('&')).toBe('&amp;');
    expect(escapeXml("'")).toBe('&apos;');
    expect(escapeXml('"')).toBe('&quot;');
  });

  it('escapes all occurrences in a mixed string', () => {
    expect(escapeXml('a & b <c> "d" \'e\'')).toBe(
      'a &amp; b &lt;c&gt; &quot;d&quot; &apos;e&apos;',
    );
  });

  it('does not double-escape existing entities', () => {
    expect(escapeXml('&amp;')).toBe('&amp;amp;');
  });

  it('leaves strings with no unsafe characters unchanged', () => {
    expect(escapeXml('hello world')).toBe('hello world');
    expect(escapeXml('https://example.com/en/sitemap.xml')).toBe(
      'https://example.com/en/sitemap.xml',
    );
  });

  it('returns an empty string for empty input', () => {
    expect(escapeXml('')).toBe('');
  });

  it('preserves non-ASCII characters', () => {
    expect(escapeXml('café & résumé')).toBe('café &amp; résumé');
  });
});
