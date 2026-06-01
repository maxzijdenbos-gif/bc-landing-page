import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './price';
import priceStubs from './price.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: priceStubs.default,
  argTypes: {
    currency: {
      control: { type: 'select' },
      options: ['USD', 'EUR', 'GBP', 'JPY'],
    },
    locale: {
      control: { type: 'select' },
      options: ['en-US', 'nl-NL', 'de-DE', 'ja-JP'],
    },
  },
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Price',
};

export const Default: Story = {};

export const Negative: Story = {
  args: priceStubs.negative,
};

export const Muted: Story = {
  args: priceStubs.mutedStrikethrough,
};

export const Important: Story = {
  args: priceStubs.important,
};

export default meta;
