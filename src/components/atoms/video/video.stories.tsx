import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './video';
import videoStubs from './video.stubs';
import {
  withCenteredModulePreview,
  withSixColumnsOnTablet,
} from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: videoStubs.default,
  component: Component,
  decorators: [withSixColumnsOnTablet, withCenteredModulePreview],

  title: 'Video',
};

export const Default: Story = {};

export default meta;
