import classNames from 'classnames';
import { useI18n } from 'next-localization';
import { useCallback, useEffect, useState } from 'react';
import ControlButtonArrow from 'components/atoms/control-buttons/arrow/arrow';
import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import Row from 'components/utilities/row/row';
import useBreakpoints from 'libraries/hooks/dom/use-breakpoints';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import useSlider from 'libraries/hooks/use-slider';
import { SliderApi } from 'libraries/utilities/embla/embla.types';
import EntryCard, { EntryCardProps } from './entry-card/entry-card';
import styles from './entry-cards-list.module.scss';

export interface EntryCardsListProps extends ModuleWrapperProps {
  cardVariant: EntryCardProps['cardVariant'];
  entryCards: Omit<EntryCardProps, 'totalCards'>[];
  mobileBehavior: 'stack' | 'slide';
  title: string;
}

const MIN_CARDS_FOR_DESKTOP_SLIDER = 5;
const NUMBER_OF_CARDS_FOR_SMALLLAPTOP_STACKING = 4;

const EntryCardsList = ({
  anchorTarget,
  color,
  cardVariant,
  entryCards,
  mobileBehavior,
  title,
  ...rest
}: EntryCardsListProps) => {
  const { t } = useI18n();
  const [activeHoverIndex, setActiveHoverIndex] = useState<
    number | undefined
  >();
  const [[canScrollPrev, canScrollNext], setCanScroll] = useState<boolean[]>([
    false,
    false,
  ]);

  // Intersection Observers for animations
  const { domNode: cardsNode, isViewed: cardsIsViewed } =
    useIntersectionObserver({
      rootMargin: '-10% 0% -10% 0%',
      unObserveOnThreshold: 0,
    });
  const { domNode: titleNode, isViewed: titleIsViewed } =
    useIntersectionObserver({
      rootMargin: '-10% 0% -10% 0%',
      unObserveOnThreshold: 0,
    });

  // Responsive state checks
  const { isTabletOrAbove, isBelowDesktopView } = useBreakpoints();
  const isSmallLaptop = isTabletOrAbove && isBelowDesktopView;
  const renderAsSlider =
    (!isTabletOrAbove && mobileBehavior === 'slide') ||
    (isTabletOrAbove && entryCards?.length >= MIN_CARDS_FOR_DESKTOP_SLIDER);

  const stackCardsOnSmallLaptop =
    entryCards?.length === NUMBER_OF_CARDS_FOR_SMALLLAPTOP_STACKING &&
    isSmallLaptop;

  const applyMobileStacking = !isTabletOrAbove && mobileBehavior !== 'slide';

  // Initialize slider at the top level
  const sliderConfig = {
    accessibility: {
      onUpdateAria: (
        _: SliderApi,
        currentSlide: number,
        totalSlides: number,
      ) => {
        const currentIndex = currentSlide - 1;
        const card = entryCards?.[currentIndex];
        const parts = [
          t('global.progressSentence', {
            currentSlide,
            totalSlides,
          }),
        ];
        if (card?.headline) parts.push(card.headline);
        else if (card?.rangeLogoReference?.[0]?.rangeIconsName)
          parts.push(card.rangeLogoReference[0].rangeIconsName);
        return parts.filter(Boolean).join('. ');
      },
      skipAriaHidden: true,
      totalSlides: entryCards?.length ?? 0,
    },
    progress: {
      onProgress: (_: number, api: SliderApi) => {
        setCanScroll([api.canScrollPrev(), api.canScrollNext()]);
      },
    },
  };
  const sliderOptions = { dragFree: true, loop: false };
  const [emblaRef, emblaApi] = useSlider(sliderConfig, sliderOptions);

  // Update scroll state when slider becomes visible
  useEffect(() => {
    if (cardsIsViewed && emblaApi) {
      queueMicrotask(() =>
        setCanScroll([emblaApi.canScrollPrev(), emblaApi.canScrollNext()]),
      );
    }
  }, [cardsIsViewed, emblaApi]);

  // Compute column width and offsets
  const doColumnWidthAndOffset = useCallback(
    (index: number) => {
      let width = {};
      let offset = {};

      if (mobileBehavior === 'stack') {
        width = { tablet: 6 };
      }
      if (stackCardsOnSmallLaptop) {
        width = { smallLaptop: 6 };
      }
      if (entryCards.length === 2) {
        width = { smallLaptop: 5, tablet: 6 };
        if (index === 0) {
          offset = { smallLaptop: 1 };
        }
      }

      return { offset, width };
    },
    [entryCards, mobileBehavior, stackCardsOnSmallLaptop],
  );

  return (
    <ModuleWrapper
      {...rest}
      anchorTarget={anchorTarget}
      className={styles.component}
      color={color}
    >
      <Container className={styles.container}>
        <MotionSlide direction="up" initMotion={titleIsViewed}>
          <Row
            outerGutter={{
              mobile: 'medium',
              smallLaptop: 'none',
              tablet: 'medium',
            }}
          >
            <Column
              className={styles.headlineColumn}
              offset={{ smallLaptop: 1 }}
              width={{ smallLaptop: 6, tablet: 7 }}
            >
              <Typography
                ref={titleNode}
                tag="h2"
                tagStyle="displayXSmall"
                weight="heavy"
              >
                {title}
              </Typography>
            </Column>
            {renderAsSlider &&
              isTabletOrAbove &&
              (canScrollPrev || canScrollNext) && (
                <Column
                  className={styles.arrows}
                  width={{ smallLaptop: 4, tablet: 5 }}
                >
                  <ControlButtonArrow
                    className={styles.arrow}
                    disabled={!canScrollPrev}
                    iconName="ArrowLeft_32"
                    label={t('global.previous')}
                    onClick={emblaApi?.scrollPrev}
                  />
                  <ControlButtonArrow
                    className={styles.arrow}
                    disabled={!canScrollNext}
                    iconName="ArrowRight_32"
                    label={t('global.next')}
                    onClick={emblaApi?.scrollNext}
                  />
                </Column>
              )}
          </Row>
        </MotionSlide>
        <MotionSlide direction="up" initMotion={cardsIsViewed}>
          <div
            ref={cardsNode}
            aria-label={
              title
                ? t('carouselRegion.withTitle', { title })
                : t('carouselRegion.entryCards')
            }
            role="region"
          >
            {renderAsSlider ? (
              <div ref={emblaRef} className={styles.slider}>
                <div className={styles.sliderElementContainer}>
                  {entryCards?.map(
                    (
                      {
                        backgroundImageObject,
                        button,
                        headline,
                        rangeLogoReference,
                      },
                      index,
                    ) => (
                      <Column
                        key={index}
                        aria-label={t('global.progressSentence', {
                          currentSlide: index + 1,
                          totalSlides: entryCards?.length ?? 0,
                        })}
                        className={styles.entryCardColumn}
                        role="group"
                        width={{ laptop: 3, smallLaptop: 4, tablet: 6 }}
                      >
                        <EntryCard
                          key={index}
                          backgroundImageObject={backgroundImageObject}
                          button={button}
                          cardVariant={cardVariant}
                          className={classNames(styles.cardTransition, {
                            [styles.hovered]: activeHoverIndex === index,
                            [styles.prevSibling]:
                              activeHoverIndex === index - 1,
                            [styles.nextSibling]:
                              activeHoverIndex === index + 1,
                          })}
                          headline={headline}
                          onMouseEnterCallback={() =>
                            setActiveHoverIndex(index)
                          }
                          onMouseLeaveCallback={() =>
                            setActiveHoverIndex(undefined)
                          }
                          rangeLogoReference={rangeLogoReference}
                          totalCards={entryCards.length}
                        />
                      </Column>
                    ),
                  )}
                </div>
              </div>
            ) : (
              <Row className={styles.row}>
                {entryCards?.map((entryCard, index) => (
                  <Column
                    key={index}
                    aria-label={t('global.progressSentence', {
                      currentSlide: index + 1,
                      totalSlides: entryCards?.length ?? 0,
                    })}
                    className={classNames(styles.column, {
                      [styles.stackCardsOnMobile]: applyMobileStacking,
                      [styles.stackCardsOnSmallLaptop]: stackCardsOnSmallLaptop,
                    })}
                    role="group"
                    {...doColumnWidthAndOffset(index)}
                  >
                    <EntryCard
                      backgroundImageObject={entryCard.backgroundImageObject}
                      button={entryCard.button}
                      cardVariant={cardVariant}
                      className={classNames(
                        styles.cardTransition,
                        activeHoverIndex !== undefined && {
                          [styles.hovered]: activeHoverIndex === index,
                          [styles.prevSibling]: activeHoverIndex === index - 1,
                          [styles.nextSibling]: activeHoverIndex === index + 1,
                        },
                      )}
                      headline={entryCard.headline}
                      onMouseEnterCallback={() => {
                        if (!applyMobileStacking && !stackCardsOnSmallLaptop) {
                          setActiveHoverIndex(index);
                        }
                      }}
                      onMouseLeaveCallback={() =>
                        setActiveHoverIndex(undefined)
                      }
                      rangeLogoReference={entryCard.rangeLogoReference}
                      totalCards={entryCards.length}
                    />
                  </Column>
                ))}
              </Row>
            )}
          </div>
        </MotionSlide>
      </Container>
    </ModuleWrapper>
  );
};

EntryCardsList.displayName = 'EntryCardsList';
export default EntryCardsList;
