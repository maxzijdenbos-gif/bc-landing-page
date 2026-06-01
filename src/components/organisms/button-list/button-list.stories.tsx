import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './button-list';
import buttonListStubs from './button-list.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: buttonListStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'ButtonList',
};

export const Default: Story = {};

export default meta;
