import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './slide-left-right-example';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'Entrances',
};

export const SlideLeftRightExample: Story = {};

export default meta;
