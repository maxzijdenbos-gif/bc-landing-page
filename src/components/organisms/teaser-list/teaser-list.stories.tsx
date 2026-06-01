import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './teaser-list';
import teaserListStubs from './teaser-list.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: teaserListStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'TeaserList',
};

export const Default: Story = {};
export const Content: Story = {};
export const Social: Story = {
  args: teaserListStubs.social,
};
export const TreeCards: Story = {
  args: teaserListStubs.threeCards,
};
export const Stacked: Story = {
  args: teaserListStubs.stacked,
};

export default meta;
