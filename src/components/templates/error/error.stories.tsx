import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './error';
import { errorStubs } from './error.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: errorStubs,
  component: Component,
  decorators: [withFullscreenModulePreview],

  title: 'Error',
};

export const Error: Story = {};

export default meta;
