import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './table';
import tableStubs from './table.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: tableStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Table',
};

export const Default: Story = {};
export const TwoColsShortTexts: Story = {
  args: tableStubs.twoColsShortTexts,
};
export const TwoColsLongTexts: Story = {
  args: tableStubs.twoColsLongTexts,
};
export const FourColsLongTexts: Story = {
  args: tableStubs.fourColsLongTexts,
};

export default meta;
