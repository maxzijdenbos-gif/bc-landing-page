import React, { RefObject } from 'react';
import Typography from 'components/atoms/typography/typography';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import { MOTION_DURATIONS } from 'components/utilities/motion/motion-types';
import StatTitleWithFootnote from './stat-title-with-footnote';

export type StatListItem = {
  statsTitle?: string;
  statsValue?: string;
};

export interface StatsListProps {
  animationSpeed: keyof typeof MOTION_DURATIONS;
  footnoteId: string;
  legalText: string;
  noteId: string;
  onFootnoteClick: (e: React.MouseEvent) => void;
  statHasEntered: boolean[];
  statRefs: RefObject<HTMLDivElement | null>[];
  stats: StatListItem[];
  styles: Readonly<Record<string, string>>;
}

const StatsList = ({
  animationSpeed,
  footnoteId,
  legalText,
  noteId,
  onFootnoteClick,
  statHasEntered,
  statRefs,
  stats,
  styles,
}: StatsListProps) => (
  <dl className={styles.statsContainer}>
    {stats.map((stat, index) => (
      <div key={`stat-${index}`} className={styles.singleStatContainer}>
        <MotionSlide
          delay={index % 2 > 0 ? 'speed-short' : undefined}
          direction="up"
          initMotion={statHasEntered[index]}
          speed={animationSpeed}
        >
          <div ref={statRefs[index]}>
            <dt className={styles.statDt}>
              <StatTitleWithFootnote
                footnoteId={footnoteId}
                legalText={legalText}
                noteId={noteId}
                onFootnoteClick={onFootnoteClick}
                statsTitle={stat.statsTitle}
                styles={styles}
              />
            </dt>

            {/* We are required by the use case to allow for source casing. */}
            <dd className={styles.statDd}>
              <Typography
                tag="p"
                tagStyle="displayMedium"
                style={{ textTransform: 'initial' }}
              >
                {stat.statsValue}
              </Typography>
            </dd>
          </div>
        </MotionSlide>
      </div>
    ))}
  </dl>
);

export default StatsList;
