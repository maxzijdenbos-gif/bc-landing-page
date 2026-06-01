import { type QueryClient, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import type {
  CartData,
  CartItemData,
} from 'integrations/ecommerce-api/ecommerce-api.types';
import { ecommerceApiQuery } from 'integrations/ecommerce-api/ecommerce-client';
import {
  trackEcommerceAddToCart,
  trackEcommerceRemoveFromCart,
} from 'integrations/tracking/google-tag-manager/scripts';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import { useCartGuidFromCookie } from 'libraries/hooks/use-cart-guid-from-cookie';
import { toEcommerceApiLocale } from 'libraries/utilities/locale/to-ecommerce-api-locale';

const QUANTITY_DEBOUNCE_MS = 350;

/** Path used for cart GET query and invalidateQueries predicate. */
const CART_QUERY_PATH = '/carts/{cartGuid}';

/**
 * Reads the cart from the React Query cache. Must use the same key as `useQuery`
 * (including non-empty `cartGuid` and `Locale`).
 */
function getCartDataFromQueryClient(
  queryClient: QueryClient,
  cartGuid: string,
  apiLocale: string,
): CartData | undefined {
  return queryClient.getQueryData<CartData>([
    'get',
    CART_QUERY_PATH,
    {
      params: {
        path: { cartGuid },
        query: { Locale: apiLocale },
      },
    },
  ]);
}

function getCartItemRelationParentId(
  relation: CartItemData['relation'],
): number | undefined {
  if (!relation || typeof relation !== 'object' || !('parentId' in relation)) {
    return undefined;
  }
  const parentId = (relation as { parentId?: number }).parentId;
  return typeof parentId === 'number' && Number.isFinite(parentId)
    ? parentId
    : undefined;
}
function getChildCartLinesForParent(
  cart: CartData,
  parentCartItemId: number,
): CartItemData[] {
  return cart.items.filter(
    (i) => getCartItemRelationParentId(i.relation) === parentCartItemId,
  );
}

export interface OnQuantityChangeOptions {
  onError?: () => void;
}

export type OnQuantityChange = (
  cartItemId: number,
  newQuantity: number,
  options?: OnQuantityChangeOptions,
) => void;

/**
 * Hook that handles cart cookie, fetching cart from the e-commerce API,
 * and updating item quantity (PATCH/DELETE). Use in a parent of the cart UI
 * and pass the returned data/callbacks to the presentational cart component.
 * Quantity updates are debounced so rapid stepper clicks result in a single
 * PATCH per item; remove (quantity 0) is applied immediately.
 * Callers may pass onError so the UI can roll back optimistic updates on failure.
 */
export function useCart(): {
  cartData: CartData | undefined;
  isCartLoading: boolean;
  onQuantityChange: OnQuantityChange;
} {
  const { asPath } = useRouter();
  const pathLocale = useMemo(() => getLocaleFromAsPath(asPath), [asPath]);
  const cartGuid = useCartGuidFromCookie(pathLocale);
  const queryClient = useQueryClient();

  const apiLocale = useMemo(
    () => (pathLocale ? toEcommerceApiLocale(pathLocale) : ''),
    [pathLocale],
  );

  const { data: cartData, isLoading: isCartLoading } =
    ecommerceApiQuery.useQuery(
      'get',
      CART_QUERY_PATH,
      {
        params: {
          path: { cartGuid: cartGuid ?? '' },
          query: { Locale: apiLocale },
        },
      },
      {
        enabled: Boolean(cartGuid && apiLocale),
      },
    );

  const patchCartItemMutation = ecommerceApiQuery.useMutation(
    'patch',
    '/carts/{cartGuid}/items/{cartItemId}',
  );
  const deleteCartItemMutation = ecommerceApiQuery.useMutation(
    'delete',
    '/carts/{cartGuid}/items/{cartItemId}',
  );

  const invalidateCart = useCallback(() => {
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] === 'get' && query.queryKey[1] === CART_QUERY_PATH,
    });
  }, [queryClient]);

  const pendingTimeoutByItemRef = useRef<
    Map<number, ReturnType<typeof setTimeout>>
  >(new Map());

  const commitQuantityChange = useCallback(
    (
      cartItemId: number,
      newQuantity: number,
      options?: OnQuantityChangeOptions,
    ) => {
      if (!cartGuid || !Number.isFinite(cartItemId)) return;
      if (newQuantity < 1) {
        deleteCartItemMutation.mutate(
          { params: { path: { cartGuid, cartItemId } } },
          {
            onError: options?.onError,
            onSuccess: () => {
              const cart = getCartDataFromQueryClient(
                queryClient,
                cartGuid,
                apiLocale,
              );
              const line = cart?.items.find((i) => i.id === cartItemId);

              invalidateCart();
              if (cart && line) {
                trackEcommerceRemoveFromCart(cart, line, line.quantity);
                // also trigger remove from cart event for child items, when parent is removed
                for (const childLine of getChildCartLinesForParent(
                  cart,
                  cartItemId,
                )) {
                  trackEcommerceRemoveFromCart(
                    cart,
                    childLine,
                    childLine.quantity,
                  );
                }
              }
            },
          },
        );
      } else {
        patchCartItemMutation.mutate(
          {
            body: { quantity: newQuantity },
            params: { path: { cartGuid, cartItemId } },
          },
          {
            onError: options?.onError,
            onSuccess: () => {
              const cart = getCartDataFromQueryClient(
                queryClient,
                cartGuid,
                apiLocale,
              );
              const line = cart?.items.find((i) => i.id === cartItemId);
              invalidateCart();
              if (!cart || !line) return;
              const oldQty = line.quantity ?? 1;
              const childLines = getChildCartLinesForParent(cart, cartItemId);
              if (newQuantity > oldQty) {
                const added = newQuantity - oldQty;
                trackEcommerceAddToCart(cart, line, added);
                for (const childLine of childLines) {
                  trackEcommerceAddToCart(cart, childLine, added);
                }
              } else if (newQuantity < oldQty) {
                const removed = oldQty - newQuantity;
                trackEcommerceRemoveFromCart(cart, line, removed);
                for (const childLine of childLines) {
                  trackEcommerceRemoveFromCart(cart, childLine, removed);
                }
              }
            },
          },
        );
      }
    },
    [
      apiLocale,
      cartGuid,
      deleteCartItemMutation,
      invalidateCart,
      patchCartItemMutation,
      queryClient,
    ],
  );

  // quantity change with debounce, so it doesn't update the quantity on each click
  const onQuantityChange = useCallback(
    (
      cartItemId: number,
      newQuantity: number,
      options?: OnQuantityChangeOptions,
    ) => {
      if (!cartGuid || !Number.isFinite(cartItemId)) return;

      const existingTimeoutId = pendingTimeoutByItemRef.current.get(cartItemId);
      if (existingTimeoutId !== undefined) {
        clearTimeout(existingTimeoutId);
        pendingTimeoutByItemRef.current.delete(cartItemId);
      }

      // no delay on the delete of a cart item
      if (newQuantity < 1) {
        commitQuantityChange(cartItemId, newQuantity, options);
        return;
      }

      const timeoutId = setTimeout(() => {
        pendingTimeoutByItemRef.current.delete(cartItemId);
        commitQuantityChange(cartItemId, newQuantity, options);
      }, QUANTITY_DEBOUNCE_MS);

      pendingTimeoutByItemRef.current.set(cartItemId, timeoutId);
    },
    [cartGuid, commitQuantityChange],
  );

  useEffect(() => {
    const pendingTimeouts = pendingTimeoutByItemRef.current;
    return () => {
      pendingTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
      pendingTimeouts.clear();
    };
  }, [cartGuid]);

  return {
    cartData,
    isCartLoading,
    onQuantityChange,
  };
}
