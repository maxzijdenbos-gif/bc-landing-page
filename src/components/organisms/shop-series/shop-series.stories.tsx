import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './shop-series';
import shopSeriesStubs from './shop-series.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: shopSeriesStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'ShopSeries',
};

export const Default: Story = {};

export default meta;
