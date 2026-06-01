import React, { RefObject } from 'react';
import Image from 'components/atoms/image/image';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';

export interface StatsBackgroundImageProps {
  backgroundImageHasEntered: boolean;
  backgroundImageObject?: AmplienceImagePayload;
  backgroundImageRef: RefObject<HTMLDivElement | null>;
  styles: Readonly<Record<string, string>>;
}

const StatsBackgroundImage = ({
  backgroundImageHasEntered,
  backgroundImageObject,
  backgroundImageRef,
  styles,
}: StatsBackgroundImageProps) => (
  <div ref={backgroundImageRef} className={styles.backgroundImageContainer}>
    <MotionSlide direction="up" initMotion={backgroundImageHasEntered}>
      <Image
        alt={backgroundImageObject?.alt}
        className={styles.image}
        fill
        imageObject={backgroundImageObject}
        maxFillWidth={767}
        sizes="(max-width: 767px) 100vw, (max-width: 1440px) 50vw, 33vw"
      />
    </MotionSlide>
  </div>
);

export default StatsBackgroundImage;
