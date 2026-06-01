interface ConvertToLocalCurrencyProps {
  currency: string;
  locale: Locale;
  price: number;
}
export const convertToLocalCurrency = ({
  currency,
  locale,
  price,
}: ConvertToLocalCurrencyProps) => {
  const localCurrency = new Intl.NumberFormat(locale, {
    currency,
    maximumFractionDigits: 0,
    style: 'currency',
  });

  return localCurrency.format(price);
};
