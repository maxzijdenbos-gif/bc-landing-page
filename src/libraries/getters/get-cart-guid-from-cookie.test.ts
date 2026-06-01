/** @vitest-environment jsdom */

import { beforeEach, describe, expect, it } from 'vitest';
import { getCartGuidFromCookie } from './get-cart-guid-from-cookie';

describe('getCartGuidFromCookie', () => {
  beforeEach(() => {
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0]?.trim();

      if (name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }
    });
  });

  it('returns null when locale is empty', () => {
    expect(getCartGuidFromCookie('')).toBeNull();
  });

  it('returns null when no cart cookie is set', () => {
    document.cookie = 'other=value';
    expect(getCartGuidFromCookie('en-US')).toBeNull();
  });

  it('returns cart GUID when cart-{locale} cookie is set', () => {
    document.cookie = 'cart-en-US=abc-123-guid';
    expect(getCartGuidFromCookie('en-US')).toBe('abc-123-guid');
  });

  it('normalizes locale to culture-region format (en-us -> cart-en-US)', () => {
    document.cookie = 'cart-en-US=my-guid';
    expect(getCartGuidFromCookie('en-us')).toBe('my-guid');
  });

  it('returns null when cookie value is empty', () => {
    document.cookie = 'cart-en-US=';
    expect(getCartGuidFromCookie('en-US')).toBeNull();
  });

  it('returns first cookie value when cookie is set', () => {
    document.cookie = 'cart-en-US=first-guid';
    expect(getCartGuidFromCookie('en-US')).toBe('first-guid');
  });
});
