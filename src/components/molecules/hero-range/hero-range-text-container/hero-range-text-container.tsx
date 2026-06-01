import classNames from 'classnames';
import { RefObject, useRef } from 'react';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import Column from 'components/utilities/column/column';
import MotionFade from 'components/utilities/motion/transitions/motion-fade/motion-fade';
import Row from 'components/utilities/row/row';
import { HeroRangeProps } from '../hero-range';
import styles from './hero-range-text-container.module.scss';

interface HeroRangeTextContainerProps extends Pick<
  HeroRangeProps,
  'leadParagraphs'
> {
  isIntersectingSlide?: boolean;
  isViewed?: boolean;
  refItem: RefObject<HTMLDivElement | null>;
}

export const HeroRangeTextContainer = ({
  isIntersectingSlide,
  isViewed,
  leadParagraphs,
  refItem,
}: HeroRangeTextContainerProps) => {
  const mainElement = useRef(null);

  return (
    <div ref={mainElement} className={styles.component}>
      <div className={styles.paragraph}>
        <Row className={styles.row} classNameOuter={styles.row}>
          <MotionFade
            initMotion={isIntersectingSlide || isViewed}
            speed="speed-slow"
            transition={isIntersectingSlide ? 'in' : 'out'}
          >
            <Column
              className={classNames(styles.slideContainer, {
                [styles.isActive]: isIntersectingSlide,
              })}
              width={{ desktop: 4, mobile: 12, tablet: 6 }}
            >
              <div ref={refItem} className={styles.slide}>
                <Typography tag="p" tagStyle="headlineLarge" weight="bold">
                  {leadParagraphs?.[0].paragraphText}
                </Typography>
                {leadParagraphs?.[0]?.paragraphButton?.[0]?.link?.linkText && (
                  <Button
                    link={leadParagraphs[0].paragraphButton[0].link}
                    onFocus={() =>
                      !isIntersectingSlide && refItem?.current?.scrollIntoView()
                    }
                    text={leadParagraphs[0].paragraphButton[0].link.linkText}
                    variant="Secondary"
                  />
                )}
              </div>
            </Column>
          </MotionFade>
          <Column className={styles.placeholderSlideContainer} />
        </Row>
      </div>
    </div>
  );
};
