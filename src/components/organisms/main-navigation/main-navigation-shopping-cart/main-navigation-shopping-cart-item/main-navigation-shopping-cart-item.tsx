import classNames from 'classnames';
import { useI18n } from 'next-localization';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Price from 'components/atoms/price/price';
import Typography from 'components/atoms/typography/typography';
import QuantityStepper from 'components/molecules/quantity-stepper/quantity-stepper';
import Link from 'components/utilities/link/link';
import type { CartItemData } from 'integrations/ecommerce-api/ecommerce-api.types';
import { getCartProductExternalUrl } from 'libraries/getters/get-cart-product-url';
import type { OnQuantityChangeOptions } from 'libraries/hooks/use-cart';
import { imageUrlWithDimensions } from 'libraries/utilities/image-url-params';
import styles from './main-navigation-shopping-cart-item.module.scss';

/** Format cart item attributes as a single line separated by pipe. */
function formatAttributes(
  attributes: Record<string, string> | undefined,
): string {
  if (!attributes || typeof attributes !== 'object') return '';
  return Object.values(attributes).filter(Boolean).join(' | ');
}

/** Resolve link prop for product URL (external main site or internal). */
function productLink(url: string): BaseLink {
  const external = getCartProductExternalUrl(url);
  if (external) return { externalLink: external };
  return { internalLink: url };
}

export interface MainNavigationShoppingCartItemProps {
  currency: string;
  isFirst?: boolean;
  item: CartItemData;
  locale: Locale;
  onQuantityChange?: (
    cartItemId: number,
    newQuantity: number,
    options?: OnQuantityChangeOptions,
  ) => void;
}

const MainNavigationShoppingCartItem = ({
  currency,
  isFirst,
  item,
  locale,
  onQuantityChange,
}: MainNavigationShoppingCartItemProps) => {
  const { t } = useI18n();
  const quantityFromCart = item.quantity ?? 1;
  const cartItemId = item.id;

  const [localQuantity, setLocalQuantity] = useState(quantityFromCart);
  const pendingQuantityRef = useRef<number | null>(null);

  // Sync from server when we have no pending update, or when server confirms our last update.
  useEffect(() => {
    if (quantityFromCart === pendingQuantityRef.current) {
      pendingQuantityRef.current = null;
    }
    if (
      pendingQuantityRef.current === null ||
      quantityFromCart === pendingQuantityRef.current
    ) {
      queueMicrotask(() => setLocalQuantity(quantityFromCart));
    }
  }, [quantityFromCart]);

  const setQuantity = useCallback(
    (newQuantity: number) => {
      if (cartItemId === null || cartItemId === undefined) return;
      const previousQuantity = localQuantity;
      setLocalQuantity(newQuantity);
      const rollbackOnError = () => {
        pendingQuantityRef.current = null;
        setLocalQuantity(previousQuantity);
      };
      if (newQuantity < 1) {
        pendingQuantityRef.current = null;
        onQuantityChange?.(cartItemId, newQuantity, {
          onError: rollbackOnError,
        });
        return;
      }
      pendingQuantityRef.current = newQuantity;
      onQuantityChange?.(cartItemId, newQuantity, { onError: rollbackOnError });
    },
    [cartItemId, localQuantity, onQuantityChange],
  );

  const quantity = localQuantity;
  const relation = item.relation;
  const isOneSkuPerProductRelation =
    relation !== null &&
    relation !== undefined &&
    typeof relation === 'object' &&
    'quantityLimitationType' in relation &&
    (relation as { quantityLimitationType?: string }).quantityLimitationType ===
      'oneSkuPerProduct';
  const isBundle = Boolean(item.relation);
  const isOutOfStock = item.hasNoStock;
  const lineTotal = item.total;
  const totalValue = lineTotal.total;
  const subTotalValue = lineTotal.subTotal;
  const hasLineDiscount =
    subTotalValue !== undefined &&
    subTotalValue !== null &&
    totalValue !== undefined &&
    totalValue !== null &&
    subTotalValue > totalValue;
  const displayCurrency = lineTotal.currency ?? currency;
  const attributesText = formatAttributes(item.attributes);

  const rawSrc = item.imageUrl || item.imageBigUrl || '';
  const src1x =
    rawSrc && imageUrlWithDimensions(rawSrc, { height: 120, width: 120 });
  const src2x =
    rawSrc && imageUrlWithDimensions(rawSrc, { height: 240, width: 240 });
  const srcSet = src1x && src2x ? `${src1x} 1x, ${src2x} 2x` : undefined;
  const img = src1x ? (
    // Custom srcset and optimized external URLs; next/image not used by design
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={item.name}
      className={styles.image}
      height={120}
      src={src1x}
      srcSet={srcSet}
      width={120}
    />
  ) : (
    <div aria-hidden className={styles.noImage} />
  );
  const imageContent = item.url ? (
    <Link link={productLink(item.url)} className={styles.imageLink}>
      {img}
    </Link>
  ) : (
    img
  );

  return (
    <li
      className={classNames(
        styles.component,
        isFirst && styles.firstItem,
        isBundle && styles.bundleItem,
        isOutOfStock && styles.outOfStock,
      )}
    >
      {imageContent}
      <div className={styles.details}>
        {isBundle && (
          <Typography
            className={styles.bundleBadge}
            tag="span"
            tagStyle="actionSmall"
            weight="heavy"
          >
            {t('cart.bundleBadge')}
          </Typography>
        )}
        <Typography
          tag="p"
          tagStyle="headlineMedium"
          weight="bold"
          className={styles.name}
        >
          {item.url ? (
            <Link
              className={styles.nameLink}
              link={productLink(item.url)}
              tabIndex={-1}
            >
              {item.name}
            </Link>
          ) : (
            item.name
          )}
        </Typography>
        {attributesText && (
          <Typography
            tag="p"
            tagStyle="bodyMedium"
            className={styles.attributes}
          >
            {attributesText}
          </Typography>
        )}
        {(item.isClearanceFinalSale || isOutOfStock) && (
          <Typography
            tag="p"
            tagStyle="bodySmall"
            className={classNames(
              styles.lineItemNotice,
              isOutOfStock && styles.lineItemNoticeOutOfStock,
            )}
          >
            {isOutOfStock
              ? t('cart.outOfStock')
              : t('cart.clearanceFinalSaleMessage')}
          </Typography>
        )}
        <div className={styles.bottom}>
          <QuantityStepper
            decrementClassName={
              isOutOfStock ? styles.outOfStockDecrement : undefined
            }
            onlyAllowRemoval={isOneSkuPerProductRelation}
            maximum={item.maxQuantity}
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <div className={styles.price}>
            {hasLineDiscount &&
              subTotalValue !== undefined &&
              subTotalValue !== null &&
              subTotalValue > 0 && (
                <Price
                  className={styles.priceOriginal}
                  currency={displayCurrency}
                  locale={locale}
                  size="small"
                  strikethrough
                  value={subTotalValue}
                />
              )}
            {totalValue !== undefined && totalValue !== null && (
              <Price
                className={hasLineDiscount ? styles.priceDiscounted : undefined}
                currency={displayCurrency}
                locale={locale}
                size="medium"
                value={totalValue}
                variant={hasLineDiscount ? 'important' : undefined}
              />
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

MainNavigationShoppingCartItem.displayName = 'MainNavigationShoppingCartItem';

export default MainNavigationShoppingCartItem;
