import { useI18n } from 'next-localization';
import React, { useRef, useState } from 'react';
import Image from 'components/atoms/image/image';
import Video from 'components/atoms/video/video';
import Button from 'components/molecules/button/button';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import { AmplienceMediaPayload } from 'integrations/content/amplience/types/content-types';

export interface StatsMainMediaProps {
  backgroundImageHasEntered: boolean;
  foregroundMedia?: AmplienceMediaPayload[];
  styles: Readonly<Record<string, string>>;
}

const StatsMainMedia = ({
  backgroundImageHasEntered,
  foregroundMedia,
  styles,
}: StatsMainMediaProps) => {
  const { t } = useI18n();
  const [hasNoVideoProfile, setHasNoVideoProfile] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [videoManuallyStopped, setVideoManuallyStopped] = useState<
    boolean | null
  >(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mainImageObject =
    foregroundMedia?.[0]?.image && foregroundMedia[0].image;
  const video = foregroundMedia?.[0]?.video && foregroundMedia[0].video;
  const videoAltText = foregroundMedia?.[0]?.altText;

  return (
    <ParallaxWrapper
      className={styles.mainMediaContainer}
      observerOffset="startEndToEndStart"
      translateYStartEnd="15vhTo-15vh"
    >
      {video && (
        <div className={styles.videoContainer}>
          <MotionSlide
            className={styles.mainMediaMotionSlide}
            delay="speed-short"
            direction="up"
            initMotion={backgroundImageHasEntered}
          >
            <div className={styles.mainMediaMotionSlide}>
              {!hasNoVideoProfile && (
                <Button
                  aria-label={videoPlaying ? t('video.pause') : t('video.play')}
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
                loop
                manuallyPaused={videoManuallyStopped}
                noVideoProfileCallback={() => setHasNoVideoProfile(true)}
                onPause={() => setVideoPlaying(false)}
                onPlay={() => setVideoPlaying(true)}
                playsInline
                videoObject={video}
                videoProfileLabel="High"
              />
            </div>
          </MotionSlide>
        </div>
      )}
      {mainImageObject && !video && (
        <MotionSlide
          className={styles.mainMediaMotionSlide}
          delay="speed-short"
          direction="up"
          initMotion={backgroundImageHasEntered}
        >
          <Image
            alt={mainImageObject?.alt}
            className={styles.image}
            fill
            imageObject={mainImageObject}
            maxFillWidth={767}
            sizes="(max-width: 767px) 100vw, (max-width: 1440px) 50vw, 33vw"
          />
        </MotionSlide>
      )}
    </ParallaxWrapper>
  );
};

export default StatsMainMedia;
