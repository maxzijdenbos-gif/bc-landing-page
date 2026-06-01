import type { MainNavigationShoppingCartTotalData } from './main-navigation-shopping-cart-totals';

export const minimalTotal: MainNavigationShoppingCartTotalData = {
  currency: 'USD',
  subTotal: 100,
  subTotalFormatted: '$100.00',
  total: 100,
  totalFormatted: '$100.00',
};

export const totalWithDestinationFee: MainNavigationShoppingCartTotalData = {
  ...minimalTotal,
  orderHandlingFees: [
    {
      amount: 25,
      amountFormatted: '$25.00',
      description:
        'Destination Fee reflects costs incurred in transportation, logistics, and other associated fees. The destination fee is non-refundable or negotiable.',
      title: 'Destination fee',
    },
  ],
  total: 125,
  totalFormatted: '$125.00',
};
