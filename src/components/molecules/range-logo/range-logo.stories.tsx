import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './range-logo';
import rangeLogoStubs from './range-logo.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: rangeLogoStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],
  render: (args) => (
    <div
      style={{
        height: '200vh',
        paddingTop: '50vh',
        width: '100%',
      }}
    >
      <Component {...args} />
    </div>
  ),

  title: 'RangeLogo',
};

export const Default: Story = {};

export default meta;
