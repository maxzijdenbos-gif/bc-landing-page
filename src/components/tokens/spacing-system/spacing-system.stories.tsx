import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './spacing-system';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'Spacing System',
};

export const SpacingSystem: Story = {};

export default meta;
