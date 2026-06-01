import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './hero-range';
import heroRangeStubs from './hero-range.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: heroRangeStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'HeroRange',
};

export const Default: Story = {};

export const WithRangeLogo: Story = {
  args: heroRangeStubs.withRangeLogo,
};

export default meta;
