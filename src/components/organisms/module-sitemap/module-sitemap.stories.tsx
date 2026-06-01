import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './module-sitemap';
import moduleSitemapStubs from './module-sitemap.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: moduleSitemapStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Module Sitemap',
};

export const Default: Story = {};

export default meta;
