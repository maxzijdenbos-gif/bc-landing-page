import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { formatDateString } from 'libraries/formatters/format-date';
import { expect, waitFor, within } from 'storybook/test';
import Component from './author-and-date';
import authorAndDateStubs from './author-and-date.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: authorAndDateStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Author and Date',
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const formatted =
      formatDateString(authorAndDateStubs.default.publishingDate!, 'en') ?? '';
    await waitFor(() => {
      expect(canvas.getByText('Name Nameson')).toBeInTheDocument();
    });
    expect(canvas.queryByText(/2024-02-02/i)).not.toBeInTheDocument();
    await waitFor(() => {
      expect(canvas.getByText(formatted)).toBeInTheDocument();
    });
    expect(canvas.getByText('|')).toBeInTheDocument();
  },
};

export const OnlyName: Story = {
  args: authorAndDateStubs.onlyName,
  name: 'Only name',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvas.getByText('Name Nameson')).toBeInTheDocument();
    });
    expect(canvas.queryByText('|')).not.toBeInTheDocument();
  },
};
export const OnlyDate: Story = {
  args: authorAndDateStubs.onlyDate,
  name: 'Only date',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const formatted =
      formatDateString(authorAndDateStubs.onlyDate.publishingDate!, 'en') ?? '';
    await waitFor(() => {
      expect(canvas.getByText(formatted)).toBeInTheDocument();
    });
    expect(canvas.queryByText('Name Nameson')).not.toBeInTheDocument();
    expect(canvas.queryByText('|')).not.toBeInTheDocument();
  },
};

export default meta;
