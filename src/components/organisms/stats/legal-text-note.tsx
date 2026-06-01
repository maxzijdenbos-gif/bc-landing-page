import React, { RefObject } from 'react';
import Typography from 'components/atoms/typography/typography';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import { MOTION_DURATIONS } from 'components/utilities/motion/motion-types';

export interface LegalTextNoteProps {
  animationSpeed: keyof typeof MOTION_DURATIONS;
  legalText: string;
  legalTextHasEntered: boolean;
  legalTextRef: RefObject<HTMLDivElement | null>;
  noteId: string;
  styles: Readonly<Record<string, string>>;
}

const LegalTextNote = ({
  animationSpeed,
  legalText,
  legalTextHasEntered,
  legalTextRef,
  noteId,
  styles,
}: LegalTextNoteProps) => (
  <MotionSlide
    direction="up"
    initMotion={legalTextHasEntered}
    speed={animationSpeed}
  >
    <div
      className={styles.legalTextNote}
      id={noteId}
      ref={legalTextRef}
      role="note"
      tabIndex={-1}
    >
      <Typography className={styles.legalText} tag="p" tagStyle="bodySmall">
        {legalText}
      </Typography>
    </div>
  </MotionSlide>
);

export default LegalTextNote;
