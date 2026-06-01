import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BREADCRUMB_CURRENT_PAGE_PATH } from 'mocks/endpoints/breadcrumb/breadcrumb.mock';
import Component from './breadcrumb';
import breadcrumbStubs from './breadcrumb.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: breadcrumbStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'Breadcrumb',
};

export const Default: Story = {};

export const WithCurrentPage: Story = {
  parameters: {
    nextjs: {
      router: {
        asPath: `/${BREADCRUMB_CURRENT_PAGE_PATH}`,
      },
    },
  },
};

export default meta;
