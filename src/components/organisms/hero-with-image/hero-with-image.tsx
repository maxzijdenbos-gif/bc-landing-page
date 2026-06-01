import classNames from 'classnames';
import { Fragment, useContext, useRef, useState } from 'react';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import AnchorMenu, {
  AnchorMenuProps,
  MIN_ANCHOR_ITEMS,
} from 'components/molecules/anchor-menu/anchor-menu';
import Breadcrumb from 'components/molecules/breadcrumb/breadcrumb';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import MotionFade from 'components/utilities/motion/transitions/motion-fade/motion-fade';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import Row from 'components/utilities/row/row';
import ScrollFade from 'components/utilities/scroll-fade/scroll-fade';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import HierarchyLinksContext from 'libraries/contexts/hierarchy-links-context';
import ButtonList, { ButtonListProps } from '../button-list/button-list';
import styles from './hero-with-image.module.scss';

export interface HeroWithImageProps extends ModuleWrapperProps {
  /** An array of anchor link to show in the anchor menu bar */
  anchorList?: AnchorMenuProps['anchorList'];
  /** An array of links to show */
  buttonGroup?: ButtonListProps['buttons'];
  doRecut?: boolean;
  heroText: string;
  imageObject: AmplienceImagePayload;
  title: string;
}

const HeroWithImage = ({
  anchorList,
  buttonGroup,
  doRecut,
  heroText,
  imageObject,
  title,
}: HeroWithImageProps) => {
  const { breadcrumbLinks } = useContext(HierarchyLinksContext);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const buttonVariant = (index: number) => {
    // If there is more than one button in the group and the button is the first one, it is the primary button
    if ((buttonGroup?.length ?? 0) > 1 && index === 0) {
      return 'Primary';
    }

    return 'Secondary';
  };

  return (
    <Fragment>
      <ModuleWrapper
        ref={componentRef}
        className={classNames(styles.component, {
          [styles.hasAnchorList]:
            anchorList?.length && anchorList.length >= MIN_ANCHOR_ITEMS,
        })}
        color={'secondary'}
      >
        <div className={styles.heroContent}>
          {imageObject && (
            <div
              className={classNames(styles.imageWrapper, {
                [styles.imageWrapperLoaded]: imageIsLoaded,
              })}
              data-testid="image-wrapper"
            >
              {breadcrumbLinks && (
                <MotionFade speed="speed-verySlow">
                  <Breadcrumb className={styles.breadcrumb} />
                </MotionFade>
              )}
              <ParallaxWrapper className={styles.parallaxWrapper}>
                <MotionSlide direction="up" speed="speed-verySlow">
                  <div className={styles.overlay} data-testid="overlay" />
                  <Image
                    alt={imageObject.alt}
                    className={styles.image}
                    fill
                    imageObject={imageObject}
                    {...generateImageSizes(12, 12, 12, 12, 12)}
                    onLoad={() => setImageIsLoaded(true)}
                    onErrorCallback={() => {
                      // If image fails to load, show content anyway
                      setImageIsLoaded(true);
                    }}
                    fetchPriority="high"
                    priority
                  />
                </MotionSlide>
              </ParallaxWrapper>
            </div>
          )}
          {imageIsLoaded && (
            <Container className={styles.contentContainer}>
              <ScrollFade
                elementRef={componentRef}
                fromRange={[1, 0]}
                opacityStartEnd={[0, 1]}
                initMotion={imageIsLoaded}
              >
                <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
                  <Column
                    className={styles.contentColumn}
                    offset={{ laptop: 3, smallLaptop: 2, tablet: 1 }}
                    width={{ laptop: 6, smallLaptop: 8, tablet: 10 }}
                  >
                    {title && (
                      <MotionSlide
                        direction="left-right"
                        speed="speed-verySlow"
                        initMotion={imageIsLoaded}
                      >
                        <Typography
                          doRecut={doRecut}
                          tag="h1"
                          tagStyle="displayXLarge"
                        >
                          {title}
                        </Typography>
                      </MotionSlide>
                    )}
                    <MotionFade
                      speed="speed-verySlow"
                      initMotion={imageIsLoaded}
                    >
                      <div>
                        {heroText && (
                          <Typography tag="p" tagStyle="bodyMedium">
                            {heroText}
                          </Typography>
                        )}
                        {buttonGroup && (
                          <ButtonList
                            buttons={
                              buttonGroup.map((button, index) => ({
                                ...button,
                                style: buttonVariant(index),
                              })) as ButtonListProps['buttons']
                            }
                            className={styles.buttonGroup}
                          />
                        )}
                      </div>
                    </MotionFade>
                  </Column>
                </Row>
              </ScrollFade>
            </Container>
          )}
        </div>
      </ModuleWrapper>
      {anchorList && (
        <AnchorMenu anchorList={anchorList} topElement={componentRef} />
      )}
    </Fragment>
  );
};

HeroWithImage.displayName = 'HeroWithImage';

export default HeroWithImage;
