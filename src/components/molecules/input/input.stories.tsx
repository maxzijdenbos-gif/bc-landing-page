import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './input';
import inputStubs from './input.stubs';
import {
  withCenteredModulePreview,
  withSixColumnsOnLaptop,
} from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: inputStubs.default,
  component: Component,
  decorators: [withSixColumnsOnLaptop, withCenteredModulePreview],
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            enabled: false,
            id: 'color-contrast',
          },
        ],
      },
    },
  },
  title: 'Input',
};

export const Default: Story = {};

export const IsFilled: Story = {
  args: {
    defaultValue: 'This field is filled',
  },
};

export const IsDisabled: Story = {
  args: {
    disabled: true,
  },
};

export const HasError: Story = {
  args: {
    error: 'This is an error message',
  },
};

export default meta;
