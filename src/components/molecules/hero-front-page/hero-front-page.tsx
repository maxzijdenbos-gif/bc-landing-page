import { useI18n } from 'next-localization';
import { useRef, useState } from 'react';
import React from 'react';
import Icon from 'components/atoms/icon/icon';
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
import {
  AmplienceMediaVideoObjectPayload,
  AmplienceVideoPayload,
} from 'integrations/content/amplience/types/content-types';
import { useSetNavigationColor } from 'libraries/hooks/navigation/use-set-navigation-color';
import { AmplienceVideoSchema } from 'pages/amplience/extensions/amplience-video-schema';
import Button from '../button/button';
import styles from './hero-front-page.module.scss';

export interface HeroFrontPageProps extends ModuleWrapperProps {
  // Legacy: CMS sent video link directly as media (same as old {media && <Video videoObject={media} />})
  media?: AmplienceVideoPayload;
  mediaSchema?: AmplienceVideoSchema;
  textTeaser?: string;
  title: string;
  // Legacy: raw video link when CMS does not send videoObject.video
  video?: AmplienceVideoPayload;
  // New schema: media with nested video + altText
  videoObject?: AmplienceMediaVideoObjectPayload;
}

const HeroFrontPage = ({
  media,
  mediaSchema,
  title,
  textTeaser,
  videoObject,
}: HeroFrontPageProps) => {
  const { t } = useI18n();
  const componentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasNoVideoProfile, setHasNoVideoProfile] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  let videoPayload;
  let videoAltText;

  if (videoObject) {
    videoPayload = videoObject.video;
    videoAltText = videoObject.altText;
  } else if (media) {
    videoPayload = media;
    videoAltText = media.altText;
  }

  useSetNavigationColor(componentRef, 'secondary', true);

  return (
    <React.Fragment>
      <ModuleWrapper className={styles.moduleWrapper} color="primary" hero>
        <div ref={componentRef} className={styles.component}>
          <div className={styles.background}>
            <ParallaxWrapper className={styles.parallax}>
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
                  videoObjectSchema={mediaSchema}
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
                    width={{
                      desktop: 8,
                      laptop: 6,
                      smallLaptop: 8,
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

            <div className={styles.scrollContainer}>
              <ParallaxWrapper
                elementRef={componentRef}
                observerOffset="startStartEndStart"
                translateYStartEnd={['0vh', '100vh']}
              >
                <div className={styles.textTeaser}>
                  <Typography tag="p" tagStyle="headlineMedium">
                    {textTeaser}
                  </Typography>
                  <div className={styles.svgAnimationContainer}>
                    <div className={styles.svgAnimation}>
                      <Icon className={styles.svg} name={'Scroll_32'} hidden />
                      {/* A second is needed for completing the animation */}
                      <Icon className={styles.svg} name={'Scroll_32'} hidden />
                    </div>
                  </div>
                </div>
              </ParallaxWrapper>

              {videoPayload && !hasNoVideoProfile && (
                <Button
                  aria-label={
                    isVideoPaused
                      ? t('video.pauseDecorative')
                      : t('video.playDecorative')
                  }
                  className={styles.videoButton}
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
                  variant="Tertiary"
                />
              )}
            </div>
          </Container>
        </div>
      </ModuleWrapper>
    </React.Fragment>
  );
};

HeroFrontPage.displayName = 'HeroFrontPage';

export default HeroFrontPage;
