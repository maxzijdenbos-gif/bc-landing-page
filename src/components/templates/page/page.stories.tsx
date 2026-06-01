import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './page';
import { pageStub } from './page.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: pageStub,
  component: Component,
  decorators: [withFullscreenModulePreview],
  title: 'Page',
};

export const Page: Story = {};

export default meta;
