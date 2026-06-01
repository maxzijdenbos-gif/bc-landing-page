import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './text';
import textStubs from './text.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: textStubs.default,
  argTypes: {
    color: { table: { disable: true } },
  },
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'Text',
};

export const Default: Story = {};

export default meta;
