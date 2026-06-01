import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './skeleton';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'Skeleton',
};

/**
 * Text variant: placeholder for a single line of text. Height is 1em so it
 * scales with the surrounding font-size (e.g. inside Typography). Give it a
 * width or use in a block container so the line is visible.
 */
export const Text: Story = {
  args: {
    animation: 'pulse',
    variant: 'text',
    width: 200,
  },
  decorators: [
    (Story) => (
      <div style={{ fontSize: 16 }}>
        <Story />
      </div>
    ),
  ],
};

/** Multiple text lines (e.g. cart item details, card description). */
export const TextLines: Story = {
  args: {
    animation: 'pulse',
    variant: 'text',
  },
  decorators: [
    (Story) => (
      <div style={{ fontSize: 16 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}
    >
      <Component {...args} />
      <Component {...args} width="80%" />
      <Component {...args} width="60%" />
    </div>
  ),
};

export const Rectangular: Story = {
  args: {
    animation: 'pulse',
    height: 128,
    variant: 'rectangular',
    width: 128,
  },
};

export const Rounded: Story = {
  args: {
    animation: 'pulse',
    height: 48,
    variant: 'rounded',
    width: 200,
  },
};

export const Circular: Story = {
  args: {
    animation: 'pulse',
    height: 40,
    variant: 'circular',
    width: 40,
  },
};

export const Wave: Story = {
  args: {
    animation: 'wave',
    height: 20,
    variant: 'rectangular',
    width: 200,
  },
};

export default meta;
