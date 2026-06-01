/* eslint-disable sort-keys */

import { UseScrollOptions } from 'motion/react';

type MotionSpeeds =
  | 'speed-short'
  | 'speed-medium'
  | 'speed-slow'
  | 'speed-verySlow'
  | 'speed-2xSlow';

// Must match the scss variables under - src/variables/general.scss - speeds
export const MOTION_DURATIONS: Record<MotionSpeeds, { duration: string }> = {
  'speed-short': { duration: '0.125s' },
  'speed-medium': { duration: '0.25s' },
  'speed-slow': { duration: '0.5s' },
  'speed-verySlow': { duration: '1s' },
  'speed-2xSlow': { duration: '1.5s' },
};

type MotionScrollOffsetNaming =
  | 'startEndToEndEnd'
  | 'startEndToEndStart'
  | 'startEndStartCenter'
  | 'startStartEndStart';

export type MotionScrollObserverOffset =
  | MotionScrollOffsetNaming
  | UseScrollOptions['offset'];

export const MOTION_SCROLL_OBSERVER_OFFSET_KEYS: Record<
  MotionScrollOffsetNaming,
  UseScrollOptions['offset']
> = {
  startEndStartCenter: ['start end', 'start center'],
  startEndToEndEnd: ['start end', 'end end'],
  startEndToEndStart: ['start end', 'end start'],
  startStartEndStart: ['start start', 'end start'],
};

export interface SharedMotionProps {
  children?: React.ReactNode;
  className?: string;
  elementRef?: React.RefObject<any>;
  /**
   * `startEndStartCenter`
   *
   * * Starts when: element's start hits viewport's bottom (start end)
   * * Ends when: element's start hits viewport's center (start center)
   *
   * `startEndToEndEnd`
   *
   * * Starts when: element's start hits viewport's bottom (start end)
   * * Ends when: element's end hits viewport's bottom (end end)
   *
   * `startEndToEndStart`
   *
   * * Starts when: element's start hits viewport's bottom (start end)
   * * Ends when: element's end hits viewport's top (end start)
   *
   * `startStartEndStart`
   *
   * * Starts when: element's start hits viewport's top (start start)
   * * Ends when: element's end hits viewport's top (end start)
   */
  observerOffset?: MotionScrollObserverOffset;
}
