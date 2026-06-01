import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './two-column-facts';
import twoColumnFactsStubs from './two-column-facts.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: twoColumnFactsStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'Two Column Facts',
};

export const Default: Story = {};

export default meta;
