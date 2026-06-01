import classNames from 'classnames';
import { useI18n } from 'next-localization';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import SliderNavigation from 'components/organisms/slider-navigation/slider-navigation';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import Link from 'components/utilities/link/link';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import Row from 'components/utilities/row/row';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import { trackCardModuleClick } from 'integrations/tracking/google-tag-manager/scripts';
import useBreakpoints from 'libraries/hooks/dom/use-breakpoints';
import { useMultilineEllipsis } from 'libraries/hooks/use-multi-line-ellipsis';
import useSlider from 'libraries/hooks/use-slider';
import useSliderTracking from 'libraries/hooks/use-slider-tracking';
import { SliderApi } from 'libraries/utilities/embla/embla.types';
import SliderPerspective from 'libraries/utilities/embla/plugins/slider-perspective';
import { SLIDER_PROGRESS_EVENT_NAME } from 'libraries/utilities/embla/plugins/slider-progress';
import { getImageObjectUrl } from '../../../libraries/utilities/social-meta-tags';
import styles from './entry-cards-slider-with-paragraph.module.scss';

export interface EntryCardSlideProps extends ModuleWrapperProps {
  api?: SliderApi;
  imageBottomTag: string;
  imageObject?: AmplienceImagePayload;
  imageTitleTag: string;
  index?: number;
  isParagraph?: boolean;
  linkObject?: [BaseLink];
  totalSlides?: number;
}

export interface EntryCardsSliderWithParagraphProps extends ModuleWrapperProps {
  paragraph?: string;
  sliderElements?: EntryCardSlideProps[];
  title?: string;
}

const EntryCardSlide = ({
  api,
  imageBottomTag,
  imageObject,
  imageTitleTag,
  index = 0,
  isParagraph,
  linkObject,
  totalSlides = 0,
}: EntryCardSlideProps) => {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { ref: paragraphRef, text: clampedText } = useMultilineEllipsis({
    lineClamp: 2,
    text: imageBottomTag,
  });

  const onClick = () => {
    if (!ref.current || !api) return;

    if (ref.current.getAttribute('data-distance') === 'true') {
      api.scrollTo(index);
    }
  };

  const content = (
    <React.Fragment>
      {imageObject && (
        <Image
          alt=""
          className={styles.image}
          height="500"
          src={getImageObjectUrl(imageObject, 500, 500)}
          width="500"
        />
      )}
      <Typography className={styles.headline} tagStyle="displaySmall">
        {imageTitleTag}
      </Typography>
      <Typography
        className={styles.paragraph}
        tagStyle="bodyMedium"
        weight={!isParagraph ? 'semiBold' : undefined}
      >
        {isParagraph ? (
          imageBottomTag
        ) : (
          <span ref={paragraphRef}>{clampedText}</span>
        )}
      </Typography>
    </React.Fragment>
  );

  return (
    <div
      ref={ref}
      aria-label={
        totalSlides > 0
          ? t('global.progressSentence', {
              currentSlide: index + 1,
              totalSlides,
            })
          : undefined
      }
      className={classNames(
        styles.slide,
        isParagraph ? styles.isParagraph : styles.isSlide,
      )}
      role="group"
    >
      <div
        className={styles.contentWrapper}
        onClick={onClick}
        role="presentation"
      >
        {isParagraph ? (
          <div className={styles.content}>{content}</div>
        ) : (
          <Link
            className={styles.content}
            link={linkObject?.[0]}
            trackOnClick={(_, clickUrl) =>
              trackCardModuleClick({
                cardType: 'entry-cards-slider-with-paragraph',
                clickUrl: clickUrl,
                title: imageTitleTag,
              })
            }
          >
            {content}
          </Link>
        )}
      </div>
    </div>
  );
};

const EntryCardsSliderWithParagraph = ({
  paragraph,
  sliderElements,
  title,
  ...rest
}: EntryCardsSliderWithParagraphProps) => {
  const { isTabletOrAbove } = useBreakpoints();
  const [totalSlides, setTotalSlides] = useState(
    sliderElements ? sliderElements.length + (isTabletOrAbove ? 1 : 0) : 0,
  );
  const { t } = useI18n();
  const [emblaRef, emblaApi] = useSlider(
    {
      accessibility: {
        onPressEnter: (api) => {
          const index = api.selectedScrollSnap();
          const slide = api.slideNodes()[index];
          const link = slide.querySelector('a');
          link?.click?.();
        },
        onUpdateAria: (_, current, total) => {
          const lines = [];
          const hasFalseSlide = sliderElements?.length !== total;
          if (sliderElements?.length) {
            lines.push(
              t('global.progressSentence', {
                currentSlide: current,
                totalSlides: total,
              }),
            );
          }
          if (hasFalseSlide && current === 1) {
            lines.push(title);
            lines.push(paragraph);
          } else {
            const slideInFocus =
              sliderElements?.[current - (hasFalseSlide ? 2 : 1)];
            if (slideInFocus) {
              lines.push(slideInFocus.imageTitleTag);
              lines.push(slideInFocus.imageBottomTag);
            }
          }
          return lines.length ? lines.join('. ') : '';
        },
        singleSlideOnly: true,
      },
    },
    { dragFree: true },
    [SliderPerspective()],
  );

  useSliderTracking(title?.toLowerCase(), emblaApi);

  // update slide progress — include paragraph slide in total when on tablet+
  useEffect(() => {
    if (!emblaApi) return;

    const setTotal = () => {
      if (sliderElements) {
        setTotalSlides(sliderElements.length + (isTabletOrAbove ? 1 : 0));
      }
    };

    setTotal();
    emblaApi.on(
      emblaApi.getProgress ? SLIDER_PROGRESS_EVENT_NAME : 'select',
      setTotal,
    );

    return () => {
      emblaApi.off(SLIDER_PROGRESS_EVENT_NAME, setTotal);
    };
  }, [emblaApi, isTabletOrAbove, sliderElements]);

  return (
    <ModuleWrapper {...rest} className={styles.component}>
      <ParallaxWrapper
        minOpacity={0}
        observerOffset={'startEndStartCenter'}
        translateYStartEnd={'15vhTo0vh'}
      >
        <Container>
          <Row outerGutter={{ mobile: 'medium', tablet: 'medium' }}>
            <Column>
              {!isTabletOrAbove && emblaApi && (
                <React.Fragment>
                  <Typography
                    className={styles.headline}
                    tag="h1"
                    tagStyle="displaySmall"
                  >
                    {title}
                  </Typography>
                  <Typography
                    className={styles.paragraph}
                    tag="p"
                    tagStyle="bodyMedium"
                  >
                    {paragraph}
                  </Typography>
                </React.Fragment>
              )}
              <div
                aria-label={
                  title
                    ? t('carouselRegion.withTitle', { title })
                    : t('carouselRegion.entryCardsSlider')
                }
                role="region"
              >
                {emblaApi ? (
                  <SliderNavigation
                    api={emblaApi}
                    isSliderWithParagraph
                    labels={{
                      goToNext: t('portraitImageGallery.nextImage'),
                      goToPrevious: t('portraitImageGallery.previousImage'),
                    }}
                    applySecondSlideFix
                    totalSlides={totalSlides}
                    wrapContent
                  >
                    <div ref={emblaRef} className={styles.slider}>
                      <div className={styles.container}>
                        {isTabletOrAbove && (
                          <EntryCardSlide
                            api={emblaApi}
                            imageBottomTag={paragraph || ''}
                            imageTitleTag={title || ''}
                            index={0}
                            isParagraph
                            totalSlides={
                              (sliderElements?.length ?? 0) +
                              (isTabletOrAbove ? 1 : 0)
                            }
                          />
                        )}
                        {emblaApi &&
                          sliderElements?.map((itemProps, index) => {
                            const slideIndex =
                              (isTabletOrAbove ? 1 : 0) + index;
                            return (
                              <EntryCardSlide
                                key={`slide-${index}`}
                                api={emblaApi}
                                index={slideIndex}
                                totalSlides={
                                  (sliderElements?.length ?? 0) +
                                  (isTabletOrAbove ? 1 : 0)
                                }
                                {...itemProps}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </SliderNavigation>
                ) : (
                  <div ref={emblaRef} className={styles.slider}>
                    <div className={styles.container}>
                      {isTabletOrAbove && (
                        <EntryCardSlide
                          imageBottomTag={paragraph || ''}
                          imageTitleTag={title || ''}
                          index={0}
                          isParagraph
                          totalSlides={
                            (sliderElements?.length ?? 0) +
                            (isTabletOrAbove ? 1 : 0)
                          }
                        />
                      )}
                      {sliderElements?.map((itemProps, index) => {
                        const slideIndex = (isTabletOrAbove ? 1 : 0) + index;
                        return (
                          <EntryCardSlide
                            key={`slide-${index}`}
                            index={slideIndex}
                            totalSlides={
                              (sliderElements?.length ?? 0) +
                              (isTabletOrAbove ? 1 : 0)
                            }
                            {...itemProps}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </Column>
          </Row>
        </Container>
      </ParallaxWrapper>
    </ModuleWrapper>
  );
};

EntryCardsSliderWithParagraph.displayName = 'EntryCardsSliderWithParagraph';

export default EntryCardsSliderWithParagraph;
