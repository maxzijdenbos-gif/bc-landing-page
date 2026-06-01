import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './storytelling';
import storytellingStubs from './storytelling.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: storytellingStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Storytelling',
};

export const Default: Story = {};

export default meta;
