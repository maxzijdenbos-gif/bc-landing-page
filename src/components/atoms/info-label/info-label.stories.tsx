import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component, { backgroundColors, sizes, variants } from './info-label';
import infoLabelStubs from './info-label.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: infoLabelStubs.default,
  argTypes: {
    backgroundColor: {
      control: 'select',
      options: Object.keys(backgroundColors),
    },
    size: {
      control: 'select',
      options: Object.keys(sizes),
    },
    variant: {
      control: 'select',
      options: Object.keys(variants),
    },
  },
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'Info Label',
};

export const Default: Story = {};

export const BlurredLarge: Story = {
  args: infoLabelStubs.blurredLarge,
};
export default meta;
