import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './portrait-image-gallery';
import productCarouselStubs from './portrait-image-gallery.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: productCarouselStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],

  title: 'Portrait Image Gallery',
};

export const Default: Story = {};

export default meta;
