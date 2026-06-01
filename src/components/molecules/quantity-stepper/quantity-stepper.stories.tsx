import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import Component from './quantity-stepper';
import quantityStepperStubs from './quantity-stepper.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: quantityStepperStubs.oneItemStub,
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'Quantity Stepper',
};

export const OneItem: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('increment-button')).toHaveAttribute(
      'aria-label',
      'Increase quantity',
    );
    await expect(canvas.getByTestId('decrement-button')).toHaveAttribute(
      'aria-label',
      'Remove item from cart',
    );
  },
};

export const TwoItems: Story = {
  args: quantityStepperStubs.twoItemsStub,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('increment-button')).toHaveAttribute(
      'aria-label',
      'Increase quantity',
    );
    await expect(canvas.getByTestId('decrement-button')).toHaveAttribute(
      'aria-label',
      'Decrease quantity',
    );
  },
};

export const OnlyAllowRemoval: Story = {
  args: quantityStepperStubs.oneSkuPerProductTwoQtyStub,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('decrement-button')).toHaveAttribute(
      'aria-label',
      'Remove item from cart',
    );
  },
};
export const MaximumReached: Story = {
  args: quantityStepperStubs.maximumReachedStub,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('increment-button')).toBeDisabled();
  },
};

export default meta;
