import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import Component from './image';
import imageStubs from './image.stubs';
import {
  withCenteredModulePreview,
  withSixColumnsOnTablet,
} from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: imageStubs.default,
  argTypes: {
    height: {
      if: { arg: 'fill', truthy: false },
    },
    width: {
      if: { arg: 'fill', truthy: false },
    },
  },
  component: Component,
  decorators: [withSixColumnsOnTablet, withCenteredModulePreview],

  title: 'Image',
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      const img = canvasElement.querySelector('img');
      expect(img).toBeTruthy();
      expect(img?.getAttribute('src')).toContain('merklenesandbox');
    });
  },
};

const withTitle = 'Image Test Title';

export const WithTitle: Story = {
  args: {
    ...imageStubs.default,
    title: withTitle,
  },
  name: 'With title attribute',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTitle(withTitle)).toBeInTheDocument();
  },
};

export default meta;
