import classNames from 'classnames';
import React from 'react';
import Typography from 'components/atoms/typography/typography';
import AnchorMenu, {
  AnchorMenuProps,
  MIN_ANCHOR_ITEMS,
} from 'components/molecules/anchor-menu/anchor-menu';
import Breadcrumb from 'components/molecules/breadcrumb/breadcrumb';
import LeadParagraph from 'components/molecules/lead-paragraph/lead-paragraph';
import ButtonList, {
  ButtonListProps,
} from 'components/organisms/button-list/button-list';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import MotionFade from 'components/utilities/motion/transitions/motion-fade/motion-fade';
import Row from 'components/utilities/row/row';
import styles from './hero-text.module.scss';

export interface HeroTextProps extends ModuleWrapperProps {
  /** An array of anchor linkt to show in the anchor menu bar */
  anchorList?: AnchorMenuProps['anchorList'];
  /** An array of links to show */
  buttonGroup?: ButtonListProps['buttons'];
  /** Display the headline as the Recut font (first word) */
  doRecut?: boolean;
  /** The text to show as a headline */
  headline: string;
  /** The introduction text */
  leadParagraph?: string;
}

const HeroText = ({
  buttonGroup,
  color,
  doRecut,
  headline,
  leadParagraph,
  anchorList,
}: HeroTextProps) => {
  const componentRef = React.useRef<HTMLDivElement>(null);

  return (
    <React.Fragment>
      <ModuleWrapper
        ref={componentRef}
        className={classNames(styles.component, {
          [styles.hasAnchorMenu]:
            anchorList?.length && anchorList.length >= MIN_ANCHOR_ITEMS,
        })}
        color={color}
      >
        <Container>
          <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
            <Column
              className={styles.contentColumn}
              offset={{ laptop: 3, tablet: 1 }}
              width={{ laptop: 6, tablet: 10 }}
            >
              <MotionFade>
                <Breadcrumb />
              </MotionFade>
              <MotionSlide direction="left-right">
                <Typography doRecut={doRecut} tag="h1" tagStyle="displayLarge">
                  {headline}
                </Typography>
              </MotionSlide>
              {buttonGroup && (
                <MotionFade>
                  <ButtonList buttons={buttonGroup} />
                </MotionFade>
              )}
            </Column>
          </Row>
        </Container>
      </ModuleWrapper>

      {anchorList && (
        <AnchorMenu anchorList={anchorList} topElement={componentRef} />
      )}
      {leadParagraph && (
        <ModuleWrapper className={styles.leadParagraph} color={color}>
          <Container>
            <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
              <Column
                offset={{ laptop: 3, tablet: 1 }}
                width={{ laptop: 6, tablet: 10 }}
              >
                <LeadParagraph text={leadParagraph} />
              </Column>
            </Row>
          </Container>
        </ModuleWrapper>
      )}
    </React.Fragment>
  );
};

HeroText.displayName = 'HeroText';

export default HeroText;
