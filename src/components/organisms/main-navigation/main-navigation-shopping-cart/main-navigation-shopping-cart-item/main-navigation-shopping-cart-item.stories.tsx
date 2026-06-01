import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './main-navigation-shopping-cart-item';
import { minimalItem } from './main-navigation-shopping-cart-item.mock';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: {
    currency: 'USD',
    item: minimalItem,
    locale: 'en-US',
  },
  component: Component,
  decorators: [
    (Story) => (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <Story />
      </ul>
    ),
    withCenteredModulePreview,
  ],

  title: 'Main Navigation/ShoppingCartItem',
};

export const Default: Story = {};

export const WithAttributes: Story = {
  args: {
    item: {
      ...minimalItem,
      attributes: { Color: 'Blue', Size: 'M' },
    },
  },
};

export const WithBundleBadge: Story = {
  args: {
    item: {
      ...minimalItem,
      relation: { parentId: 1, type: 1 },
    },
  },
};

export default meta;
