import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as Icons from 'assets/icons/icons';
import Component from './icon';
import iconStubs from './icon.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: iconStubs.default,
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(Icons),
    },
  },
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Icon',
};

export const Default: Story = {};

export default meta;
