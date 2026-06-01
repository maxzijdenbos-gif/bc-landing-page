import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import Button from 'components/molecules/button/button';
import Drawer from './drawer';
import drawerStubs from './drawer.stubs';
import { withCenteredModulePreview } from '.storybook/decorators';

type Story = StoryObj<typeof Drawer>;

const DrawerWithTrigger = ({
  mobilePosition,
  position,
  title,
  children,
}: {
  children: React.ReactNode;
  mobilePosition?: 'bottom';
  position: 'left' | 'right';
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <Button
        text={title}
        onClick={() => setIsOpen(true)}
        type="button"
        variant="Primary"
      />
      <Drawer
        isOpen={isOpen}
        mobilePosition={mobilePosition}
        onInternalClose={() => setIsOpen(false)}
        position={position}
      >
        {children}
      </Drawer>
    </React.Fragment>
  );
};

const meta: Meta<typeof Drawer> = {
  args: drawerStubs.default,
  argTypes: {
    mobilePosition: {
      control: 'select',
      options: [undefined, 'bottom'],
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
  component: Drawer,
  decorators: [withCenteredModulePreview],
  title: 'Drawer',
};

export const RightSidebarMobileBottom: Story = {
  args: { ...drawerStubs.default, mobilePosition: 'bottom' as const },
  globals: {
    viewport: { value: 'mobile' },
  },
  name: 'Right + bottom on mobile (cart)',
  render: (args) => (
    <DrawerWithTrigger
      mobilePosition={args.mobilePosition ?? undefined}
      position={args.position ?? 'right'}
      title="Open cart"
    >
      <div
        style={{
          background: 'var(--context-color, #fff)',
          height: '100%',
          maxWidth: '100%',
          overflow: 'auto',
          padding: '1.5rem',
          width: 'min(400px, 100vw)',
        }}
      >
        <h2 style={{ marginTop: 0 }}>Your cart</h2>
        <p>
          Below 768px width the panel slides up from the bottom; at tablet and
          up it slides in from the right.
        </p>
      </div>
    </DrawerWithTrigger>
  ),
};

export const RightSidebar: Story = {
  args: drawerStubs.default,
  name: 'Right (e.g. shopping cart)',
  render: (args) => (
    <DrawerWithTrigger position={args.position ?? 'right'} title="Open cart">
      <div
        style={{
          background: 'var(--context-color, #fff)',
          height: '100%',
          maxWidth: '100%',
          overflow: 'auto',
          padding: '1.5rem',
          width: 'min(400px, 100vw)',
        }}
      >
        <h2 style={{ marginTop: 0 }}>Your cart</h2>
        <p>
          Custom content goes here. Close via Escape, or click the backdrop.
        </p>
      </div>
    </DrawerWithTrigger>
  ),
};

export const LeftSidebar: Story = {
  args: drawerStubs.left,
  name: 'Left',
  render: (args) => (
    <DrawerWithTrigger position={args.position ?? 'left'} title="Open menu">
      <div
        style={{
          background: 'var(--context-color, #fff)',
          height: '100%',
          maxWidth: '100%',
          overflow: 'auto',
          padding: '1.5rem',
          width: 'min(320px, 100vw)',
        }}
      >
        <h2 style={{ marginTop: 0 }}>Menu</h2>
        <p>Slides in from the left. Content is fully customizable.</p>
      </div>
    </DrawerWithTrigger>
  ),
};

export default meta;
