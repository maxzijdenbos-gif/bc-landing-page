import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './module-accordion';
import accordionStubs from './module-accordion.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: accordionStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'ModuleAccordion',
};

export const Default: Story = {};

export default meta;
