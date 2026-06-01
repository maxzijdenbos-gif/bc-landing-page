import React, { RefObject } from 'react';
import ButtonList from 'components/organisms/button-list/button-list';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import { MOTION_DURATIONS } from 'components/utilities/motion/motion-types';

export interface StatsButtonsProps {
  animationSpeed: keyof typeof MOTION_DURATIONS;
  buttonHasEntered: boolean;
  buttonRef: RefObject<HTMLDivElement | null>;
  buttons: BaseButton[];
}

const StatsButtons = ({
  animationSpeed,
  buttonHasEntered,
  buttonRef,
  buttons,
}: StatsButtonsProps) => (
  <MotionSlide
    direction="up"
    initMotion={buttonHasEntered}
    speed={animationSpeed}
  >
    <div ref={buttonRef}>
      <ButtonList buttons={buttons} />
    </div>
  </MotionSlide>
);

export default StatsButtons;
