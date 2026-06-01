import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './cross-brand-navigation-item';
import crossBrandNavigationItemStubs from './cross-brand-navigation-item.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: crossBrandNavigationItemStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'CrossBrandNavigationItem',
};

export const Default: Story = {};
export const Liv: Story = {
  args: crossBrandNavigationItemStubs.liv,
};
export const Momentum: Story = {
  args: crossBrandNavigationItemStubs.momentum,
};

export default meta;
