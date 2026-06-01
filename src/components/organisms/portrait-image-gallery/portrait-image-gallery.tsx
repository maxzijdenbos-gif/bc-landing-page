import { useI18n } from 'next-localization';
import { useMemo, useRef } from 'react';
import React from 'react';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import SliderNavigation from 'components/organisms/slider-navigation/slider-navigation';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import useSlider from 'libraries/hooks/use-slider';
import useSliderTracking from 'libraries/hooks/use-slider-tracking';
import styles from './portrait-image-gallery.module.scss';

export interface PortraitImageGalleryProps extends ModuleWrapperProps {
  imageElements?: { imageObject: AmplienceImagePayload }[];
  title?: string;
}

export const PortraitImageGallery = ({
  anchorTarget,
  id,
  imageElements,
  title,
  color,
}: PortraitImageGalleryProps) => {
  const startAnimation = useRef<CallableFunction>(undefined);
  const rootNode = useRef<HTMLDivElement>(null);
  const { domNode: animationTrigger, isViewed } = useIntersectionObserver({
    onIntersect: ({ isIntersecting }) => {
      if (!startAnimation.current || !isIntersecting) return;

      startAnimation.current();
    },
    threshold: 0,
    unObserveOnThreshold: 0,
  });

  const { t } = useI18n();

  const [emblaRef, emblaApi] = useSlider(
    {
      accessibility: {
        onUpdateAria: (api, currentSlide, totalSlides) => {
          const currentIndex = api.selectedScrollSnap();
          const imageAlt =
            imageElements?.[currentIndex % (imageElements?.length ?? 1)]
              ?.imageObject?.alt;
          const parts = [
            t('global.progressSentence', {
              currentSlide,
              totalSlides,
            }),
          ];
          if (imageAlt) parts.push(imageAlt);
          return parts.filter(Boolean).join('. ');
        },
        totalSlides: imageElements?.length,
      },
      animationDepth: {
        doStartAnimation: () => {
          return typeof startAnimation.current === 'undefined';
        },
        onInit: (startAnimationFunction) =>
          (startAnimation.current = startAnimationFunction),
      },
    },
    {
      loop: true,
      skipSnaps: true,
    },
  );

  // In order to support really big screens and not enough elements to cover the screen for the loop to work, we have to duplicate the content unfortunately. This is an Embla Carousel limitation.
  const slides = useMemo(
    () =>
      imageElements
        ? [...imageElements, ...imageElements, ...imageElements]
        : [],
    [imageElements],
  );

  useSliderTracking(title, emblaApi);

  return (
    <ModuleWrapper
      ref={rootNode}
      anchorTarget={anchorTarget}
      className={styles.component}
      color={color}
      id={id}
    >
      <MotionSlide direction="up" initMotion={isViewed}>
        <Typography
          className={styles.headline}
          tag="h2"
          tagStyle="displayXSmall"
          weight="heavy"
        >
          {title}
        </Typography>
      </MotionSlide>
      <div
        aria-label={
          title
            ? t('carouselRegion.withTitle', { title })
            : t('carouselRegion.portraitImageGallery')
        }
        role="region"
      >
        <div ref={emblaRef} className={styles.slider}>
          <div className={styles.container}>
            {slides?.map(({ imageObject }, index) => {
              const total = imageElements?.length ?? 0;
              const logicalIndex = index % total || 0;
              return (
                <div
                  key={index}
                  aria-label={
                    total > 0
                      ? t('global.progressSentence', {
                          currentSlide: logicalIndex + 1,
                          totalSlides: total,
                        })
                      : undefined
                  }
                  className={styles.slide}
                  role="group"
                >
                  <div className={styles.slideContainer}>
                    <div className={styles.imageContainer}>
                      <Image
                        alt={imageObject.alt || ''}
                        className={styles.image}
                        fill
                        imageObject={imageObject}
                        {...generateImageSizes(10, 12 / 3, 3, 3, 3)}
                      />
                    </div>
                    {index === 0 && (
                      <div
                        ref={animationTrigger}
                        className={styles.animationTrigger}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {emblaApi && (
            <SliderNavigation
              api={emblaApi}
              totalSlides={imageElements?.length || 0}
              labels={{
                goToNext: t('portraitImageGallery.nextImage'),
                goToPrevious: t('portraitImageGallery.previousImage'),
              }}
            />
          )}
        </div>
      </div>
    </ModuleWrapper>
  );
};

PortraitImageGallery.displayName = 'PortraitImageGallery';

export default PortraitImageGallery;
