import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './color-swatch';
import ColorSwatchStubs from './color-swatch.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: ColorSwatchStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'ColorSwatch',
};

export const Default: Story = {};

export default meta;
