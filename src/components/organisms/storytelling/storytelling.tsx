import classNames from 'classnames';
import { motion, useScroll, useTransform } from 'motion/react';
import { useI18n } from 'next-localization';
import {
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import React from 'react';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Video from 'components/atoms/video/video';
import Button from 'components/molecules/button/button';
import Column from 'components/utilities/column/column';
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
import BreakpointContext from 'libraries/contexts/breakpoint-context';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import {
  ExplorePageCategories,
  ExplorePageSubCategories,
} from 'types/explore-pages';
import StorytellingTrackIcon from './storytelling-track-icon/storytelling-track-icon';
import styles from './storytelling.module.scss';

interface TextElement {
  bodyText?: string;
  doRecut?: boolean;
  headerText?: string;
  textElementChoice: 1 | 2 | 3;
}

export interface StorytellingProps extends ModuleWrapperProps {
  bikeCategory?: ExplorePageCategories;
  bikeSubCategory?: ExplorePageSubCategories;
  button?: BaseButton[];
  imageObject?: AmplienceImagePayload;
  textElements?: TextElement[];
  // Legacy: raw video link when CMS does not send videoObject.video
  video?: AmplienceVideoPayload;
  // New schema: media with nested video + altText. Legacy: use video.
  videoObject?: AmplienceMediaVideoObjectPayload;
}

const ROOT_MARGIN = '-20% 0% -40% 0%';
const THRESHOLD = 0.5;

const Storytelling = ({
  bikeCategory,
  bikeSubCategory,
  anchorTarget,
  button,
  imageObject,
  color,
  video,
  videoObject,
  textElements,
}: StorytellingProps) => {
  const videoPayload = videoObject?.video ?? video;
  const videoAltText = videoObject?.altText;
  const { isTabletOrAbove } = useContext(BreakpointContext);
  const desktopPathId = useId();
  const mobilePathId = useId();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const moduleRef = useRef<HTMLDivElement | null>(null);
  const [hasNoVideoProfile, setHasNoVideoProfile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const [isRefMounted, setIsRefMounted] = useState(false);
  const { t } = useI18n();

  const [videoManuallyStopped, setVideoManuallyStopped] = useState<
    boolean | null
  >(null);

  const setModuleNode = useCallback((node: HTMLDivElement | null) => {
    moduleRef.current = node;
    setIsRefMounted(!!node);
  }, []);

  const STICKY_THRESHOLD = isTabletOrAbove ? 0.98 : 0.9; // Adjusted threshold for mobile

  const {
    domNode: stickyContainer,
    isViewed,
    // Im utilizing that when we are not seeing the module in a "1" threshold, we are scrolling away from it
    // This means we can keep showing the first text and the last text while scrolling away
    isIntersecting: isViewingModule,
  } = useIntersectionObserver({
    threshold: STICKY_THRESHOLD,
  });

  const {
    domNode: text1,
    isIntersecting: isViewingText1,
    isViewed: isViewedText1,
  } = useIntersectionObserver({
    rootMargin: ROOT_MARGIN,

    threshold: THRESHOLD,
  });
  const {
    domNode: text2,
    isIntersecting: isViewingText2,
    isViewed: isViewedText2,
  } = useIntersectionObserver({
    rootMargin: ROOT_MARGIN,
    threshold: THRESHOLD,
  });
  const {
    domNode: text3,
    isIntersecting: isViewingText3,
    isViewed: isViewedText3,
  } = useIntersectionObserver({
    rootMargin: ROOT_MARGIN,
    threshold: THRESHOLD,
  });

  const progressBarCategory = useMemo(() => {
    if (bikeCategory === 'eBikes') {
      if (!bikeSubCategory) return null;

      return bikeSubCategory;
    }

    return bikeCategory;
  }, [bikeCategory, bikeSubCategory]);

  const { scrollYProgress } = useScroll({
    axis: 'y',
    offset: ['start start', '0 -0.15'],
    target: isRefMounted ? moduleRef : undefined,
  });

  const clipPathDesktop = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(8vh 7vh)', 'inset(0vh 0vh)'],
  );

  const clipPathMobile = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(4vh 3vh)', 'inset(0vh 0vh)'],
  );

  const clipPath = isTabletOrAbove ? clipPathDesktop : clipPathMobile;
  const buttonOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // No Category was selected
  if (!bikeCategory || !progressBarCategory) return null;

  return (
    <ModuleWrapper
      anchorTarget={anchorTarget}
      className={classNames(styles.component, styles[bikeCategory])}
      color={color}
    >
      {/* div is created as a separated wrapper for having two layers of sticky containers */}
      <div ref={setModuleNode} className={styles.container}>
        <div ref={stickyContainer} className={styles.sticky}>
          <motion.div className={styles.clippedContainer} style={{ clipPath }}>
            <div className={styles.masked}>
              <div className={styles.overlay} />
              {videoPayload && (
                <Video
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
                />
              )}
              {imageObject && !video && (
                <Image
                  alt={imageObject.alt}
                  className={styles.video}
                  fill
                  imageObject={imageObject}
                />
              )}
              <MotionFade initMotion={isViewed} speed="speed-verySlow">
                <div className={styles.progressWrapper}>
                  {isTabletOrAbove && isRefMounted && (
                    <React.Fragment>
                      <StorytellingTrackIcon
                        className={classNames(styles.backLayerTrack)}
                        name={progressBarCategory}
                      />
                      <StorytellingTrackIcon
                        className={classNames(styles.progressTrack)}
                        gradient={true}
                        id={desktopPathId}
                        moduleRef={moduleRef}
                        name={progressBarCategory}
                      />
                    </React.Fragment>
                  )}
                  {!isTabletOrAbove && isRefMounted && (
                    <React.Fragment>
                      <StorytellingTrackIcon
                        className={classNames(styles.backLayerTrack)}
                        isMobile={true}
                        moduleRef={moduleRef}
                        name={progressBarCategory}
                      />
                      <StorytellingTrackIcon
                        className={classNames(styles.progressTrack)}
                        gradient={true}
                        id={mobilePathId}
                        isMobile
                        moduleRef={moduleRef}
                        name={progressBarCategory}
                      />
                    </React.Fragment>
                  )}
                </div>
              </MotionFade>
            </div>
          </motion.div>
        </div>

        <div className={styles.textWrapper}>
          <Row className={styles.textRow}>
            <Column
              width={{
                mobile: 12,
                smallLaptop: 6,
                tablet: 7,
              }}
            >
              <div>
                {textElements?.map(
                  (
                    { textElementChoice, bodyText, headerText, doRecut },
                    index,
                  ) => {
                    const observerIsViewed =
                      index === 0
                        ? isViewedText1
                        : index === 1
                          ? isViewedText2
                          : isViewedText3;
                    const observerIsViewing =
                      index === 0
                        ? isViewingText1
                        : index === 1
                          ? isViewingText2
                          : isViewingText3;
                    const transitionCondition =
                      index === 0
                        ? observerIsViewing || !isViewingModule
                        : observerIsViewing;

                    return (
                      <div
                        key={index}
                        ref={index === 0 ? text1 : index === 1 ? text2 : text3}
                        className={styles.textElement}
                      >
                        <MotionFade
                          initMotion={
                            (observerIsViewed && isViewed) || isButtonFocused
                          }
                          speed="speed-slow"
                          transition={transitionCondition ? 'in' : 'out'}
                        >
                          <div>
                            {textElementChoice === 1 && (
                              <div className={styles.gradientContainer}>
                                <Typography
                                  className={styles.gradientText}
                                  doRecut={doRecut}
                                  tag="h2"
                                  tagStyle="displayXLarge"
                                >
                                  {headerText}
                                </Typography>
                              </div>
                            )}
                            {textElementChoice === 2 && (
                              <Typography
                                className={styles.gradientText}
                                doRecut={doRecut}
                                tag="h2"
                                tagStyle="displaySmall"
                              >
                                {headerText}
                              </Typography>
                            )}
                            {textElementChoice === 3 && (
                              <div className={styles.paragraphContainer}>
                                <Typography
                                  tag="h3"
                                  tagStyle="bodyXLarge"
                                  weight="bold"
                                >
                                  {headerText}
                                </Typography>
                                <Typography tag="p" tagStyle="bodyLarge">
                                  {bodyText}
                                </Typography>
                                {index === textElements.length - 1 &&
                                  button?.[0] && (
                                    <Button
                                      link={button[0].link}
                                      text={button[0].link?.linkText}
                                      variant="Secondary"
                                    />
                                  )}
                              </div>
                            )}
                          </div>
                        </MotionFade>
                      </div>
                    );
                  },
                )}
                {/* This is used to push content, so we it is visible */}
                <div className={styles.textElement}></div>
              </div>
            </Column>
          </Row>
        </div>
        {video && !hasNoVideoProfile && (
          <div className={styles.videoContainer}>
            <motion.div
              className={styles.videButtonStickyContainer}
              style={{ clipPath, opacity: buttonOpacity }}
              whileFocus={{ opacity: 1 }}
            >
              <MotionFade
                initMotion={isViewed || isButtonFocused}
                speed="speed-verySlow"
              >
                <Button
                  aria-label={t(
                    isPlaying
                      ? 'video.pauseDecorative'
                      : 'video.playDecorative',
                  )}
                  className={styles.toggleVideo}
                  innerClassName={styles.videoButton}
                  leftIcon={isPlaying ? 'Pause_16' : 'Play_16'}
                  onBlur={() => setIsButtonFocused(false)}
                  onClick={() => {
                    setVideoManuallyStopped(!videoRef.current?.paused);
                  }}
                  onFocus={() => setIsButtonFocused(true)}
                  variant="Tertiary"
                />
              </MotionFade>
            </motion.div>
          </div>
        )}
      </div>
    </ModuleWrapper>
  );
};

Storytelling.displayName = 'Storytelling';

export default Storytelling;
