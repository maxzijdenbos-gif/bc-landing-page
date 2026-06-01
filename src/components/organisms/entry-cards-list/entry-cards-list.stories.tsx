import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './entry-cards-list';
import entryCardsListStubs from './entry-cards-list.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: entryCardsListStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            enabled: false,
            id: 'color-contrast',
          },
        ],
      },
    },
  },

  title: 'EntryCardsList',
};

export const Default: Story = {};
export const GenericCards: Story = {
  args: entryCardsListStubs.genericCards,
};
export const GenericCardsStacked: Story = {
  args: entryCardsListStubs.genericCardsStacked,
};

export default meta;
