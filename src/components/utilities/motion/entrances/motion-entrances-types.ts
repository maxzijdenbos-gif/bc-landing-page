import { MOTION_DURATIONS } from '../motion-types';

export interface MotionEntrancesProps {
  animationDisabled?: boolean;
  initMotion?: boolean;
  speed?: keyof typeof MOTION_DURATIONS;
}
