import React, { RefObject } from 'react';
import Typography from 'components/atoms/typography/typography';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import { MOTION_DURATIONS } from 'components/utilities/motion/motion-types';

export interface StatsTitleProps {
  animationSpeed: keyof typeof MOTION_DURATIONS;
  title: string;
  titleHasEntered: boolean;
  titleRef: RefObject<HTMLDivElement | null>;
}

const StatsTitle = ({
  animationSpeed,
  title,
  titleHasEntered,
  titleRef,
}: StatsTitleProps) => (
  <MotionSlide
    direction="up"
    initMotion={titleHasEntered}
    speed={animationSpeed}
  >
    <div ref={titleRef}>
      <Typography tag="h2" tagStyle="headlineLarge" weight="bold">
        {title}
      </Typography>
    </div>
  </MotionSlide>
);

export default StatsTitle;
