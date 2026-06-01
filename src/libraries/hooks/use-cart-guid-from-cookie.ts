import { useEffect, useState } from 'react';
import { getCartGuidFromCookie } from 'libraries/getters/get-cart-guid-from-cookie';

/**
 * Returns the cart GUID from the "cart-{locale}" cookie when available (client-side).
 * Updates when locale changes.
 */
export function useCartGuidFromCookie(locale: string): string | null {
  const [cartGuid, setCartGuid] = useState<string | null>(null);

  useEffect(() => {
    setCartGuid(getCartGuidFromCookie(locale));
  }, [locale]);

  return cartGuid;
}
