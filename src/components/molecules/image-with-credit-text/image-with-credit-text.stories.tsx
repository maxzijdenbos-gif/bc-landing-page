import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './image-with-credit-text';
import ImageWithCreditTextStubs from './image-with-credit-text.stubs';
import {
  withExtraHeight,
  withFullscreenModulePreview,
} from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: ImageWithCreditTextStubs.default,
  component: Component,
  decorators: [withExtraHeight, withFullscreenModulePreview],

  title: 'ImageWithCreditText',
};

export const Default: Story = {};

export default meta;
