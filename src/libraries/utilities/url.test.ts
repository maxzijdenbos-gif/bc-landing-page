import { describe, expect, it } from 'vitest';
import { joinUrl } from './url';

describe('joinUrl', () => {
  it('joins parts with a single slash', () => {
    expect(joinUrl('https://example.com', 'base', 'en', 'sitemap.xml')).toBe(
      'https://example.com/base/en/sitemap.xml',
    );
  });

  it('preserves the protocol double slash', () => {
    expect(joinUrl('https://example.com', 'page')).toBe(
      'https://example.com/page',
    );
  });

  it('trims trailing slashes on the first part', () => {
    expect(joinUrl('https://example.com/', 'page')).toBe(
      'https://example.com/page',
    );
    expect(joinUrl('https://example.com///', 'page')).toBe(
      'https://example.com/page',
    );
  });

  it('trims leading and trailing slashes on interior parts', () => {
    expect(joinUrl('https://example.com', '/base/', '/en/')).toBe(
      'https://example.com/base/en',
    );
  });

  it('skips undefined, null and empty parts', () => {
    expect(joinUrl('https://example.com', undefined, 'en')).toBe(
      'https://example.com/en',
    );
    expect(joinUrl('https://example.com', null, 'en')).toBe(
      'https://example.com/en',
    );
    expect(joinUrl('https://example.com', '', 'en')).toBe(
      'https://example.com/en',
    );
  });

  it('skips parts that become empty after trimming', () => {
    expect(joinUrl('https://example.com', '///', 'en')).toBe(
      'https://example.com/en',
    );
  });

  it('returns an empty string when all parts are falsy', () => {
    expect(joinUrl()).toBe('');
    expect(joinUrl(undefined, '', null)).toBe('');
  });

  it('handles a single part without adding separators', () => {
    expect(joinUrl('https://example.com/')).toBe('https://example.com');
    expect(joinUrl('en')).toBe('en');
  });

  it('does not collapse slashes inside a single interior part', () => {
    expect(joinUrl('https://example.com', 'a/b/c')).toBe(
      'https://example.com/a/b/c',
    );
  });

  it('works with a relative first part', () => {
    expect(joinUrl('/base', 'en', 'sitemap.xml')).toBe('/base/en/sitemap.xml');
  });
});
