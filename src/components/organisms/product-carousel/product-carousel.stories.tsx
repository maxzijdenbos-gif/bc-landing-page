import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './product-carousel';
import productCarouselStubs from './product-carousel.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: productCarouselStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],

  title: 'Product-Carousel',
};

export const Default: Story = {};

export default meta;
