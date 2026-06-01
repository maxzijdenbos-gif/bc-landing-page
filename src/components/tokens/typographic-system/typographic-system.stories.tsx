import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './typographic-system';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  component: Component,
  decorators: [withFullscreenModulePreview],

  title: 'Typographic System',
};

export const TypographicSystem: Story = {};

export default meta;
