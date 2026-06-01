import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import Component from './endorsements';
import endorsementsStubs from './endorsements.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: endorsementsStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Endorsements',
};

export const Default: Story = {};

export const QuoteWithoutLink: Story = {
  args: {
    endorsements: [
      {
        endorsement: {
          byline: 'Byline',
          quote: 'Quote',
          tagline: 'Tagline',
        },
      },
    ],
  },
  name: 'Quote without link',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('“Quote”')).toBeInTheDocument();
    expect(canvas.getByText('Byline')).toBeInTheDocument();
    expect(canvas.getByText('Tagline')).toBeInTheDocument();
    expect(canvas.queryByRole('link')).not.toBeInTheDocument();
  },
};

export const UsesFirstLinkOnly: Story = {
  args: {
    endorsements: [
      {
        endorsement: {
          byline: 'Byline',
          link: [
            {
              externalLink: 'https://foo.bar',
              linkText: 'Good link',
              target: '_self',
            },
            {
              externalLink: 'https://other.test',
              linkText: 'Second link',
              target: '_self',
            },
          ],
          quote: 'Quote',
          tagline: 'Tagline',
        },
      },
    ],
  },
  name: 'Uses first link only',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('link', { name: 'Good link' })).toBeInTheDocument();
    expect(
      canvas.queryByRole('link', { name: 'Second link' }),
    ).not.toBeInTheDocument();
  },
};

export const WithImages: Story = {
  args: endorsementsStubs.withImages,
};

export default meta;
