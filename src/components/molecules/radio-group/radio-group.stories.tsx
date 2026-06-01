import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RadioCard from 'components/atoms/radio-card/radio-card';
import Component from './radio-group';
import radioGroupStubs from './radio-group.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

let value = 'value3';

const setSelected = (newValue: string) => {
  value = newValue;
};

const meta: Meta<typeof Component> = {
  args: radioGroupStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],
  render: (args) => {
    return (
      <Component {...args} selected={value} setSelected={setSelected}>
        <RadioCard groupName="groupNameTest" value="value1">
          <p>Value1</p>
        </RadioCard>
        <RadioCard groupName="groupNameTest" value="value2">
          <p>Value2</p>
        </RadioCard>
        <RadioCard groupName="groupNameTest" value="value3">
          <p>Value3</p>
        </RadioCard>
      </Component>
    );
  },

  title: 'Radio Group',
};

export const Default: Story = {};

export default meta;
