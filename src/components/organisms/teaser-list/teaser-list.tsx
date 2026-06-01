import classNames from 'classnames';
import { useI18n } from 'next-localization';
import { useEffect, useState } from 'react';
import ControlButtonArrow from 'components/atoms/control-buttons/arrow/arrow';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
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
import TeaserListElement, {
  TeaserListElementProps,
} from './teaser-list-element/teaser-list-element';
import styles from './teaser-list.module.scss';

const STACKED_CARDS_PER_ROW_TABLET = 2;
const STACKED_CARDS_PER_ROW_SMALL_LAPTOP = 3;
const STACKED_CARDS_PER_ROW_LAPTOP = 4;

export interface TeaserListProps extends ModuleWrapperProps {
  button?: [BaseLink];
  displayMode?: 'stack' | 'slide';
  hideArrows?: boolean;
  nonInteractive?: boolean;
  teaserElements: TeaserListElementProps['teaserElement'][];
  title?: string;
}

const ContentTeaser = ({
  anchorTarget,
  button,
  color,
  displayMode = 'slide',
  hideArrows = false,
  nonInteractive = false,
  teaserElements,
  title,
}: TeaserListProps) => {
  const { t } = useI18n();
  const [activeHoverIndex, setActiveHoverIndex] = useState<
    number | undefined
  >();

  // start handle breakpoint
  const [elementsAreWrapping, setElementsAreWrapping] = useState(false);
  const { isDesktopView, breakpoint } = useBreakpoints();

  useEffect(() => {
    const checkIfWrapping = () => {
      switch (breakpoint) {
        case 'tablet':
          setElementsAreWrapping(
            teaserElements?.length > STACKED_CARDS_PER_ROW_TABLET,
          );
          break;

        case 'smallLaptop':
          setElementsAreWrapping(
            teaserElements?.length > STACKED_CARDS_PER_ROW_SMALL_LAPTOP,
          );

          break;

        case 'laptop':
          setElementsAreWrapping(
            teaserElements?.length > STACKED_CARDS_PER_ROW_LAPTOP,
          );

          break;

        default:
          setElementsAreWrapping(true);
      }
    };

    displayMode === 'stack' && checkIfWrapping(); // only check if elements are wrapping if display mode is stack
  }, [breakpoint, displayMode, teaserElements?.length]);

  // end handle breakpoint

  // start reveal animation triggers
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
  // end reveal animation triggers

  // start implement slider
  const [[canScrollPrev, canScrollNext], setCanScroll] = useState<boolean[]>([
    false,
    false,
  ]);
  const [emblaRef, emblaApi] = useSlider(
    {
      accessibility: {
        onUpdateAria: (api, currentSlide, totalSlides) => {
          const currentIndex = api.selectedScrollSnap();
          const teaser =
            teaserElements?.[currentIndex % (teaserElements?.length ?? 1)];
          const parts = [
            t('global.progressSentence', {
              currentSlide,
              totalSlides,
            }),
          ];
          if (teaser?.teaserHeadline) parts.push(teaser.teaserHeadline);
          if (teaser?.teaserTags?.length)
            parts.push(teaser.teaserTags.join(', '));
          return parts.filter(Boolean).join('. ');
        },
        skipAriaHidden: true,
        totalSlides: teaserElements?.length,
      },
      progress: {
        onProgress: (_, api) =>
          setCanScroll([api.canScrollPrev(), api.canScrollNext()]),
      },
    },
    {
      dragFree: true,
      loop: false,
    },
  );

  // end implement slider

  // start element render logic

  const renderArrows =
    !hideArrows &&
    displayMode === 'slide' &&
    isDesktopView &&
    (canScrollPrev || canScrollNext);

  const renderHeaderRow = !!title || button?.[0] || renderArrows;

  // end element render logic
  if (teaserElements?.length < 3) return null;

  return (
    <ModuleWrapper
      ref={titleNode}
      anchorTarget={anchorTarget}
      className={styles.component}
      color={color}
    >
      <Container>
        {renderHeaderRow && (
          <div ref={titleNode}>
            <MotionSlide direction={'up'} initMotion={titleIsViewed}>
              <Row
                className={styles.headContainer}
                outerGutter={{
                  mobile: 'medium',
                  smallLaptop: 'none',
                  tablet: 'medium',
                }}
              >
                <Column
                  className={styles.headlineColumn}
                  offset={{ smallLaptop: 1 }}
                  width={{ smallLaptop: 5 }}
                >
                  <Typography tag="h2" tagStyle="displayXSmall" weight="heavy">
                    {title}
                  </Typography>
                </Column>
                {(renderArrows || button?.[0]) && (
                  <Column
                    className={styles.buttonColumn}
                    width={{ smallLaptop: 5 }}
                  >
                    {button?.[0] && (
                      <Button
                        className={styles.buttonContainer}
                        link={button[0]}
                        target={button[0]?.target}
                        text={button[0]?.linkText}
                        variant="Secondary"
                      />
                    )}
                    {renderArrows && (
                      <div className={styles.arrows}>
                        <ControlButtonArrow
                          disabled={!canScrollPrev}
                          iconName="ArrowLeft_32"
                          label={t('global.previous')}
                          onClick={emblaApi?.scrollPrev}
                        />
                        <ControlButtonArrow
                          disabled={!canScrollNext}
                          iconName="ArrowRight_32"
                          label={t('global.next')}
                          onClick={emblaApi?.scrollNext}
                        />
                      </div>
                    )}
                  </Column>
                )}
              </Row>
            </MotionSlide>
          </div>
        )}
        <div
          ref={cardsNode}
          aria-label={
            title
              ? t('carouselRegion.withTitle', { title })
              : t('carouselRegion.teaserList')
          }
          role="region"
        >
          <MotionSlide direction={'up'} initMotion={cardsIsViewed}>
            {displayMode === 'slide' ? (
              <div ref={emblaRef} className={styles.slider}>
                <div className={styles.container}>
                  {teaserElements?.map((teaserElement, index) => (
                    <Column
                      key={`teaser-${index}`}
                      aria-label={t('global.progressSentence', {
                        currentSlide: index + 1,
                        totalSlides: teaserElements.length,
                      })}
                      className={styles.teaserElementInSlider}
                      role="group"
                      width={{
                        laptop: teaserElements.length === 3 ? 4 : 3,
                        smallLaptop: 4,
                      }}
                    >
                      <TeaserListElement
                        className={classNames(
                          !nonInteractive && styles.cardTransition,
                          !nonInteractive && activeHoverIndex !== undefined && {
                            [styles.hovered]: activeHoverIndex === index,
                            [styles.prevSibling]:
                              activeHoverIndex === index - 1,
                            [styles.nextSibling]:
                              activeHoverIndex === index + 1,
                          },
                        )}
                        isHovered={!nonInteractive && activeHoverIndex === index}
                        nonInteractive={nonInteractive}
                        onMouseEnterCallback={nonInteractive ? undefined : () => {
                          setActiveHoverIndex(index);
                        }}
                        onMouseLeaveCallback={nonInteractive ? undefined : () =>
                          setActiveHoverIndex(undefined)
                        }
                        teaserElement={teaserElement}
                      />
                    </Column>
                  ))}
                </div>
              </div>
            ) : (
              <Row>
                {teaserElements?.map((teaserElement, index) => (
                  <Column
                    key={`teaser-${index}`}
                    aria-label={t('global.progressSentence', {
                      currentSlide: index + 1,
                      totalSlides: teaserElements.length,
                    })}
                    className={classNames(styles.teaserElementInStack, {
                      [styles.wrapping]: elementsAreWrapping,
                    })}
                    role="group"
                    width={{
                      laptop: teaserElements.length === 3 ? 4 : 3,
                      smallLaptop: 4,
                      tablet: 6,
                    }}
                  >
                    <TeaserListElement
                      className={classNames(
                        !nonInteractive && styles.cardTransition,
                        !nonInteractive && activeHoverIndex !== undefined &&
                          !elementsAreWrapping && {
                            [styles.hovered]: activeHoverIndex === index,
                            [styles.prevSibling]:
                              activeHoverIndex === index - 1,
                            [styles.nextSibling]:
                              activeHoverIndex === index + 1,
                          },
                      )}
                      isHovered={!nonInteractive && activeHoverIndex === index}
                      nonInteractive={nonInteractive}
                      onMouseEnterCallback={nonInteractive ? undefined : () => {
                        setActiveHoverIndex(index);
                      }}
                      onMouseLeaveCallback={nonInteractive ? undefined : () =>
                        setActiveHoverIndex(undefined)
                      }
                      teaserElement={teaserElement}
                    />
                  </Column>
                ))}
              </Row>
            )}
          </MotionSlide>
        </div>
      </Container>
    </ModuleWrapper>
  );
};

ContentTeaser.displayName = 'ContentTeaser';

export default ContentTeaser;
