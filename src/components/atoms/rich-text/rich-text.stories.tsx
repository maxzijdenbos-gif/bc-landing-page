import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './rich-text';
import richTextStubs from './rich-text.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: richTextStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'Rich Text',
};

export const Default: Story = {};

export default meta;
