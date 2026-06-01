import { useState } from 'react';
import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import { MotionEntrancesProps } from 'components/utilities/motion/entrances/motion-entrances-types';
import { MOTION_DURATIONS } from 'components/utilities/motion/motion-types';
import MotionFade from 'components/utilities/motion/transitions/motion-fade/motion-fade';
import Row from 'components/utilities/row/row';
import styles from '../motion-entrances.module.scss';

const FadeInExample = ({ speed = 'speed-slow' }: MotionEntrancesProps) => {
  const [key, incrementKey] = useState(0);

  return (
    <Container className={styles.component}>
      <Row>
        <Column>
          <Typography
            className={styles.headline}
            tag="h2"
            tagStyle="headlineMedium"
          >
            Motion: Fade
          </Typography>
        </Column>
        <Column width={{ tablet: 10 }}>
          <div className={styles.motionContainer}>
            {/* Motion code Start */}
            <MotionFade
              key={`slideUp-${key}`}
              animationDisabled={key === 0}
              speed={speed}
            >
              <Typography tag="h3" tagStyle="bodyMedium">
                Lorem ipsum long text, Lorem ipsum long text, Lorem ipsum long
                text, Lorem ipsum long text,Lorem ipsum long text. Lorem ipsum
                long text, Lorem ipsum long text,Lorem ipsum long text Lorem
                ipsum long text, Lorem ipsum long text,Lorem ipsum long text
              </Typography>
            </MotionFade>
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
        <Column className={styles.motionDuration} width={{ tablet: 5 }}>
          <Row>
            <Column className={styles.motionInfoStart} width={{ mobile: 4 }}>
              0s
            </Column>
            <Column className={styles.motionInfoMiddle} width={{ mobile: 4 }}>
              ease-out
            </Column>
            <Column className={styles.motionInfoEnd} width={{ mobile: 4 }}>
              {MOTION_DURATIONS?.[speed].duration}
            </Column>
            <Column className={styles.durationBlock}></Column>
          </Row>
        </Column>
      </Row>
    </Container>
  );
};

FadeInExample.displayName = 'FadeInExample';

export default FadeInExample;
