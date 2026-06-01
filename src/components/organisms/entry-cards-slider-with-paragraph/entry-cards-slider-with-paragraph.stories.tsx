import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './entry-cards-slider-with-paragraph';
import entryCardSliderStubs from './entry-cards-slider-with-paragraph.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: entryCardSliderStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Entry Card Slider',
};

export const Default: Story = {};

export default meta;
