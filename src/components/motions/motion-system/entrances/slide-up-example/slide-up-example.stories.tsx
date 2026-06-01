import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './slide-up-example';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'Entrances',
};

export const SlideUpExample: Story = {};

export default meta;
