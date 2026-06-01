import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './message-bar';
import messageBarStubs from './message-bar.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: messageBarStubs.default,
  argTypes: {
    link: {
      control: 'text',
    },
    linkText: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['Primary', 'Secondary', 'Tertiary'],
    },
  },
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'MessageBar',
};

export const Default: Story = {};

export default meta;
