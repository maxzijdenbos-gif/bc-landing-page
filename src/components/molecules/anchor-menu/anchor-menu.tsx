import classNames from 'classnames';
import { useReducedMotion } from 'motion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import Row from 'components/utilities/row/row';
import { useMainNavigationContext } from 'libraries/contexts/main-navigation-context';
import useBreakpoints from 'libraries/hooks/dom/use-breakpoints';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import useWindowSize from 'libraries/hooks/dom/use-window-size';
import { throttle } from 'libraries/throttle';
import { isFirefox } from 'libraries/utilities/user-agent';
import AnchorMenuLinkItem, {
  ANCHOR_ID_POSTFIX,
  AnchorItem,
} from './anchor-menu-link-item';
import styles from './anchor-menu.module.scss';

export type { AnchorItem } from './anchor-menu-link-item';

export interface AnchorMenuProps {
  anchorList: AnchorItem[];
  className?: string;
  justifyItems?: 'end' | 'center';
  /** Adding this will set a negative top margin to pull the anchor menu into the top module */
  pullIntoTopElement?: boolean;
  /** The element on which the anchor menu is placed and must be on top of when halfing the background height. If left out, anchor menu will always have full background */
  topElement?: React.RefObject<HTMLElement | null>;
}

export const MIN_ANCHOR_ITEMS = 2;

const ROOT_MARGIN_PERCENTAGE = 50;
const INTERSECTION_BUFFER_HEIGHT = 10;
const SCROLL_MARGIN_EXTRA_WHEN_NO_PADDING = 64;

function elementHasNoTopPadding(el: HTMLElement): boolean {
  return parseFloat(getComputedStyle(el).paddingTop) === 0;
}

function shouldAddScrollMarginExtra(element: HTMLElement): boolean {
  if (!elementHasNoTopPadding(element)) return false;
  const firstChildDiv = Array.from(element.children).find(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child.tagName === 'DIV',
  );
  return firstChildDiv === undefined || elementHasNoTopPadding(firstChildDiv);
}

const AnchorMenu = ({
  anchorList,
  className,
  justifyItems = 'center',
  pullIntoTopElement,
  topElement,
}: AnchorMenuProps) => {
  // Start handle scroll within anchor menu and on page to set active element
  const anchorScrollContainer = useRef<HTMLDivElement>(null);
  const stickyTopBarRef = useRef<HTMLDivElement>(null);
  const activeAnchorItemRef = useRef<string | undefined>(undefined);

  const [isAnchorScrollAtStart, setIsAnchorScrollAtStart] = useState(true);
  const [isAnchorScrollAtEnd, setIsAnchorScrollAtEnd] = useState(false);
  const [anchorScrollHasOverflow, setAnchorScrollHasOverflow] = useState(false);
  const [activeAnchorItem, setActiveAnchorItem] = useState<string | undefined>(
    undefined,
  );

  const prefersReducedMotion = useReducedMotion();
  // ECOMDEV-550: Exception for Firefox, smooth not working correctly
  const scrollBehavior =
    prefersReducedMotion || isFirefox() ? 'auto' : 'smooth';

  useEffect(() => {
    if (!anchorList) return;

    const scrollActiveAnchorLinkIntoView = (activeAnchorItemId: string) => {
      const container = anchorScrollContainer.current;
      const activeAnchor = container?.querySelector<HTMLElement>(
        `[id^="${activeAnchorItemId}${ANCHOR_ID_POSTFIX}"]`,
      );
      if (!activeAnchor || !container) return;
      // scrollIntoView would jump the page back to the hero (sticky element's natural DOM
      // position is above the viewport once the user scrolls past it). Drive horizontal
      // scroll directly on the container instead.
      const containerRect = container.getBoundingClientRect();
      const anchorRect = activeAnchor.getBoundingClientRect();
      const targetScrollLeft =
        container.scrollLeft +
        anchorRect.left -
        containerRect.left -
        (containerRect.width - anchorRect.width) / 2;
      container.scrollTo({ left: targetScrollLeft, behavior: scrollBehavior });
    };

    const anchorPageElements = () => {
      // Assuming anchorList is always a valid HTML5 ID since we generate it ourselves.

      return document.querySelectorAll(
        anchorList
          .filter((item) => !!item?.anchorTarget?.length) // Filter non-filled. Shouldn't happen but it could?
          .map((item) => `#${item.anchorTarget}`) // Convert into IDs
          .join(', '), // Join IDs with commas.
      );
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).id;
        if (entry.isIntersecting) {
          if (id !== activeAnchorItemRef.current) {
            activeAnchorItemRef.current = id;
            setActiveAnchorItem(id);
            scrollActiveAnchorLinkIntoView(id);
          }
        } else if (id === activeAnchorItemRef.current) {
          activeAnchorItemRef.current = undefined;
          setActiveAnchorItem(undefined);
        }
      });
    };

    // Use a "trigger zone" (middle portion of viewport) so the section overlapping it is active.
    // Works when sections are taller than the viewport (e.g. mobile); threshold 1 would never fire.
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: `-${ROOT_MARGIN_PERCENTAGE}% 0px -${100 - ROOT_MARGIN_PERCENTAGE}% 0px`,
      threshold: 0,
    });

    setTimeout(() => {
      anchorPageElements().forEach((element) => {
        if (element) {
          observer.observe(element);
        }
      });
      // add top element to observer if it exists to unset first anchor link as being active when scrolling to top
      if (topElement?.current) observer.observe(topElement?.current);
    }, 1); // need to postpone in order for elements on page to be rendered

    return () => {
      observer.disconnect();
    };
    // activeAnchorItem intentionally excluded: including it would re-run the effect on every scroll
  }, [anchorList, topElement, scrollBehavior]);
  // End handle scroll within anchor menu and on page to set active element

  // Start handle anchor menu sticking
  const [isAnchorMenuSticking, setIsAnchorMenuSticking] = useState(false);
  const { isNavigationHidden } = useMainNavigationContext();
  const [doDoubleBackgroundHeight, setDoDoubleBackgroundHeight] =
    useState(false);

  const { isTabletOrAbove } = useBreakpoints();
  const { windowHeight } = useWindowSize();

  const defineRootMargin = useCallback(() => {
    if (!windowHeight) return '0px 0px 0px 0px';
    const navigationHeight =
      parseFloat(
        isTabletOrAbove
          ? styles.mainNavigationDesktopHeight
          : styles.mainNavigationMobileHeight,
      ) * parseFloat(styles.remScale);

    if (isNavigationHidden) {
      // element must be above the viewport
      return `${navigationHeight}px 0px -100% 0px`;
    }

    // element must be inside the viewport but not further down than the navigation height
    return `-${navigationHeight}px 0px -${
      windowHeight + -1 * (navigationHeight + INTERSECTION_BUFFER_HEIGHT)
    }px 0px`;
  }, [isNavigationHidden, isTabletOrAbove, windowHeight]);

  const { domNode: nodeForStickyDetection, isIntersecting } =
    useIntersectionObserver({
      rootMargin: defineRootMargin(),
      threshold: 0.99,
    });

  useEffect(() => {
    setIsAnchorMenuSticking(!!isIntersecting);
  }, [isIntersecting, setIsAnchorMenuSticking]);

  // End handle anchor menu sticking

  // Start handle half background height
  const [topElementIsInView, setTopElementIsInView] = useState(false);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setTopElementIsInView(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: `0px 0px 0px 0px`,
      threshold: 0,
    });

    if (topElement?.current) observer.observe(topElement?.current);

    return () => {
      observer.disconnect();
    };
  }, [topElement]);

  useEffect(() => {
    // apply double background height when the top element is *not* in view and anchor menu is sticking
    if (!topElement) {
      setDoDoubleBackgroundHeight(false);
    } else {
      setDoDoubleBackgroundHeight(!topElementIsInView && isAnchorMenuSticking);
    }
  }, [
    isAnchorMenuSticking,
    isNavigationHidden,
    topElement,
    topElementIsInView,
  ]);
  // End handle half background height

  // }, [description, isExpanded]);

  // Throttled handler reads the container ref only when scroll/resize runs (not during render).
  /* eslint-disable react-hooks/refs -- stable throttle instance; ref read is deferred to event invocations */
  const anchorScrollHandlerThrottled = useRef(
    throttle(() => {
      const elem = anchorScrollContainer.current;
      if (!elem) return;

      const SCROLL_BOUND_OFFSET = 15;

      const hasOverflow = elem.scrollWidth > elem.clientWidth;
      setAnchorScrollHasOverflow(hasOverflow);
      setIsAnchorScrollAtStart(elem.scrollLeft <= SCROLL_BOUND_OFFSET);
      setIsAnchorScrollAtEnd(
        Math.ceil(elem.scrollLeft + elem.clientWidth) >=
          elem.scrollWidth - SCROLL_BOUND_OFFSET,
      );
    }, 50),
  ).current;
  /* eslint-enable react-hooks/refs */

  useEffect(() => {
    anchorScrollHandlerThrottled(null);
    window.addEventListener('resize', anchorScrollHandlerThrottled);
    return () =>
      window.removeEventListener('resize', anchorScrollHandlerThrottled);
  });

  // Scroll to anchor using native scrollIntoView; scroll-margin-top reserves space for sticky bar (and nav when scrolling up).
  const handleScrollTo = useCallback(
    (id: string) => {
      const element = document.getElementById(id);

      if (!element) return;

      // height of the sticky bar
      const stickyTopBarHeight = stickyTopBarRef.current?.offsetHeight ?? 0;
      // main navigation height
      const navHeight =
        document.querySelector<HTMLElement>('header nav')?.clientHeight ?? 0;
      const scrollDirection =
        element.offsetTop < window.scrollY ? 'up' : 'down';
      // add extra scroll margin for blocks that have no top padding (like FAQ)
      const extraWhenNoPadding = shouldAddScrollMarginExtra(element)
        ? SCROLL_MARGIN_EXTRA_WHEN_NO_PADDING
        : 0;
      // set the scroll top margin: the sticky bar (+ main navigation when scrolling up) (+ extra scroll margin if no padding)
      const scrollMarginTop =
        stickyTopBarHeight +
        (scrollDirection === 'up' ? navHeight : 0) +
        extraWhenNoPadding;
      element.style.scrollMarginTop = `${scrollMarginTop}px`;

      element.scrollIntoView({
        behavior: scrollBehavior,
        block: 'start',
        inline: 'nearest',
      });
    },
    [scrollBehavior],
  );

  if (anchorList?.length < MIN_ANCHOR_ITEMS) return null;

  return (
    <div
      className={classNames(styles.component, className, {
        [styles.mainNavigationIsHidden]: isNavigationHidden,
        [styles.doDoubleBackgroundHeight]: doDoubleBackgroundHeight,
        [styles.pullIntoTopElement]: pullIntoTopElement,
      })}
    >
      {/* Used to create a seamless css blur effect */}
      <div className={styles.backdrop}></div>
      <div ref={nodeForStickyDetection} />
      <Container>
        <div ref={stickyTopBarRef}>
          <Row classNameOuter={styles.stickyTopBarInner}>
            <Column
              className={classNames(styles.anchorMenu, {
                [styles.justifyEnd]: justifyItems === 'end',
              })}
            >
              {!!anchorList?.length && (
                <div
                  ref={anchorScrollContainer}
                  onScroll={anchorScrollHandlerThrottled}
                  className={styles.anchorMenuLinkWrapper}
                >
                  <div
                    className={classNames(styles.anchorMenuOverflowIndicator, {
                      [styles.anchorMenuHasOverflow]: anchorScrollHasOverflow,
                      [styles.anchorMenuHasScrollStart]: isAnchorScrollAtStart,
                      [styles.anchorMenuHasScrollEnd]: isAnchorScrollAtEnd,
                    })}
                  >
                    <ul className={styles.anchorMenuLinkList}>
                      {anchorList.map((item) => (
                        <AnchorMenuLinkItem
                          key={`${item.anchorTarget}-${item.anchorTitle}`}
                          isActive={activeAnchorItem === item.anchorTarget}
                          item={item}
                          onScrollTo={handleScrollTo}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Column>
          </Row>
        </div>
      </Container>
    </div>
  );
};

AnchorMenu.displayName = 'AnchorMenu';
export default AnchorMenu;
