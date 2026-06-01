import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import Component from './main-navigation-shopping-cart-totals';
import {
  minimalTotal,
  totalWithDestinationFee,
} from './main-navigation-shopping-cart-totals.mock';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: {
    checkoutButton: { internalLink: '/us/shop/review' },
    currency: 'USD',
    locale: 'en-US',
    total: minimalTotal,
  },
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Main Navigation/ShoppingCartTotals',
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Total')).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: 'Checkout' }),
    ).toBeInTheDocument();
  },
};

export const WithDiscount: Story = {
  args: {
    total: {
      ...minimalTotal,
      discountTotal: -10,
      discountTotalFormatted: '-$10.00',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Total savings')).toBeInTheDocument();
  },
};

export const WithDestinationFee: Story = {
  args: {
    total: totalWithDestinationFee,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Destination fee')).toBeInTheDocument();
  },
};

export default meta;
