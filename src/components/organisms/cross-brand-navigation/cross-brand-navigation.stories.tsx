import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './cross-brand-navigation';
import crossBrandNavigationStubs from './cross-brand-navigation.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: crossBrandNavigationStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'CrossBrandNavigation',
};

export const Default: Story = {};

export default meta;
