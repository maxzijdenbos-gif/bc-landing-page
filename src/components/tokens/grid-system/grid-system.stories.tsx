import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './grid-system';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  component: Component,
  decorators: [withFullscreenModulePreview],

  title: 'Grid System',
};

export const GridSystem: Story = {};

export default meta;
