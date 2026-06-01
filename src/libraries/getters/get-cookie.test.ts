/** @vitest-environment jsdom */

import { beforeEach, describe, expect, it } from 'vitest';
import { getCookie } from './get-cookie';

describe('getCookie', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('returns null when name is empty', () => {
    document.cookie = 'foo=bar';
    expect(getCookie('')).toBeNull();
  });

  it('returns null when cookie is not set', () => {
    document.cookie = 'other=value';
    expect(getCookie('missing')).toBeNull();
  });

  it('returns cookie value when set', () => {
    document.cookie = 'foo=bar';
    expect(getCookie('foo')).toBe('bar');
  });

  it('returns first cookie value when multiple cookies exist', () => {
    document.cookie = 'first=one';
    document.cookie = 'second=two';
    expect(getCookie('first')).toBe('one');
    expect(getCookie('second')).toBe('two');
  });

  it('returns null when cookie value is empty', () => {
    document.cookie = 'empty=';
    expect(getCookie('empty')).toBeNull();
  });

  it('handles value with semicolon (stops at next cookie)', () => {
    document.cookie = 'a=val1';
    document.cookie = 'b=val2';
    expect(getCookie('a')).toBe('val1');
    expect(getCookie('b')).toBe('val2');
  });
});
