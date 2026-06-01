import classNames from 'classnames';
import { useI18n } from 'next-localization';
import { useRef, useState } from 'react';
import React from 'react';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Video from 'components/atoms/video/video';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import Row from 'components/utilities/row/row';
import ScrollFade from 'components/utilities/scroll-fade/scroll-fade';
import { AmplienceMediaPayload } from 'integrations/content/amplience/types/content-types';
import { useSetNavigationColor } from 'libraries/hooks/navigation/use-set-navigation-color';
import { ExplorePageCategories } from 'types/explore-pages';
import AnchorMenu, { AnchorMenuProps } from '../anchor-menu/anchor-menu';
import Button from '../button/button';
import styles from './hero-category.module.scss';

export interface HeroCategoryProps extends ModuleWrapperProps {
  /** An array of anchor linkt to show in the anchor menu bar */
  anchorList?: AnchorMenuProps['anchorList'];
  bikeCategory?: ExplorePageCategories;
  button: BaseLink[];
  heroText: string;
  media?: AmplienceMediaPayload[];
  title: string;
}

const HeroCategory = ({
  anchorList,
  bikeCategory,
  button,
  heroText,
  media,
  title,
}: HeroCategoryProps) => {
  const { t } = useI18n();
  const componentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [hasNoVideoProfile, setHasNoVideoProfile] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  const videoPayload = media?.[0]?.video;
  const videoAltText = media?.[0]?.altText;
  const imageObject = media?.[0]?.image;

  // start manipulate navigation color
  const self = useRef<HTMLDivElement>(null);

  useSetNavigationColor(self, 'secondary', true);
  // end manipulate navigation color

  return (
    <React.Fragment>
      <ModuleWrapper
        ref={self}
        className={styles.moduleWrapper}
        color="primary"
        hero
      >
        <div
          ref={componentRef}
          className={classNames(
            styles.component,
            bikeCategory && styles[bikeCategory],
          )}
        >
          <div className={styles.background}>
            <ParallaxWrapper className={styles.parallax}>
              {imageObject && (
                <Image
                  alt={imageObject.alt}
                  className={styles.image}
                  fill
                  imageObject={imageObject}
                  fetchPriority="high"
                  priority
                />
              )}
              {videoPayload && (
                <Video
                  ref={videoRef}
                  altText={videoAltText}
                  autoPlay
                  className={styles.video}
                  loop
                  manuallyPaused={isVideoPaused}
                  muted
                  noVideoProfileCallback={() => setHasNoVideoProfile(true)}
                  playsInline
                  videoObject={videoPayload}
                />
              )}
              <div className={styles.backgroundOverlay} />
            </ParallaxWrapper>
          </div>
          <Container className={styles.container}>
            <ScrollFade fromRange={[1, 0]} opacityStartEnd={[0, 1]}>
              <Row>
                <MotionSlide
                  className={styles.headlineMotion}
                  direction="left-right"
                  speed="speed-slow"
                >
                  <Column
                    offset={{ desktop: 1 }}
                    width={{
                      desktop: 6,
                      smallLaptop: 9,
                    }}
                  >
                    <Typography
                      className={styles.title}
                      doRecut
                      tag="h1"
                      tagStyle="displayXXLarge"
                    >
                      {title}
                    </Typography>
                  </Column>
                </MotionSlide>
              </Row>
            </ScrollFade>
            <Row
              className={styles.textRowInner}
              classNameOuter={styles.textRow}
            >
              <Column
                className={styles.text}
                offset={{ desktop: 1, smallLaptop: 7 }}
                width={{ desktop: 4, smallLaptop: 4 }}
              >
                <MotionSlide
                  className={styles.text}
                  direction="up"
                  speed="speed-slow"
                >
                  <Typography tag="p">{heroText}</Typography>
                  {button?.[0] && (
                    <Button
                      link={button[0]}
                      size="small"
                      text={button[0].linkText}
                      variant="Secondary"
                    />
                  )}
                </MotionSlide>
              </Column>
            </Row>
            {videoPayload && (
              <Row classNameOuter={styles.buttonRow}>
                <Column className={styles.playButtonColumn}>
                  {!hasNoVideoProfile && (
                    <Button
                      aria-label={
                        isVideoPaused ? t('video.pause') : t('video.play')
                      }
                      innerClassName={styles.videoButtonInner}
                      leftIcon={isVideoPaused ? 'Play_16' : 'Pause_16'}
                      onClick={() => {
                        if (videoRef.current && videoRef.current.paused) {
                          videoRef.current.play();
                          setIsVideoPaused(false);
                        } else if (videoRef.current) {
                          videoRef.current.pause();
                          setIsVideoPaused(true);
                        }
                      }}
                      size="large"
                      variant="Tertiary"
                    />
                  )}
                </Column>
              </Row>
            )}
          </Container>
        </div>
      </ModuleWrapper>
      {anchorList && (
        <AnchorMenu
          anchorList={anchorList}
          pullIntoTopElement
          topElement={componentRef}
        />
      )}
    </React.Fragment>
  );
};

HeroCategory.displayName = 'HeroCategory';

export default HeroCategory;
