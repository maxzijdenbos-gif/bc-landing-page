import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './stats';
import statisticsStubs from './stats.stubs';
import { withFullscreenModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: statisticsStubs.default,
  component: Component,
  decorators: [withFullscreenModulePreview],
  parameters: {
    a11y: {
      config: {
        rules: [
          { enabled: false, id: 'definition-list' },
          { enabled: false, id: 'dlitem' },
        ],
      },
    },
  },
  title: 'Stats',
};

export const Default: Story = {};

export default meta;
