import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './burger-icon';
import burgerIconStubs from './burger-icon.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: burgerIconStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'BurgerIcon',
};

export const Default: Story = {};

export default meta;
