import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './typography';
import typographyStubs from './typography.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: typographyStubs.default,
  argTypes: {
    htmlFor: {
      if: { arg: 'tag', eq: 'label' },
    },
    weight: {
      control: 'select',
    },
  },
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Typography',
};

export const Default: Story = {};

export default meta;
