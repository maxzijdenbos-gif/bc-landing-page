import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import Component from './hero-guides-and-articles';
import heroArticleStubs from './hero-guides-and-articles.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: heroArticleStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'HeroGuidesAndArticles',
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', {
        level: 1,
        name: /Saddle Up with Confidence/i,
      }),
    ).toBeInTheDocument();
    expect(canvas.getByText('Author Name')).toBeInTheDocument();
    await waitFor(() => {
      expect(canvas.getByText('August 04 2024')).toBeInTheDocument();
    });
    expect(canvas.getByText('Mountain')).toBeInTheDocument();
    expect(canvas.getByText('Glory')).toBeInTheDocument();
    expect(canvas.queryByText('E-bike')).not.toBeInTheDocument();
    expect(canvas.getAllByAltText(/Giant logo/i).length).toBeGreaterThan(0);
  },
};

export const OnlyText: Story = {
  args: heroArticleStubs.onlyText,
  name: 'Only text',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByAltText(/Giant logo/i)).not.toBeInTheDocument();
  },
};
export const Recut: Story = {
  args: heroArticleStubs.recut,
  name: 'Use Recut font',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvas.getByTestId('recut')).toBeInTheDocument();
    });
  },
};

export default meta;
