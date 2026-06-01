import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import Component from './hero-with-image';
import heroWithBackgroundImageStubs from './hero-with-image.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const heroImageAlt = heroWithBackgroundImageStubs.default.imageObject.alt;

/** Hero content mounts only after image onLoad; wait for the img, then fire load for real browsers (Vitest + Playwright). */
async function markHeroImagesLoaded(canvas: ReturnType<typeof within>) {
  await canvas.findByRole('img', { name: heroImageAlt });
  await new Promise<void>((resolve) => {
    queueMicrotask(resolve);
  });
  canvas.getAllByRole('img').forEach((img: HTMLElement) => {
    img.dispatchEvent(new Event('load'));
  });
}

const meta: Meta<typeof Component> = {
  args: heroWithBackgroundImageStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'HeroWithImage',
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await markHeroImagesLoaded(canvas);
    await waitFor(
      () => {
        expect(
          canvas.getByRole('heading', {
            name: heroWithBackgroundImageStubs.default.title,
          }),
        ).toBeInTheDocument();
      },
      {
        timeout: 5000,
      },
    );

    expect(
      canvas.getByText(heroWithBackgroundImageStubs.default.heroText),
    ).toBeInTheDocument();

    await expect(
      canvas.getByRole('img', {
        name: heroWithBackgroundImageStubs.default.imageObject?.alt,
      }),
    ).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: 'Shop now' })).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: 'Read more' })).toBeInTheDocument();
    expect(canvas.getByTestId('image-wrapper')).toBeInTheDocument();
    expect(canvas.getByTestId('overlay')).toBeInTheDocument();
  },
};

export const Recut: Story = {
  args: { ...heroWithBackgroundImageStubs.default, doRecut: true },
  name: 'Recut title',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await markHeroImagesLoaded(canvas);
    await waitFor(() => {
      expect(canvas.getByTestId('recut')).toBeInTheDocument();
    });
  },
};

export default meta;
