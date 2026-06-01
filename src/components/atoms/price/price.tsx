import classNames from 'classnames';
import styles from './price.module.scss';

export interface PriceProps extends React.ComponentProps<'data'> {
  currency: string;
  locale: Locale;
  size?: 'small' | 'medium';
  strikethrough?: boolean;
  value: number;
  variant?: 'important' | 'muted';
}

const Price = ({
  className,
  currency,
  locale,
  variant,
  size = 'small',
  strikethrough = false,
  value,
  ...props
}: PriceProps) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    currency,
    currencyDisplay: 'narrowSymbol',
    style: 'currency',
  }).format(Math.abs(value));

  return (
    <data
      className={classNames(
        styles.component,
        {
          [styles[`${size}`]]: size !== undefined,
          [styles[`${variant}`]]: variant !== undefined,
          [styles.strikethrough]: strikethrough,
        },
        className,
      )}
      value={value}
      {...props}
    >
      {value < 0 && '-'} {formattedValue}
    </data>
  );
};

Price.displayName = 'Price';

export default Price;
