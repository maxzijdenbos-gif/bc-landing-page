import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './player-button';
import playerButtonStubs from './player-button.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: playerButtonStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Player Button',
};

export const Default: Story = {};

export default meta;
