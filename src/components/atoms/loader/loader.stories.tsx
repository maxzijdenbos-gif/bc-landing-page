import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './loader';
import {
  withCenteredModulePreview,
  withExtraHeight,
  withFullscreenModulePreview,
} from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  argTypes: {
    isVisible: {
      control: 'boolean',
      description: 'Whether the loader is visible',
    },
    message: {
      control: 'text',
      description: 'Custom loading message',
    },
    theme: {
      control: 'select',
      options: ['giant', 'liv'],
    },
    variant: {
      control: 'select',
      options: ['soft', 'hard'],
    },
  },
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Loader',
};

export const Soft: Story = {
  args: {
    isVisible: true,
    variant: 'soft',
  },
};

export const Hard: Story = {
  args: {
    isVisible: true,
    message: 'Please wait, content is loading...',
    variant: 'hard',
  },
  decorators: [withFullscreenModulePreview, withExtraHeight],
};

export const WithCustomMessage: Story = {
  args: {
    isVisible: true,
    message: 'Submitting your form...',
    variant: 'soft',
  },
};

export default meta;
