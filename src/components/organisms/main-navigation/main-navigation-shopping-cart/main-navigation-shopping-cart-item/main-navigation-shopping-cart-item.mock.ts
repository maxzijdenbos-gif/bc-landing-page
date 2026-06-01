import type { CartItemData } from 'integrations/ecommerce-api/ecommerce-api.types';

export const minimalItem: CartItemData = {
  attributes: {},
  categories: [],
  hasNoStock: false,
  id: 1,
  imageBigUrl: '',
  imageUrl: '',
  isClearanceFinalSale: false,
  name: 'Test Product',
  partNumberCode: 'TEST-001',
  price: {
    amount: 99,
    amountFormatted: '$99.00',
    currency: 'USD',
  },
  quantity: 1,
  total: {
    currency: 'USD',
    subTotal: 99,
    subTotalFormatted: '$99.00',
    total: 99,
    totalFormatted: '$99.00',
  },
  url: '',
};
