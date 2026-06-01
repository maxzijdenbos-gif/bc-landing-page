import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import Component from './content-highlight';
import contentHighlightStubs from './content-highlight.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: contentHighlightStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  parameters: {
    test: {
      timeout: 3000, // Increase timeout for content-highlight due to images and animations
    },
  },

  title: 'ContentHighlight',
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Content Headline' }),
    ).toBeInTheDocument();
    expect(canvas.getByText('2025')).toBeInTheDocument();
    expect(
      canvas.getByText(/The official bike of WorldTeam/),
    ).toBeInTheDocument();
    const links = canvas.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('Shop here');
    expect(links[1]).toHaveTextContent('Read more');
    const bg = canvas.getByTestId('background-image');
    await expect(bg).toBeInTheDocument();
    await expect(bg).toHaveAttribute('alt');
  },
};
export const ProductWithHeadlineQuinaryThemed: Story = {
  args: contentHighlightStubs.productTeaserTextQuinaryStub,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Product headline' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByAltText(
        'a mountain bike is shown against a black background',
      ),
    ).toBeInTheDocument();
  },
};
export const ProductWithRangeLogoSecondaryThemed: Story = {
  args: contentHighlightStubs.productTeaserLogoSecondaryStub,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('tcx-logo')).toBeInTheDocument();
  },
};
export const ProductTeaserLogoSecondaryNoBackgroundStub: Story = {
  args: contentHighlightStubs.productTeaserLogoSecondaryNoBackgroundStub,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByTestId('background-image'),
    ).not.toBeInTheDocument();
  },
};
export const ProductTeaserLogoQuinaryNoBackgroundStub: Story = {
  args: contentHighlightStubs.productTeaserLogoQuinaryNoBackgroundStub,
};

export default meta;
