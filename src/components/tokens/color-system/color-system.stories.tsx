import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './color-system';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  component: Component,
  decorators: [withFullscreenModulePreview],
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            enabled: false,
            id: 'color-contrast',
          },
        ],
      },
    },
  },
  title: 'Color System',
};

export const ColorSystem: Story = {};

export default meta;
