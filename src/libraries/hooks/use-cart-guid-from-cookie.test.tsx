/** @vitest-environment jsdom */

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getCartGuidFromCookie } from 'libraries/getters/get-cart-guid-from-cookie';
import { useCartGuidFromCookie } from './use-cart-guid-from-cookie';

vi.mock('libraries/getters/get-cart-guid-from-cookie', () => ({
  getCartGuidFromCookie: vi.fn(),
}));

const mockGetCartGuidFromCookie = vi.mocked(getCartGuidFromCookie);

describe('useCartGuidFromCookie', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCartGuidFromCookie.mockReturnValue(null);
  });

  it('returns null when getCartGuidFromCookie returns null', () => {
    mockGetCartGuidFromCookie.mockReturnValue(null);
    const { result } = renderHook(() => useCartGuidFromCookie('en-US'));
    expect(result.current).toBeNull();
    expect(mockGetCartGuidFromCookie).toHaveBeenCalledWith('en-US');
  });

  it('returns cart GUID when getCartGuidFromCookie returns a value', () => {
    mockGetCartGuidFromCookie.mockReturnValue('abc-123-guid');
    const { result } = renderHook(() => useCartGuidFromCookie('en-US'));
    expect(result.current).toBe('abc-123-guid');
  });

  it('calls getCartGuidFromCookie again when locale changes', () => {
    mockGetCartGuidFromCookie.mockReturnValue(null);
    const { rerender } = renderHook(
      ({ locale }) => useCartGuidFromCookie(locale),
      { initialProps: { locale: 'en-US' } },
    );
    expect(mockGetCartGuidFromCookie).toHaveBeenCalledWith('en-US');
    mockGetCartGuidFromCookie.mockReturnValue('guid-de');
    rerender({ locale: 'de-DE' });
    expect(mockGetCartGuidFromCookie).toHaveBeenCalledWith('de-DE');
  });
});
