import classNames from 'classnames';
import { useI18n } from 'next-localization';
import React, { useRef, useState } from 'react';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Video from 'components/atoms/video/video';
import Button from 'components/molecules/button/button';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import Row from 'components/utilities/row/row';
import {
  AmplienceImagePayload,
  AmplienceMediaPayload,
} from 'integrations/content/amplience/types/content-types';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import ButtonList, { ButtonListProps } from '../button-list/button-list';
import styles from './paragraph-with-media.module.scss';

export interface ParagraphWithMediaProps extends ModuleWrapperProps {
  backgroundImageObject: AmplienceImagePayload;
  buttonGroup?: ButtonListProps['buttons'];
  foregroundMedia?: AmplienceMediaPayload[];
  mediaPlacement: 'Left' | 'Right';
  paragraphText: string;
  title: string;
}

const INTERSECTION_OPTIONS = { rootMargin: '0% 0% -10% 0%' };

const ParagraphWithMedia = ({
  anchorTarget,
  backgroundImageObject,
  buttonGroup,
  color,
  foregroundMedia,
  mediaPlacement = 'Right',
  paragraphText,
  title,
}: ParagraphWithMediaProps) => {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasNoVideoProfile, setHasNoVideoProfile] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [videoManuallyStopped, setVideoManuallyStopped] = useState<
    boolean | null
  >(null);
  const video = foregroundMedia?.[0]?.video && foregroundMedia[0].video;
  const videoAltText = foregroundMedia?.[0]?.altText;
  const imageObject = foregroundMedia?.[0]?.image && foregroundMedia[0].image;

  // Observers
  const { domNode: titleRef, isViewed: titleInView } =
    useIntersectionObserver(INTERSECTION_OPTIONS);
  const { domNode: bodyTextRef, isViewed: bodyTextInView } =
    useIntersectionObserver(INTERSECTION_OPTIONS);
  const { domNode: buttonsRef, isViewed: buttonsInView } =
    useIntersectionObserver(INTERSECTION_OPTIONS);

  const buttonVariant = (index: number) => {
    // If there is more than one button in the group and the button is the first one, it is the primary button
    if (index === 0) {
      return 'Primary';
    }

    return 'Secondary';
  };

  return (
    <ModuleWrapper
      anchorTarget={anchorTarget}
      className={styles.component}
      color={color}
      data-testid="module-wrapper"
    >
      <Container className={styles.container}>
        <Row
          className={classNames(styles.row, {
            [styles.revertRowOrder]: mediaPlacement === 'Left',
          })}
          classNameOuter={styles.rowOuter}
          data-testid={mediaPlacement === 'Left' ? 'revert-row-order' : ''}
          outerGutter={{ mobile: 'medium', tablet: 'none' }}
        >
          <Column
            className={styles.mediaColumn}
            offset={{ smallLaptop: mediaPlacement === 'Right' ? 1 : 0 }}
            width={{ laptop: 6, smallLaptop: 5 }}
          >
            {(video || imageObject?.diImage?.image || imageObject?.staticSrc) && (
              <ParallaxWrapper
                className={styles.primaryMediaContainer}
                observerOffset={'startEndToEndStart'}
                translateYStartEnd={'15vhTo-15vh'}
              >
                {video && (
                  <div className={styles.videoContainer}>
                    {!hasNoVideoProfile && (
                      <Button
                        aria-label={
                          videoPlaying ? t('video.pause') : t('video.play')
                        }
                        innerClassName={styles.videoButton}
                        onClick={() => {
                          setVideoManuallyStopped(!videoRef.current?.paused);
                        }}
                        rightIcon={videoPlaying ? 'Pause_24' : 'Play_24'}
                        variant="Tertiary"
                      />
                    )}
                    <Video
                      ref={videoRef}
                      altText={videoAltText}
                      autoPlay
                      className={styles.video}
                      data-testid="video-player"
                      loop
                      manuallyPaused={videoManuallyStopped}
                      noVideoProfileCallback={() => setHasNoVideoProfile(true)}
                      onPause={() => {
                        setVideoPlaying(false);
                      }}
                      onPlay={() => {
                        setVideoPlaying(true);
                      }}
                      playsInline={true}
                      videoObject={video}
                      videoProfileLabel="High"
                    />
                  </div>
                )}
                {imageObject && (
                  <Image
                    alt={imageObject?.alt}
                    className={styles.image}
                    fill
                    imageObject={imageObject}
                    {...generateImageSizes(10, 10, 5, 5, 5)}
                  />
                )}
              </ParallaxWrapper>
            )}
            <div className={styles.backgroundImageContainer}>
              {(imageObject || video) && (
                <div
                  className={styles.backgroundOverlay}
                  data-testid="background-overlay"
                />
              )}
              <Image
                alt={backgroundImageObject?.alt}
                className={styles.image}
                fill
                imageObject={backgroundImageObject}
                {...generateImageSizes(10, 10, 5, 5, 5)}
              />
            </div>
          </Column>
          <Column
            className={styles.textColumn}
            offset={{ tablet: 1 }}
            width={{ laptop: 4, smallLaptop: 5, tablet: 10 }}
          >
            <div className={styles.textWrapper}>
              <MotionSlide direction="up" initMotion={titleInView}>
                <Typography ref={titleRef} tag="h2" tagStyle="displayMedium">
                  {title}
                </Typography>
              </MotionSlide>

              {!!paragraphText && (
                <MotionSlide direction="up" initMotion={bodyTextInView}>
                  <Typography ref={bodyTextRef} tag="p" tagStyle="bodyMedium">
                    {paragraphText}
                  </Typography>
                </MotionSlide>
              )}
              <MotionSlide direction="up" initMotion={buttonsInView}>
                <ButtonList
                  ref={buttonsRef}
                  buttons={
                    buttonGroup?.map((button, index) => ({
                      ...button,
                      style: buttonVariant(index),
                    })) as ButtonListProps['buttons']
                  }
                  className={styles.buttonGroup}
                />
              </MotionSlide>
            </div>
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

ParagraphWithMedia.displayName = 'ParagraphWithMedia';

export default ParagraphWithMedia;
