import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './video-teaser';
import videoTeaserStubs from './video-teaser.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: videoTeaserStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],

  title: 'VideoTeaser',
};

export const Default: Story = {};
export const VideoAltTextFallback: Story = {
  args: videoTeaserStubs.videoAltTextFallback,
};
export const VideoObjectSchema: Story = {
  args: videoTeaserStubs.videoObjectSchema,
};

export default meta;
