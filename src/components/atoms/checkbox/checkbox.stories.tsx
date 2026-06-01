import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import Component from './checkbox';
import checkboxStubs from './checkbox.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: checkboxStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],
  render: (args) => (
    <Component {...args} style={{ maxWidth: '200px' }}>
      <p>Checkbox label</p>
    </Component>
  ),

  title: 'Checkbox',
};

export const Default: Story = {};

export const ToggleWithClick: Story = {
  name: 'Toggle with click',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).not.toBeChecked();
    await expect(checkbox).not.toBeDisabled();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

export const Disabled: Story = {
  args: { ...checkboxStubs.default, disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('checkbox')).toBeDisabled();
  },
};

export default meta;
