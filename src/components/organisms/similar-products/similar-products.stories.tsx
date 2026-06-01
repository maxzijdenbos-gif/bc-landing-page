import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './similar-products';
import similarProductsStubs from './similar-products.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: similarProductsStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Similar Products',
};

export const Default: Story = {};

export default meta;
