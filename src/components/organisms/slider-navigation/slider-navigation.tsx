import classNames from 'classnames';
import { useI18n } from 'next-localization';
import React, { useEffect, useRef, useState } from 'react';
import ControlButtonArrow from 'components/atoms/control-buttons/arrow/arrow';
import ControlButtonPagination from 'components/atoms/control-buttons/pagination/pagination';
import Icon from 'components/atoms/icon/icon';
import useBreakpoints from 'libraries/hooks/dom/use-breakpoints';
import { SliderApi, SliderLabels } from 'libraries/utilities/embla/embla.types';
import { SLIDER_FULLSCREEN_EVENT_NAME } from 'libraries/utilities/embla/plugins/slider-fullscreen';
import { SLIDER_PROGRESS_EVENT_NAME } from 'libraries/utilities/embla/plugins/slider-progress';
import styles from './slider-navigation.module.scss';

interface SliderNavigationProps {
  api: SliderApi;
  /** When true, applies a fix for the second slide: Next from first jumps to third when 3 slides are in view at laptop+ width */
  applySecondSlideFix?: boolean;
  children?: React.ReactNode;
  className?: string;
  isSliderWithParagraph?: boolean;
  labels?: SliderLabels;
  totalSlides?: number;
  /** When true, container is in flow and gets height from children; tab order: Prev → children (slider) → Next → Dots */
  wrapContent?: boolean;
}

const SliderNavigation = ({
  api,
  children,
  className,
  labels,
  totalSlides,
  isSliderWithParagraph = false,
  applySecondSlideFix = false,
  wrapContent = false,
}: SliderNavigationProps) => {
  const { t } = useI18n();
  const slideData = useRef<any>(undefined);
  const { isLaptopOrAbove, isTabletOrAbove } = useBreakpoints();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [[canScrollPrev, canScrollNext], setCanScroll] = useState<
    [boolean, boolean]
  >([false, false]);

  const slideCount = totalSlides || api.slideNodes().length;

  // Update slide progress, scroll state and fullscreen state
  useEffect(() => {
    if (!api) return;

    const updateSlide = () => {
      if (isSliderWithParagraph && isTabletOrAbove) {
        const currentIndex = api.selectedScrollSnap();
        setCurrentSlide(currentIndex);
      } else {
        const currentSlideIndex =
          api.getProgress?.() || api.selectedScrollSnap();

        setCurrentSlide(currentSlideIndex);
        const nodes = api.slideNodes();
        slideData.current = nodes[currentSlideIndex]?.dataset;
      }
      setCanScroll([api.canScrollPrev(), api.canScrollNext()]);
    };
    const updateFullscreen = () => {
      setIsFullscreen(api.getFullscreen?.() || false);
    };

    const slideEvent = api.getProgress ? SLIDER_PROGRESS_EVENT_NAME : 'select';
    api.on(slideEvent, updateSlide);
    api.on('init', updateSlide);
    api.on('resize', updateSlide);
    api.on(SLIDER_FULLSCREEN_EVENT_NAME, updateFullscreen);

    updateSlide();

    return () => {
      api.off(slideEvent, updateSlide);
      api.off('init', updateSlide);
      api.off('resize', updateSlide);
      api.off(SLIDER_FULLSCREEN_EVENT_NAME, updateFullscreen);
    };
  }, [api, isSliderWithParagraph, isTabletOrAbove]);

  return (
    <div
      className={classNames(styles.component, className, {
        [styles.wrapContent]: wrapContent,
      })}
    >
      {isTabletOrAbove && (
        <ControlButtonArrow
          className={styles.arrowLeft}
          iconName="ArrowLeft_32"
          label={labels?.goToPrevious ?? t('global.previous')}
          disabled={!canScrollPrev}
          onClick={() => {
            api.scrollPrev();
          }}
        />
      )}

      {children && <div className={styles.sliderSlot}>{children}</div>}

      {isTabletOrAbove && (
        <ControlButtonArrow
          className={styles.arrowRight}
          iconName="ArrowRight_32"
          label={labels?.goToNext ?? t('global.next')}
          disabled={!canScrollNext}
          onClick={() => {
            // ECOMDEV-299 skip the second slide only when exactly 3 slides are in view and on the first slide,
            // so the transition is noticeable (first slide is left-aligned so next would barely move)
            const slidesInViewCount = api.slidesInView().length;
            if (
              applySecondSlideFix &&
              isLaptopOrAbove &&
              currentSlide === 0 &&
              slideCount >= 3 &&
              slidesInViewCount === 3
            ) {
              api.scrollTo(2);
            } else {
              api.scrollNext();
            }
          }}
        />
      )}

      <ControlButtonPagination
        className={styles.pagination}
        current={currentSlide % slideCount}
        total={slideCount}
        onClick={(index) => {
          api.scrollTo(index);
        }}
      />

      {isFullscreen && (
        <button
          aria-label={labels?.closeFullscreen ?? t('global.closeFullscreen')}
          className={styles.close}
          onClick={api.exitFullscreen}
        >
          <Icon hidden className={styles.icon} name="Close_24" />
        </button>
      )}
    </div>
  );
};

SliderNavigation.displayName = 'SliderNavigation';

export default SliderNavigation;
