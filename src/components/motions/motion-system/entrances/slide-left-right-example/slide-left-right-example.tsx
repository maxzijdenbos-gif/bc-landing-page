import classNames from 'classnames';
import { useState } from 'react';
import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import { MotionEntrancesProps } from 'components/utilities/motion/entrances/motion-entrances-types';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import { MOTION_DURATIONS } from 'components/utilities/motion/motion-types';
import Row from 'components/utilities/row/row';
import styles from '../motion-entrances.module.scss';

const SlideLeftRightExample = ({
  speed = 'speed-slow',
}: MotionEntrancesProps) => {
  const [key, incrementKey] = useState(0);

  return (
    <Container className={styles.component}>
      <Row>
        <Column width={{ tablet: 10 }}>
          <div
            className={classNames(styles.motionContainer, styles.borderBottom)}
          >
            {/* Motion code Start */}
            <MotionSlide
              key={`slideLeftRight-${key}`}
              animationDisabled={key === 0}
              direction="left-right"
              speed={speed}
            >
              <Typography tag="h3" tagStyle="headlineMedium">
                Motion: Slide-Left-Right
              </Typography>
            </MotionSlide>
            {/* Motion code End */}
          </div>
        </Column>
        <Column width={{ tablet: 2 }}>
          <Typography tag="span" tagStyle="displaySmall">
            <button
              className={styles.refreshMotion}
              onClick={() => incrementKey(1 + key)}
            >
              &#x21bb;
            </button>
          </Typography>
        </Column>
        <Column
          key={key}
          className={styles.motionDuration}
          width={{ tablet: 5 }}
        >
          <Row>
            <Column className={styles.motionInfoStart} width={{ mobile: 4 }}>
              0s
            </Column>
            <Column className={styles.motionInfoMiddle} width={{ mobile: 4 }}>
              ease-out
            </Column>
            <Column className={styles.motionInfoEnd} width={{ mobile: 4 }}>
              {MOTION_DURATIONS[speed]?.duration}
            </Column>
            <Column className={styles.durationBlock}></Column>
          </Row>
        </Column>
      </Row>
    </Container>
  );
};

SlideLeftRightExample.displayName = 'SlideLeftRightExample';

export default SlideLeftRightExample;
