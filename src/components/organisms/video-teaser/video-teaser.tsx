import classNames from 'classnames';
import { motion, useScroll, useTransform } from 'motion/react';
import { useI18n } from 'next-localization';
import { RefObject, useRef, useState } from 'react';
import React from 'react';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Video from 'components/atoms/video/video';
import Button from 'components/molecules/button/button';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import MotionFade from 'components/utilities/motion/transitions/motion-fade/motion-fade';
import Row from 'components/utilities/row/row';
import {
  AmplienceImagePayload,
  AmplienceMediaVideoObjectPayload,
  AmplienceVideoPayload,
} from 'integrations/content/amplience/types/content-types';
import { trackCustomVideoLinkClick } from 'integrations/tracking/google-tag-manager/scripts';
import { useMainNavigationContext } from 'libraries/contexts/main-navigation-context';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import { AmplienceVideoSchema } from 'pages/amplience/extensions/amplience-video-schema';
import styles from './video-teaser.module.scss';

interface QuoteElementProps {
  byline?: {
    authorDescription: string;
    authorName: string;
    avatar: AmplienceImagePayload;
  };
  promotionText: string;
}

export interface VideoTeaserProps extends ModuleWrapperProps {
  altText?: string;
  mediaSchema?: AmplienceVideoSchema;
  quoteElements?: QuoteElementProps[];
  // Legacy: raw video link when CMS does not send videoObject.video
  video?: AmplienceVideoPayload;
  videoLink: BaseLink[];
  // New schema: media with nested video + altText. Legacy: use video.
  videoObject?: AmplienceMediaVideoObjectPayload;
  videoProvider?: string;
  videoTitle?: string;
}

const ROOT_MARGIN = '-30% 0% -30% 0%';

const QuoteElement = ({ promotionText, byline }: QuoteElementProps) => {
  const [hideImage, setHideImage] = useState(false);
  const { domNode, isIntersecting, isViewed } = useIntersectionObserver({
    rootMargin: ROOT_MARGIN,
    unObserveOnThreshold: 0.9,
  });

  const handleImageLoadError = () => {
    setHideImage(true);
  };

  return (
    <div className={styles.quoteElement}>
      <MotionFade
        initMotion={isViewed}
        speed="speed-verySlow"
        transition={isIntersecting ? 'in' : 'out'}
      >
        <Row classNameOuter={styles.quoteRow}>
          <Column
            offset={{
              laptop: 1,
              mobile: 0,
              tablet: 1,
            }}
            width={{
              laptop: 5,
              mobile: 12,
              tablet: 5,
            }}
          >
            <div ref={domNode}>
              <Typography tag="p" tagStyle="displaySmall">
                {promotionText}
              </Typography>
              {byline && (
                <div className={styles.author}>
                  {byline.avatar?.diImage?.image && (
                    <Image
                      alt={byline.avatar.alt || ''}
                      className={classNames(styles.avatar, {
                        [styles.hideAvatar]: hideImage,
                      })}
                      height={0}
                      imageObject={byline.avatar}
                      onErrorCallback={handleImageLoadError}
                      quality={80}
                      width={800}
                    />
                  )}
                  <div>
                    <Typography tag="p" tagStyle="headlineLarge" weight="bold">
                      {byline.authorName}
                    </Typography>
                    <Typography tag="p" tagStyle="bodyLarge">
                      {byline.authorDescription}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </Column>
        </Row>
      </MotionFade>
    </div>
  );
};

const VideoTeaser = ({
  anchorTarget,
  altText,
  color,
  mediaSchema,
  quoteElements,
  video,
  videoObject,
  videoLink,
  videoProvider,
  videoTitle,
}: VideoTeaserProps) => {
  const { t } = useI18n();

  const [videoManuallyStopped, setVideoManuallyStopped] = useState<
    boolean | null
  >(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasNoVideoProfile, setHasNoVideoProfile] = useState(false);
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { setPreventHideNavigation } = useMainNavigationContext();

  const { domNode: moduleRef } = useIntersectionObserver({
    rootMargin: '0% 0% -99%  0%',
    threshold: 0,
  }) as unknown as {
    domNode: RefObject<HTMLDivElement>;
    isViewed: boolean;
  };

  const { scrollYProgress } = useScroll({
    axis: 'y',
    offset: ['start start', '0 -0.15'],
    target: moduleRef,
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    isButtonFocused
      ? ['inset(0vh)', 'inset(0vh)'] // Ensure both values exist
      : ['inset(8vh 7vh)', 'inset(0vh)'],
  );

  const clipPathButton = useTransform(
    scrollYProgress,
    [0, 1],
    isButtonFocused
      ? ['inset(0vh)', 'inset(0vh)'] // Keeps length same
      : ['inset(0vh 8vh 8vh 8vh)', 'inset(0vh 0vh 0vh 0vh)'],
  );

  const buttonOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    isButtonFocused ? [1, 1] : [0, 1],
  );

  const videoPayload = videoObject?.video ?? video;
  const videoAltText = videoObject?.altText ?? altText;

  return (
    <ModuleWrapper
      ref={moduleRef}
      anchorTarget={anchorTarget}
      className={styles.component}
      color={color}
      tabIndex={-1}
    >
      <div className={styles.sticky}>
        <motion.div className={styles.animateContainer} style={{ clipPath }}>
          <div className={styles.overlay} />
          {videoPayload && (
            <Video
              key={videoPayload?.id || videoPayload?.name}
              ref={videoRef}
              altText={videoAltText}
              autoPlay
              className={styles.video}
              loop
              manuallyPaused={videoManuallyStopped}
              muted
              noVideoProfileCallback={() => setHasNoVideoProfile(true)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              playsInline
              videoObject={videoPayload}
              videoObjectSchema={mediaSchema}
            />
          )}
        </motion.div>
      </div>

      <Container>
        {quoteElements?.map((quote, index) => (
          <QuoteElement key={index} {...quote} />
        ))}
      </Container>

      <div className={classNames(styles.videoButtonsWrapper)}>
        <motion.div
          className={styles.animateContainer}
          style={{
            clipPath: clipPathButton,
            opacity: buttonOpacity,
          }}
        >
          {videoPayload && !hasNoVideoProfile && (
            <Button
              aria-label={t(
                isPlaying ? 'video.pauseDecorative' : 'video.playDecorative',
              )}
              className={styles.toggleVideo}
              innerClassName={styles.toggleVideoInner}
              leftIcon={isPlaying ? 'Pause_16' : 'Play_16'}
              onBlur={() => {
                setPreventHideNavigation(false);
                setIsButtonFocused(false);
              }}
              onClick={() => setVideoManuallyStopped(!videoRef.current?.paused)}
              onFocus={() => {
                setPreventHideNavigation(true);
                setIsButtonFocused(true);
                requestAnimationFrame(() => {
                  videoRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                  });
                });
              }}
              size="medium"
              variant="Tertiary"
            />
          )}
          {!!videoLink?.[0]?.linkText && (
            <Button
              className={styles.videoButton}
              innerClassName={styles.videoButtonInner}
              leftIcon="Play_16"
              link={videoLink?.[0]}
              onBlur={() => {
                setPreventHideNavigation(false);
                setIsButtonFocused(false);
              }}
              onFocus={() => {
                setPreventHideNavigation(true);
                setIsButtonFocused(true);
                requestAnimationFrame(() => {
                  videoRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                  });
                });
              }}
              size="large"
              target={videoLink?.[0]?.target}
              text={videoLink[0].linkText}
              trackOnClick={(_, videoUrl) => {
                trackCustomVideoLinkClick({
                  videoProvider,
                  videoTitle,
                  videoUrl,
                });
              }}
              variant="Tertiary"
            />
          )}
        </motion.div>
      </div>
    </ModuleWrapper>
  );
};

VideoTeaser.displayName = 'VideoTeaser';
export default VideoTeaser;
