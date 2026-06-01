/** @vitest-environment jsdom */

/**
 * This file is .tsx (not .ts) because it contains JSX: the createWrapper
 * component uses <QueryClientProvider>. TypeScript requires the .tsx extension
 * for any file that contains JSX syntax.
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ecommerceApiQuery } from 'integrations/ecommerce-api/ecommerce-client';
import { useCartGuidFromCookie } from 'libraries/hooks/use-cart-guid-from-cookie';
import { useCart } from './use-cart';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));
vi.mock('libraries/hooks/use-cart-guid-from-cookie');
vi.mock('integrations/ecommerce-api/ecommerce-client', () => ({
  ecommerceApiQuery: {
    useMutation: vi.fn(),
    useQuery: vi.fn(),
  },
}));

const mockUseRouter = vi.mocked(useRouter);
const mockUseCartGuidFromCookie = vi.mocked(useCartGuidFromCookie);
const mockUseQuery = vi.mocked(ecommerceApiQuery.useQuery);
const mockUseMutation = vi.mocked(ecommerceApiQuery.useMutation);

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe('useCart', () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue({ asPath: '/en-us/test' } as ReturnType<
      typeof useRouter
    >);
    mockUseCartGuidFromCookie.mockReturnValue('cart-guid-123');
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
    } as ReturnType<typeof ecommerceApiQuery.useQuery>);
    mockUseMutation.mockReturnValue({
      mutate: mockMutate,
    } as unknown as ReturnType<typeof ecommerceApiQuery.useMutation>);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns cartData, isCartLoading, and onQuantityChange', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });
    expect(result.current).toHaveProperty('cartData');
    expect(result.current).toHaveProperty('isCartLoading');
    expect(result.current).toHaveProperty('onQuantityChange');
    expect(typeof result.current.onQuantityChange).toBe('function');
  });

  it('useQuery is called with cart path and enabled when cartGuid and locale exist', () => {
    renderHook(() => useCart(), { wrapper: createWrapper() });
    expect(mockUseQuery).toHaveBeenCalledWith(
      'get',
      '/carts/{cartGuid}',
      expect.objectContaining({
        params: {
          path: { cartGuid: 'cart-guid-123' },
          query: { Locale: 'en-US' },
        },
      }),
      expect.objectContaining({ enabled: true }),
    );
  });

  it('useQuery is disabled when cartGuid is null', () => {
    mockUseCartGuidFromCookie.mockReturnValue(null);
    renderHook(() => useCart(), { wrapper: createWrapper() });
    expect(mockUseQuery).toHaveBeenCalledWith(
      'get',
      '/carts/{cartGuid}',
      expect.any(Object),
      expect.objectContaining({ enabled: false }),
    );
  });

  it('onQuantityChange with quantity 0 calls delete mutation', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });
    result.current.onQuantityChange(42, 0);
    expect(mockUseMutation).toHaveBeenCalledWith(
      'delete',
      '/carts/{cartGuid}/items/{cartItemId}',
    );
    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { path: { cartGuid: 'cart-guid-123', cartItemId: 42 } },
      }),
      expect.any(Object),
    );
  });

  it('onQuantityChange with quantity >= 1 calls patch mutation after debounce', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });
    result.current.onQuantityChange(10, 2);
    expect(mockMutate).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(350);
    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        body: { quantity: 2 },
        params: { path: { cartGuid: 'cart-guid-123', cartItemId: 10 } },
      }),
      expect.any(Object),
    );
  });
});
