import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './module-modal-content/module-modal-content';
import modalWithTabsStubs from './module-modal.stubs';
import { asInModal } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: modalWithTabsStubs.default,
  component: Component,
  decorators: [asInModal],
  title: 'ModuleModal',
};

export const Default: Story = {};
export const OneTab: Story = { args: modalWithTabsStubs.oneTab };

export default meta;
