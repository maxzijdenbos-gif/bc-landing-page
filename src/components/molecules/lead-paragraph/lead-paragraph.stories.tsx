import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './lead-paragraph';
import leadParagraphStubs from './lead-paragraph.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: leadParagraphStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],
  title: 'LeadParagraph',
};

export const Default: Story = {};

export default meta;
