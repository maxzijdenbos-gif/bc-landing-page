import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CSSProperties } from 'react';
import { expect, within } from 'storybook/test';
import ControlButtonArrow from './arrow/arrow';
import ControlButtonExpand from './expand/expand';
import ControlButtonPagination from './pagination/pagination';
import controlButtonsStubs from './control-buttons.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj;

const styles: Record<string, CSSProperties> = {
  item: {
    flex: '0 0 25%',
    transform: 'translate3d(0, 0, 0)',
  },
  wrapper: {
    display: 'flex',
    gap: '50px',
  },
};

const meta: Meta = {
  args: controlButtonsStubs.default,
  decorators: [withCenteredModulePreview],
  render: ({ next, pagination, previous }) => (
    <div style={styles.wrapper}>
      <div id="control-expand" style={styles.item}>
        <ControlButtonExpand />
      </div>
      <div id="control-previous" style={styles.item}>
        <ControlButtonArrow {...previous} />
      </div>
      <div id="control-next" style={styles.item}>
        <ControlButtonArrow {...next} />
      </div>
      <div id="control-pagination" style={styles.item}>
        <ControlButtonPagination {...pagination} />
      </div>
    </div>
  ),

  title: 'ControlButtons',
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list');
    const paginationButtons = within(list).getAllByRole('button');
    const { total } = controlButtonsStubs.default.pagination;
    expect(paginationButtons).toHaveLength(total);
    const currentCount = paginationButtons.filter(
      (btn) => btn.getAttribute('aria-current') === 'true',
    ).length;
    expect(currentCount).toBe(1);
  },
};

export default meta;
