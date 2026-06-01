import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './hero-text';
import heroTextStubs from './hero-text.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: heroTextStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'HeroText',
};

export const Default: Story = {};
export const Recut: Story = {
  args: heroTextStubs.recut,
  name: 'Use Recut font',
};
export const WithButtons: Story = {
  args: heroTextStubs.withButtons,
};

export default meta;
