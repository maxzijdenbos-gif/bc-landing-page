import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import Component from './hero-category';
import heroCategoryStubs from './hero-category.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: heroCategoryStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'HeroCategory',
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const h1 = canvas.getByRole('heading', { level: 1 });
    await expect(h1).toHaveTextContent(heroCategoryStubs.default.title);
    expect(
      canvas.getByText(heroCategoryStubs.default.heroText, { exact: false }),
    ).toBeInTheDocument();
    const cta = heroCategoryStubs.default.button[0];
    const link = canvas.getByRole('link', {
      name: cta?.linkText ?? undefined,
    });
    await expect(link.getAttribute('href')).toContain(
      (cta?.internalLink ?? '').replace(/^\//, ''),
    );
  },
};

export const WithVideo: Story = {
  args: heroCategoryStubs.withVideo,
};

export default meta;
