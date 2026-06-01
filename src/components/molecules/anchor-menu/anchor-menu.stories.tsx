import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './anchor-menu';
import heroAnchorMenuStubs from './anchor-menu.stubs';
import {
  withFullscreenModulePreview,
  withSixColumnsOnLaptop,
} from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: heroAnchorMenuStubs.default,
  component: Component,
  decorators: [withSixColumnsOnLaptop, withFullscreenModulePreview],

  title: 'HeroAnchorMenu',
};

export const Default: Story = {};

export const LargeList: Story = {
  args: heroAnchorMenuStubs.largeList,
};

export default meta;
