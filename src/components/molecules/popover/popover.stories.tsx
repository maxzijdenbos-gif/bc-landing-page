import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import Button from 'components/molecules/button/button';
import { expect, userEvent, within } from 'storybook/test';
import Component, { POPOVER_SIDES } from './popover';
import popoverStubs from './popover.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const defaultTrigger = (
  <Button noBackground rightIcon="Info_16" size="small" variant="Tertiary" />
);

const meta: Meta<typeof Component> = {
  args: {
    ...popoverStubs.default,
  },
  argTypes: {
    children: {
      control: 'text',
      name: 'Content',
    },

    side: {
      control: 'select',
      options: POPOVER_SIDES,
    },
    sideOffset: {
      control: { max: 24, min: 0, type: 'number' },
    },
    trigger: {
      table: { disable: true },
    },
  },
  component: Component,
  decorators: [withCenteredModulePreview],
  render: (args) => <Component {...args} trigger={defaultTrigger} />,
  title: 'Popover',
};

export const Default: Story = {};

export const OpenAndClose: Story = {
  name: 'Open and close',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: 'Destination fee information',
    });
    await userEvent.click(trigger);
    const tooltip = await canvas.findByRole('tooltip');
    await expect(tooltip).toBeInTheDocument();
    await expect(tooltip).toHaveTextContent(
      String(popoverStubs.default.children),
    );

    const describedBy = trigger.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    if (describedBy) {
      expect(document.getElementById(describedBy)).toBe(tooltip);
    }

    await userEvent.click(trigger);
    await expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute('aria-describedby');
  },
};

export const Bottom: Story = {
  args: popoverStubs.bottom,
};

export const NoArrow: Story = {
  args: popoverStubs.noArrow,
};

export const Multiple: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          padding: '2rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole('button');
    await userEvent.click(triggers[0]);
    await expect(
      canvas.findByText('Destination fee is non-refundable.'),
    ).resolves.toBeInTheDocument();
    await userEvent.click(triggers[1]);
    await expect(
      canvas.findByText('Free shipping on orders over €50.'),
    ).resolves.toBeInTheDocument();
  },
  render: () => (
    <React.Fragment>
      <Component
        trigger={
          <Button
            noBackground
            rightIcon="Info_16"
            size="small"
            variant="Tertiary"
          />
        }
        triggerAriaLabel="Destination fee"
        side="top"
      >
        Destination fee is non-refundable.
      </Component>
      <Component
        trigger={
          <Button
            noBackground
            rightIcon="Info_16"
            size="small"
            variant="Tertiary"
          />
        }
        triggerAriaLabel="Shipping info"
        side="bottom"
      >
        Free shipping on orders over €50.
      </Component>
      <Component
        trigger={
          <Button
            noBackground
            rightIcon="Info_16"
            size="small"
            variant="Tertiary"
          />
        }
        triggerAriaLabel="Return policy"
        side="top"
      >
        You can return items within 30 days.
      </Component>
    </React.Fragment>
  ),
};

export default meta;
