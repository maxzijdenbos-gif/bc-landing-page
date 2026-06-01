import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RadioGroup from 'components/molecules/radio-group/radio-group';
import Component from './radio-card';
import radioCardStubs from './radio-card.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: radioCardStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],
  render: (args) => (
    <RadioGroup selected="value1" setSelected={() => console.log()}>
      <Component {...args} value="value1">
        <p>Radio Card Content</p>
      </Component>
    </RadioGroup>
  ),

  title: 'Radio Card',
};

export const Default: Story = {};

export default meta;
