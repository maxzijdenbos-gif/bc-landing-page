import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Component from './product-list-hero';
import productListHeroStubs from './product-list-hero.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  args: productListHeroStubs.default,
  component: Component,
  decorators: [withCenteredModulePreview],

  title: 'ProductListHero',
};

export const Default: Story = {};

export const WithButtonGroup: Story = {
  args: {
    ...productListHeroStubs.default,
    buttonGroup: [{ link: { linkText: 'Test Button', target: '_self' } }],
  },
  name: 'With button group',
};

export default meta;
