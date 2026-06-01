import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './module-accordion-with-images';
import moduleAccordionWithImagesStubs from './module-accordion-with-images.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: moduleAccordionWithImagesStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'ModuleAccordionWithImages',
};

export const Default: Story = {};

export default meta;
