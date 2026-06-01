import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './embedded-video';
import embeddedVideoStubs from './embedded-video.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: embeddedVideoStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],

  title: 'EmbeddedVideo',
};

export const Default: Story = {};

export default meta;
