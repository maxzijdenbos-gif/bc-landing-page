import { CART_DRAWER_ID } from 'constants/index';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'components/atoms/icon/icon';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import Drawer from 'components/utilities/drawer/drawer';
import type { CartData } from 'integrations/ecommerce-api/ecommerce-api.types';
import {
  trackEcommerceBeginCheckout,
  trackEcommerceViewCart,
  trackNavigationClick,
} from 'integrations/tracking/google-tag-manager/scripts';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import type { OnQuantityChange } from 'libraries/hooks/use-cart';
import MainNavigationShoppingCartItem from './main-navigation-shopping-cart-item/main-navigation-shopping-cart-item';
import {
  MainNavigationShoppingCartLoadingBody,
  MainNavigationShoppingCartLoadingFooter,
} from './main-navigation-shopping-cart-loading/main-navigation-shopping-cart-loading';
import MainNavigationShoppingCartTotals from './main-navigation-shopping-cart-totals/main-navigation-shopping-cart-totals';
import styles from './main-navigation-shopping-cart.module.scss';

const getCartTriggerAriaLabel = (
  t: (key: string) => string,
  itemCount: number | null | undefined,
) => {
  if (typeof itemCount === 'number' && itemCount > 0) {
    const countLabel = itemCount === 1 ? t('cart.item') : t('cart.items');
    return `${t('navigation.openCart')}, ${itemCount} ${countLabel} ${t('cart.inCart')}`;
  }
  return t('navigation.openCart');
};

export interface MainNavigationShoppingCartProps {
  cart?: CartData | null;
  cartLoading?: boolean;
  /** Link for the checkout button when cart has items. */
  checkoutButton?: BaseLink | null;
  menuOpen: boolean;
  /** Called when user changes quantity for a cart item (or removes when quantity becomes 0). */
  onQuantityChange?: OnQuantityChange;
  /** Link for "Continue shopping" when cart is empty. */
  shopButton?: BaseLink | null;
}

const MainNavigationShoppingCart = ({
  cart: cartData,
  cartLoading = false,
  checkoutButton,
  menuOpen,
  onQuantityChange,
  shopButton,
}: MainNavigationShoppingCartProps) => {
  const { t } = useI18n();
  const router = useRouter();
  const locale = getLocaleFromAsPath(router.asPath);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const prevDrawerOpenRef = useRef(false);
  const pendingViewCartRef = useRef(false);
  const currency = cartData?.total?.currency ?? 'USD';

  const itemCount =
    cartData?.items !== null && cartData?.items !== undefined
      ? cartData.items.reduce((sum, item) => sum + (item.quantity ?? 1), 0)
      : 0;

  const hasShoppingCartItems = itemCount > 0;

  const cartHasUnavailableItem =
    cartData?.items?.some((item) => item.hasNoStock) ?? false;

  useEffect(() => {
    const justOpened = cartDrawerOpen && !prevDrawerOpenRef.current;
    prevDrawerOpenRef.current = cartDrawerOpen;
    if (justOpened) {
      pendingViewCartRef.current = true;
    }
    if (!cartDrawerOpen) {
      pendingViewCartRef.current = false;
    }
  }, [cartDrawerOpen]);

  useEffect(() => {
    if (!cartDrawerOpen || !pendingViewCartRef.current) return;
    if (cartLoading) return;
    if (!cartData?.total) return;
    if (!cartData.items?.length) {
      pendingViewCartRef.current = false;
      return;
    }
    trackEcommerceViewCart(cartData);
    pendingViewCartRef.current = false;
  }, [cartDrawerOpen, cartLoading, cartData]);

  return (
    <React.Fragment>
      <button
        aria-controls={CART_DRAWER_ID}
        aria-expanded={cartDrawerOpen}
        aria-hidden={!!menuOpen}
        aria-label={getCartTriggerAriaLabel(t, itemCount ?? undefined)}
        className={styles.cartTrigger}
        type="button"
        onClick={() => {
          setCartDrawerOpen(true);
          trackNavigationClick({
            clickText: 'cart',
            title: 'n/a',
            title1: 'n/a',
          });
        }}
      >
        <Icon name="Cart_24" hidden />
        {hasShoppingCartItems && (
          <span aria-hidden className={styles.cartCountBadge}>
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>

      <Drawer
        id={CART_DRAWER_ID}
        isOpen={cartDrawerOpen}
        mobilePosition="bottom"
        onInternalClose={() => setCartDrawerOpen(false)}
        position="right"
      >
        <div className={styles.cartDrawerContext}>
          <div className={styles.cartDrawerContent}>
            <div className={styles.cartDrawerHeader}>
              <Typography
                tag="h2"
                tagStyle="headlineSmall"
                weight="bold"
                className={styles.cartDrawerHeaderTitle}
              >
                {t('cart.shoppingCartHeader')}
              </Typography>
              <button
                type="button"
                aria-label={t('navigation.closeMenu')}
                className={styles.cartDrawerCloseButton}
                onClick={() => setCartDrawerOpen(false)}
              >
                <Icon name="Close_24" hidden />
              </button>
            </div>

            <div className={styles.cartDrawerBody} aria-busy={cartLoading}>
              {cartLoading ? (
                <MainNavigationShoppingCartLoadingBody />
              ) : hasShoppingCartItems ? (
                <ul className={styles.cartDrawerItems}>
                  {cartData?.items.map((item, index) => (
                    <MainNavigationShoppingCartItem
                      key={String(item.id)}
                      currency={currency}
                      isFirst={index === 0}
                      item={item}
                      locale={locale}
                      onQuantityChange={onQuantityChange}
                    />
                  ))}
                </ul>
              ) : (
                <div className={styles.cartDrawerEmpty}>
                  <Icon
                    ariaLabel={t('cart.emptyTitle')}
                    className={styles.cartDrawerEmptyIcon}
                    name="Bike_32"
                    size={64}
                  />
                  <Typography
                    className={styles.cartDrawerEmptyTitle}
                    tag="p"
                    tagStyle="headlineLarge"
                    weight="bold"
                  >
                    {t('cart.emptyTitle')}
                  </Typography>
                  <Typography
                    className={styles.cartDrawerEmptyDescription}
                    tag="p"
                    tagStyle="bodyMedium"
                  >
                    {t('cart.emptyDescription')}
                  </Typography>
                </div>
              )}
            </div>

            <div className={styles.cartDrawerFooter}>
              {cartLoading ? (
                <MainNavigationShoppingCartLoadingFooter />
              ) : hasShoppingCartItems && cartData?.total ? (
                <MainNavigationShoppingCartTotals
                  checkoutButton={checkoutButton}
                  checkoutDisabled={cartHasUnavailableItem}
                  currency={currency}
                  locale={locale}
                  onBeginCheckout={() => trackEcommerceBeginCheckout(cartData)}
                  total={cartData.total}
                />
              ) : (
                <Button
                  fullWidth
                  innerClassName={styles.cartDrawerFooterAction}
                  text={t('cart.continueShopping')}
                  link={shopButton || undefined}
                  type="button"
                  variant="Secondary"
                />
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

MainNavigationShoppingCart.displayName = 'MainNavigationShoppingCart';

export default MainNavigationShoppingCart;
