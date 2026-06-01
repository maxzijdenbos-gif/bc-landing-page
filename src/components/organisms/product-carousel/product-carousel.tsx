import classNames from 'classnames';
import { useI18n } from 'next-localization';
import { useCallback, useRef, useState } from 'react';
import React from 'react';
import Typography from 'components/atoms/typography/typography';
import SliderNavigation from 'components/organisms/slider-navigation/slider-navigation';
import Column from 'components/utilities/column/column';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import Row from 'components/utilities/row/row';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import useSlider from 'libraries/hooks/use-slider';
import useSliderTracking from 'libraries/hooks/use-slider-tracking';
import ProductSeriesCarouselSlide from './product-carousel-slide/product-carousel-slide';
import styles from './product-carousel.module.scss';

export interface ProductSeriesElement {
  description?: string;
  imageObject?: AmplienceImagePayload;
  productHeadline?: string;
  titleLink?: [BaseLink];
}

export interface ProductCarouselProps extends ModuleWrapperProps {
  headline?: string;
  productSeriesElements?: ProductSeriesElement[];
}

const ANIMATION_DURATION = 500;
const SLIDER_IMAGE_CLASS_ANIMATION = 'product-category-slide-image';

export const ProductCarousel = ({
  anchorTarget,
  color,
  headline,
  id,
  productSeriesElements: productElements,
}: ProductCarouselProps) => {
  const slides = productElements;

  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeSlideData, setActiveSlideData] = useState(
    slides?.[activeSlideIndex],
  );
  const [isHidden, setIsHidden] = useState(false);
  const { t } = useI18n();

  const { domNode, isViewed } = useIntersectionObserver({
    rootMargin: '-30% 0% -30% 0%',
    unObserveOnThreshold: 0.2,
  });

  const onProgress = useCallback(
    (index: number) => {
      setIsHidden(true);
      setActiveSlideIndex(index);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setActiveSlideData(slides?.[index]);
        setIsHidden(false);
      }, ANIMATION_DURATION);
    },
    [slides],
  );

  const isInInfiniteMode = slides?.length && slides?.length > 2;

  const [emblaRef, emblaApi] = useSlider(
    {
      accessibility: {
        onPressEnter: () => {
          (
            overlayRef.current?.querySelector('[data-action-target]') as
              | HTMLButtonElement
              | undefined
          )?.click();
        },
        onUpdateAria: (api, currentSlide, totalSlides) => {
          const currentIndex = api.selectedScrollSnap();

          const slide = slides?.[currentIndex];

          const sentences = [
            t('productSeriesCarousel.progressSentence', {
              currentSlide,
              totalSlides,
            }),
          ];

          if (!slide) return sentences.join('. ');

          if (slide.imageObject?.alt) sentences.push(slide.imageObject.alt);

          if (slide.titleLink?.[0].linkText)
            sentences.push(
              t('productSeriesCarousel.linkNarration', {
                linkText: slide.titleLink?.[0].linkText,
              }),
            );

          if (slide.description) sentences.push(slide.description);

          return sentences.join('. ');
        },
        singleSlideOnly: true,
      },
      animationScale: {
        elementSelectorToScale: `.${SLIDER_IMAGE_CLASS_ANIMATION}`,
      },
      progress: { onProgress },
    },
    {
      align: 'center',
      containScroll: isInInfiniteMode ? undefined : false,
      duration: 35,
      loop: isInInfiniteMode ? true : false,
    },
  );

  useSliderTracking(headline, emblaApi);

  return (
    <ModuleWrapper
      anchorTarget={anchorTarget}
      className={styles.component}
      color={color}
      id={id}
    >
      <div
        ref={domNode}
        className={classNames(styles.sliderWrapper, {
          [styles.noSlider]: slides?.length && slides?.length === 1,
        })}
      >
        <MotionSlide
          direction="left-right"
          initMotion={isViewed}
          speed="speed-verySlow"
        >
          <Row
            className={styles.headline}
            outerGutter={{
              mobile: 'medium',
              smallLaptop: 'none',
              tablet: 'medium',
            }}
          >
            <Column
              offset={{ laptop: 2, smallLaptop: 1 }}
              width={{ laptop: 8, smallLaptop: 10 }}
            >
              <Typography tagStyle="displaySmall">{headline}</Typography>
            </Column>
          </Row>
        </MotionSlide>
        <MotionSlide direction="up" initMotion={isViewed} speed="speed-slow">
          <div
            aria-label={
              headline
                ? t('carouselRegion.withTitle', { title: headline })
                : t('carouselRegion.product')
            }
            role="region"
          >
            {slides && emblaApi && slides.length > 1 ? (
              <SliderNavigation
                api={emblaApi}
                labels={{
                  goToNext: t('productSeriesCarousel.nextImage'),
                  goToPrevious: t('productSeriesCarousel.previousImage'),
                }}
                wrapContent
              >
                <div className={styles.background} />
                <div
                  ref={slides?.length > 1 ? emblaRef : undefined}
                  className={styles.slider}
                >
                  <div className={styles.container}>
                    {slides?.map((slideProps, index) => (
                      <ProductSeriesCarouselSlide
                        {...slideProps}
                        aria-label={t(
                          'productSeriesCarousel.progressSentence',
                          {
                            currentSlide: index + 1,
                            totalSlides: slides.length,
                          },
                        )}
                        key={index}
                        initAnimation={isViewed}
                        lastItem={index === slides.length - 1}
                        role="group"
                        scaleSelectorClassName={SLIDER_IMAGE_CLASS_ANIMATION}
                        secondItem={index === 1}
                      />
                    ))}
                  </div>
                </div>
                <div
                  ref={overlayRef}
                  className={classNames(
                    styles.foreground,
                    isHidden && styles.isHidden,
                  )}
                >
                  {activeSlideData && (
                    <ProductSeriesCarouselSlide
                      {...activeSlideData}
                      isOverlay
                      scaleSelectorClassName={SLIDER_IMAGE_CLASS_ANIMATION}
                    />
                  )}
                </div>
              </SliderNavigation>
            ) : (
              <React.Fragment>
                <div className={styles.background} />
                {slides && (
                  <div ref={emblaRef} className={styles.slider}>
                    <div className={styles.container}>
                      {slides?.map((slideProps, index) => (
                        <ProductSeriesCarouselSlide
                          {...slideProps}
                          aria-label={t(
                            'productSeriesCarousel.progressSentence',
                            {
                              currentSlide: index + 1,
                              totalSlides: slides.length,
                            },
                          )}
                          key={index}
                          initAnimation={isViewed}
                          lastItem={index === slides.length - 1}
                          role="group"
                          scaleSelectorClassName={SLIDER_IMAGE_CLASS_ANIMATION}
                          secondItem={index === 1}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div
                  ref={overlayRef}
                  className={classNames(
                    styles.foreground,
                    isHidden && styles.isHidden,
                  )}
                >
                  {activeSlideData && (
                    <ProductSeriesCarouselSlide
                      {...activeSlideData}
                      isOverlay
                      scaleSelectorClassName={SLIDER_IMAGE_CLASS_ANIMATION}
                    />
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </MotionSlide>
      </div>
    </ModuleWrapper>
  );
};

ProductCarousel.displayName = 'ProductCarousel';

export default ProductCarousel;
