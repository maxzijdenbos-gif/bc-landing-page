import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as Icons from 'assets/icons/icons';
import Component from './button';
import buttonStubs from './button.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: buttonStubs.default,
  argTypes: {
    leftIcon: {
      control: 'select',
      options: ['', ...Object.keys(Icons)],
    },
    rightIcon: {
      control: 'select',
      options: ['', ...Object.keys(Icons)],
    },
    size: {
      control: 'select',
    },
    text: {
      control: 'text',
    },
    type: {
      table: { disable: true },
    },
    variant: {
      control: 'select',
      options: ['Primary', 'Secondary', 'Tertiary', 'Text'],
    },
  },
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'Button',
};

export const Default: Story = {};

export const WithoutIcons: Story = {
  args: buttonStubs.withoutIcons,
  name: 'Without icons',
};

export const IsDisabled: Story = {
  args: {
    disabled: true,
  },
  name: 'Is disabled',
};

export default meta;
