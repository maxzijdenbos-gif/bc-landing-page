import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './hero-front-page';
import heroFrontPageStubs from './hero-front-page.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: heroFrontPageStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'HeroFrontPage',
};

export const Default: Story = {};

export default meta;
