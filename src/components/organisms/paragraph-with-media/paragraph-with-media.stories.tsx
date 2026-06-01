import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import Component from './paragraph-with-media';
import ParagraphWithMediaStubs from './paragraph-with-media.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: ParagraphWithMediaStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'Paragraph With Images or Video',
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [first, second] = ParagraphWithMediaStubs.default.buttonGroup ?? [];
    expect(
      canvas.getByRole('link', {
        name: first?.link.linkText ?? undefined,
      }),
    ).toBeInTheDocument();
    expect(
      canvas.getByRole('link', {
        name: second?.link.linkText ?? undefined,
      }),
    ).toBeInTheDocument();
  },
};

export const OnlyBackgroundImage: Story = {
  args: ParagraphWithMediaStubs.onlyBackgroundImage,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getAllByRole('img')).toHaveLength(1);
    expect(
      canvas.getByRole('img', {
        name: ParagraphWithMediaStubs.onlyBackgroundImage.backgroundImageObject
          ?.alt,
      }),
    ).toBeInTheDocument();
    expect(canvas.queryByTestId('background-overlay')).not.toBeInTheDocument();
  },
};
export const MediaPositionedLeft: Story = {
  args: ParagraphWithMediaStubs.mediaPositionedLeft,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('revert-row-order')).toBeInTheDocument();
  },
};
export const WithVideo: Story = {
  args: ParagraphWithMediaStubs.withVideo,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('video-player')).toBeInTheDocument();
    expect(
      canvas.getByRole('button', { name: /play video|pause video/i }),
    ).toBeInTheDocument();
  },
};
export const GrayBackground: Story = {
  args: ParagraphWithMediaStubs.grayBackground,
};

export default meta;
