import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './search-bar-suggestions';
import searchBarSuggestionsStub from './search-bar-suggestions.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: searchBarSuggestionsStub.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'SearchBarSuggestions',
};

export const SingleSection: Story = {};
export const SingleSectionMobile: Story = {
  globals: {
    viewport: { value: 'mobile' },
  },
};

export const TwoSections: Story = {
  args: searchBarSuggestionsStub.twoSections,
};

export const TwoSectionsMobile: Story = {
  args: searchBarSuggestionsStub.twoSections,
  globals: {
    viewport: { value: 'mobile' },
  },
};

export default meta;
