import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './cookie-policy';
import cookiePolicyStubs from './cookie-policy.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: cookiePolicyStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'CookiePolicy',
};

export const Default: Story = {};

export default meta;
