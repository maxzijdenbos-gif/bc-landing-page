import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import TabContent from './tabs-content/tabs-content';
import TabsNavigation from './tabs-navigation/tabs-navigation';
import Tabs from './tabs';
import tabsStubs from './tabs.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Tabs>;

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  decorators: [withCenteredModulePreview],

  render: (_args) => (
    <Tabs total={tabsStubs.default.tabs.length}>
      <TabsNavigation
        tabTitles={tabsStubs.default.tabs.map((tab) => tab.tabTitle)}
      />
      {tabsStubs.default.tabs.map((tab, index) => (
        <TabContent key={index} index={index}>
          <p>{tab.tabContent}</p>
        </TabContent>
      ))}
    </Tabs>
  ),

  title: 'Tabs',
};

export const Default: Story = {};

export const KeyboardAndMouse: Story = {
  name: 'Keyboard and mouse',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabButtons = canvas.getAllByRole('tab');

    expect(tabButtons.length).toBe(tabsStubs.default.tabs.length);
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabButtons.at(-1)).toHaveAttribute('aria-selected', 'false');
    expect(canvas.getByRole('tabpanel')).toHaveTextContent(
      tabsStubs.default.tabs[0].tabContent,
    );

    await userEvent.click(tabButtons.at(-1)!);
    expect(tabButtons.at(-1)).toHaveAttribute('aria-selected', 'true');
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'false');
    expect(canvas.getByRole('tabpanel')).toHaveTextContent(
      tabsStubs.default.tabs.at(-1)!.tabContent,
    );

    await userEvent.click(tabButtons[0]);
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowRight}');
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabButtons[1]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowLeft}');
    expect(tabButtons[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowDown}');
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabButtons[1]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowUp}');
    expect(tabButtons[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{End}');
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabButtons.at(-1)).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{Home}');
    expect(tabButtons.at(-1)).toHaveAttribute('aria-selected', 'false');
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'true');
  },
};

export default meta;
