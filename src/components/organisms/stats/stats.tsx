import { useReducedMotion } from 'motion/react';
import { useCallback, useId } from 'react';
import React from 'react';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import Row from 'components/utilities/row/row';
import {
  AmplienceImagePayload,
  AmplienceMediaPayload,
} from 'integrations/content/amplience/types/content-types';
import LegalTextNote from './legal-text-note';
import StatsBackgroundImage from './stats-background-image';
import StatsButtons from './stats-buttons';
import StatsList from './stats-list';
import StatsMainMedia from './stats-main-media';
import StatsTitle from './stats-title';
import { useStatsIntersectionObservers } from './utils';
import styles from './stats.module.scss';

type Stat = {
  statsTitle?: string;
  statsValue?: string;
};

export interface StatsProps extends ModuleWrapperProps {
  backgroundImageObject?: AmplienceImagePayload;
  button?: BaseButton[];
  foregroundMedia?: AmplienceMediaPayload[];
  legalText: string;
  stats?: Stat[];
  title?: string;
}

const Stats = ({
  anchorTarget,
  backgroundImageObject,
  button,
  color,
  foregroundMedia,
  legalText,
  stats,
  title,
}: StatsProps) => {
  const {
    backgroundImageHasEntered,
    backgroundImageRef,
    buttonHasEntered,
    buttonRef,
    legalTextHasEntered,
    legalTextRef,
    statHasEntered,
    statRefs,
    titleHasEntered,
    titleRef,
  } = useStatsIntersectionObservers();

  const prefersReducedMotion = useReducedMotion();
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  const focusLegalText = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const el = (legalTextRef as React.RefObject<HTMLElement | null>).current;
      if (el) {
        el.focus({ preventScroll: false });
        el.scrollIntoView({
          behavior: scrollBehavior,
          block: 'nearest',
        });
      }
    },
    [legalTextRef, scrollBehavior],
  );

  const animationSpeed = 'speed-verySlow';
  const idFragment = useId().replace(/:/g, '-');
  const noteId = `stats-note-${idFragment}`;
  const footnoteId = `stats-footnote-${idFragment}`;

  return (
    <ModuleWrapper
      anchorTarget={anchorTarget}
      className={styles.component}
      color={color}
    >
      <Container>
        <Row
          classNameOuter={styles.outerRow}
          outerGutter={{ laptop: 'none', mobile: 'medium' }}
        >
          <Column
            className={styles.contentContainer}
            offset={{ laptop: 1 }}
            width={{ tablet: 6 }}
          >
            {title && (
              <StatsTitle
                animationSpeed={animationSpeed}
                title={title}
                titleHasEntered={titleHasEntered}
                titleRef={titleRef}
              />
            )}

            {!!stats?.length && (
              <StatsList
                animationSpeed={animationSpeed}
                footnoteId={footnoteId}
                legalText={legalText}
                noteId={noteId}
                onFootnoteClick={focusLegalText}
                statHasEntered={statHasEntered}
                statRefs={statRefs}
                stats={stats}
                styles={styles}
              />
            )}

            {legalText && (
              <LegalTextNote
                animationSpeed={animationSpeed}
                legalText={legalText}
                legalTextHasEntered={legalTextHasEntered}
                legalTextRef={legalTextRef}
                noteId={noteId}
                styles={styles}
              />
            )}

            {button && (
              <StatsButtons
                animationSpeed={animationSpeed}
                buttonHasEntered={buttonHasEntered}
                buttonRef={buttonRef}
                buttons={button}
              />
            )}
          </Column>

          <Column className={styles.media} width={{ laptop: 4, tablet: 6 }}>
            <StatsBackgroundImage
              backgroundImageHasEntered={backgroundImageHasEntered}
              backgroundImageObject={backgroundImageObject}
              backgroundImageRef={backgroundImageRef}
              styles={styles}
            />

            <StatsMainMedia
              backgroundImageHasEntered={backgroundImageHasEntered}
              foregroundMedia={foregroundMedia}
              styles={styles}
            />
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

Stats.displayName = 'Stats';

export default Stats;
