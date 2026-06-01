import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './content-blocked';
import contentBlockedStubs from './content-blocked.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: contentBlockedStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'ContentBlocked',
};

export const Default: Story = {};

export default meta;
