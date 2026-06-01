import { useI18n } from 'next-localization';
import React, { useId } from 'react';
import Icon from 'components/atoms/icon/icon';
import Price from 'components/atoms/price/price';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import Popover from 'components/molecules/popover/popover';
import type { CartData } from 'integrations/ecommerce-api/ecommerce-api.types';
import styles from './main-navigation-shopping-cart-totals.module.scss';

export type MainNavigationShoppingCartTotalData = NonNullable<
  CartData['total']
>;

/** API may return plain text or a small HTML fragment (e.g. policy links). */
function feeDescriptionContainsHtmlMarkup(description: string): boolean {
  return /<[a-z][\s\S]*>/i.test(description);
}

export interface MainNavigationShoppingCartTotalsProps {
  checkoutButton?: BaseLink | null;
  /** When true, checkout is not allowed until unavailable lines are removed. */
  checkoutDisabled?: boolean;
  currency: string;
  locale: Locale;
  onBeginCheckout?: () => void;
  total: MainNavigationShoppingCartTotalData;
}

const MainNavigationShoppingCartTotals = ({
  checkoutButton,
  checkoutDisabled = false,
  currency,
  locale,
  onBeginCheckout,
  total,
}: MainNavigationShoppingCartTotalsProps) => {
  const { t } = useI18n();
  const checkoutUnavailableHintId = useId();

  const discountTotal = total.discountTotal;
  const hasDiscount = typeof discountTotal === 'number' && discountTotal !== 0;

  const orderHandlingFees =
    total.orderHandlingFees?.filter(
      (
        fee,
      ): fee is NonNullable<
        MainNavigationShoppingCartTotalData['orderHandlingFees']
      >[number] & { amount: number } =>
        typeof fee.amount === 'number' && fee.amount > 0,
    ) ?? [];
  const hasOrderHandling = orderHandlingFees.length > 0;

  const showBreakdownSection = hasDiscount || hasOrderHandling;

  return (
    <div className={styles.component}>
      {showBreakdownSection && (
        <React.Fragment>
          <div className={styles.totals}>
            {hasDiscount && (
              <div className={styles.row}>
                <Typography
                  tag="span"
                  tagStyle="bodyMedium"
                  className={styles.label}
                >
                  {t('cart.subtotal')}
                </Typography>
                {total.subTotal !== undefined && total.subTotal !== null && (
                  <Price
                    className={styles.value}
                    currency={currency}
                    locale={locale}
                    size="small"
                    value={total.subTotal}
                  />
                )}
              </div>
            )}
            {hasOrderHandling &&
              orderHandlingFees.map((fee, feeIndex) => {
                const feeDescription =
                  fee.description?.trim() ??
                  t('cart.destinationFeeInfo').trim();
                const showFeeDescription = feeDescription.length > 0;

                return (
                  <div
                    key={`order-handling-fee-${feeIndex}`}
                    className={styles.row}
                  >
                    <div className={styles.labelGroup}>
                      <Typography
                        tag="span"
                        tagStyle="bodyMedium"
                        className={styles.label}
                      >
                        {fee.title ?? t('cart.destinationFee')}
                      </Typography>
                      {showFeeDescription && (
                        <Popover
                          trigger={
                            <button
                              className={styles.destinationFeeInfoTrigger}
                              type="button"
                            >
                              <Icon name="Info_16" hidden />
                            </button>
                          }
                          triggerAriaLabel={t('cart.destinationFeeInfoTrigger')}
                          side="top"
                          sideOffset={10}
                        >
                          {feeDescriptionContainsHtmlMarkup(feeDescription) ? (
                            <span
                              className={styles.feeDescriptionHtml}
                              dangerouslySetInnerHTML={{
                                __html: feeDescription,
                              }}
                            />
                          ) : (
                            feeDescription
                          )}
                        </Popover>
                      )}
                    </div>
                    <Price
                      className={styles.value}
                      currency={currency}
                      locale={locale}
                      size="small"
                      value={fee.amount}
                    />
                  </div>
                );
              })}
            {hasDiscount && (
              <div className={styles.row}>
                <Typography
                  tag="span"
                  tagStyle="bodyMedium"
                  className={styles.label}
                >
                  {t('cart.totalDiscount')}
                </Typography>
                <Price
                  className={styles.discountValue}
                  currency={currency}
                  locale={locale}
                  size="small"
                  value={discountTotal}
                  variant="important"
                />
              </div>
            )}
          </div>
          <hr className={styles.divider} />
        </React.Fragment>
      )}
      <div className={styles.row}>
        <Typography
          tag="span"
          tagStyle="bodyLarge"
          weight="bold"
          className={styles.totalLabel}
        >
          {t('cart.totalLabel')}
        </Typography>
        {total.total !== undefined && total.total !== null && (
          <Price
            className={styles.value}
            currency={currency}
            locale={locale}
            size="medium"
            value={total.total}
          />
        )}
      </div>
      <div className={styles.checkoutAction}>
        <Button
          fullWidth
          aria-describedby={
            checkoutDisabled ? checkoutUnavailableHintId : undefined
          }
          disabled={checkoutDisabled}
          innerClassName={styles.action}
          link={checkoutDisabled ? undefined : (checkoutButton ?? undefined)}
          onClick={checkoutDisabled ? undefined : onBeginCheckout}
          text={t('cart.checkout')}
          type="button"
          variant="Primary"
        />
        {checkoutDisabled && (
          <Typography
            id={checkoutUnavailableHintId}
            tag="p"
            tagStyle="bodySmall"
            className={styles.checkoutUnavailableHint}
          >
            {t('cart.checkoutUnavailableHint')}
          </Typography>
        )}
      </div>
    </div>
  );
};

MainNavigationShoppingCartTotals.displayName =
  'MainNavigationShoppingCartTotals';

export default MainNavigationShoppingCartTotals;
