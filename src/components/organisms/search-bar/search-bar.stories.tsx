import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './search-bar';
import searchBarStubs from './search-bar.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: searchBarStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],

  title: 'SearchBar',
};

export const Default: Story = {};
export const Mobile: Story = {
  globals: {
    viewport: { value: 'mobile' },
  },
};

export const WithSuggestions: Story = {
  args: searchBarStubs.twoSections,
};
export const WithSuggestionsMobile: Story = {
  args: searchBarStubs.twoSections,
  globals: {
    viewport: { value: 'mobile' },
  },
};

export default meta;
