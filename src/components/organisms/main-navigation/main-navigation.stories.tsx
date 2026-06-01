import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import Component from './main-navigation';
import mainNavigationStubs, { filledCartStub } from './main-navigation.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

/** Matches `MainNavigationShoppingCart` item count (sum of line quantities). */
const filledCartStubTotalQuantity = filledCartStub.items.reduce(
  (sum, item) => sum + (item.quantity ?? 1),
  0,
);

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: mainNavigationStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'Main Navigation',
};

/** Empty cart at mobile viewport; use Mobile menu and cart for interaction test. */
export const Default: Story = {};

/** Main nav with the optional promo strip above the bar (message + CTA link). */
export const WithMessageBar: Story = {
  args: {
    ...mainNavigationStubs.default,
    messageBar: {
      link: 'https://www.giant-bicycles.com/us/elements-bike-wash-2025',
      linkText: 'Buy now',
      message:
        'April promo: buy Elements Bike Wash and get 40% off finish protection',
      variant: 'Primary',
    },
  },
};

export const MobileMenuAndCart: Story = {
  globals: {
    viewport: { value: 'mobile' },
  },
  name: 'Mobile menu and cart',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const burger = canvas.getByLabelText('Open menu');
    await userEvent.click(burger);
    await waitFor(
      () => {
        expect(canvas.getByTestId('menubar')).toBeInTheDocument();
      },
      { timeout: 15000 },
    );
    const menubar = canvas.getByTestId('menubar');
    await expect(menubar).not.toHaveAttribute('inert');

    const closeButton = within(menubar).getByRole('button', {
      name: 'Close menu',
    });
    await userEvent.click(closeButton);
    await waitFor(() => {
      expect(canvas.getByTestId('menubar')).toHaveAttribute('inert');
    });

    const cartTrigger = canvas.getByRole('button', { name: 'Open cart' });
    await expect(cartTrigger).toHaveAttribute('aria-controls', 'cart-drawer');
    await userEvent.click(cartTrigger);
    await expect(
      canvas.getByRole('heading', { name: 'Shopping cart' }),
    ).toBeInTheDocument();
    expect(canvas.getByText('Your cart is empty')).toBeInTheDocument();
  },
};

/** Cart drawer with items and totals. */
export const WithFilledCart: Story = {
  args: {
    ...mainNavigationStubs.default,
    cart: filledCartStub,
    checkoutButton: { internalLink: '/us/shop/review' },
    onQuantityChange: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: new RegExp(
        `Open cart, ${filledCartStubTotalQuantity} items in cart`,
      ),
    });
    await expect(trigger).toHaveAttribute('aria-controls', 'cart-drawer');
    await userEvent.click(trigger);
    await expect(
      canvas.getByRole('heading', { name: 'Shopping cart' }),
    ).toBeInTheDocument();
    expect(canvas.getByText('Example Road Bike')).toBeInTheDocument();
    expect(canvas.getByText('Bundle')).toBeInTheDocument();
    expect(canvas.getByText('Subtotal')).toBeInTheDocument();
    expect(canvas.getByText('Destination fee')).toBeInTheDocument();
    expect(canvas.getByText('Total')).toBeInTheDocument();
    expect(
      canvas.getByRole('button', { name: 'Checkout' }),
    ).toBeInTheDocument();
  },
};

/** Cart drawer in loading state. Open the cart icon to see the skeleton. */
export const WithCartLoading: Story = {
  args: {
    ...mainNavigationStubs.default,
    cart: undefined,
    cartLoading: true,
    checkoutButton: { internalLink: '/us/shop/review' },
    onQuantityChange: () => {},
  },
};

export default meta;
