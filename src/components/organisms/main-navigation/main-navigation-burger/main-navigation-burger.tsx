import classNames from 'classnames';
import { useI18n } from 'next-localization';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'components/atoms/icon/icon';
import Typography from 'components/atoms/typography/typography';
import CrossBrandNavigation from 'components/organisms/cross-brand-navigation/cross-brand-navigation';
import { MainNavigationProps } from 'components/organisms/main-navigation/main-navigation';
import FocusTrap from 'components/utilities/focus-trap/focus-trap';
import Link from 'components/utilities/link/link';
import { NavigationHierarchyNode } from 'integrations/content/amplience/endpoints/navigation/navigation.types';
import { trackNavigationClick } from 'integrations/tracking/google-tag-manager/scripts';
import MainNavigationLink from '../main-navigation-link/main-navigation-link';
import MainNavigationLogo from '../main-navigation-logo/main-navigation-logo';
import MainNavigationPrimaryButton from '../main-navigation-primary-link/main-navigation-primary-link';
import BurgerDrawerContent from './burger-drawer-content/burger-drawer-content';
import styles from './main-navigation-burger.module.scss';

export type MainNavigationBurgerProps = Omit<
  MainNavigationProps,
  'navigationLinks'
> & {
  chosenNavigationChildId?: string;
  chosenNavigationParentId?: string;
  currentDepth: number;
  currentPathId?: string;
  handleDepth: (newLevel: number) => void;
  handleDepthLinkClick: (
    navigationLink: NavigationHierarchyNode,
    newLevel: number,
    options?: { viaKeyboard?: boolean },
  ) => void;
  isAboveTablet: boolean;
  menuOpen: boolean;
  menuOpenedViaKeyboard?: boolean;
  navigationLinks: Record<string, NodeContainer<NavigationHierarchyNode>>;
  onReady?: () => void;
  openedFromDesktopNav?: boolean;
  toggleMenuDrawer: (options?: {
    forceTopLevel?: boolean;
    openedViaKeyboard?: boolean;
    triggerElement?: HTMLElement | null;
    usedCloseButton?: boolean;
  }) => void;
  topLevelDeliveryId: string;
};

const MainNavigationBurger = ({
  chosenNavigationChildId,
  chosenNavigationParentId,
  crossBrandLinks,
  currentDepth,
  currentPathId,
  handleDepth,
  handleDepthLinkClick,
  isAboveTablet,
  menuOpen,
  menuOpenedViaKeyboard = false,
  openedFromDesktopNav = false,
  navigationLinks,
  onReady,
  profileLinks,
  supportLinks,
  toggleMenuDrawer,
  topLevelDeliveryId,
}: MainNavigationBurgerProps) => {
  const { t } = useI18n();
  const drawerOneStickyLinks = useRef<HTMLDivElement>(null);
  const drawerTwoTopRef = useRef<HTMLDivElement>(null);
  const drawerTwoCloseButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(
    null,
  );
  const drawerOneBackButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(
    null,
  );
  const currentActiveDrawerOneContent = useRef<HTMLDivElement>(null);
  const currentActiveDrawerTwoContent = useRef<HTMLDivElement>(null);
  const drawerOneFirstListRef = useRef<HTMLUListElement>(null);
  const focusAreaRef = useRef<HTMLDivElement>(null);

  const [drawerOneIsScrolled, setDrawerOneIsScrolled] = useState(false);
  const [drawerTwoIsScrolled, setDrawerTwoIsScrolled] = useState(false);
  const [currentlyDisplayedDrawerId, setCurrentlyDisplayedDrawerId] = useState<
    string | undefined
  >(undefined);

  const effectiveDisplayedDrawerId =
    currentDepth === 1 && menuOpen && !chosenNavigationParentId
      ? topLevelDeliveryId
      : currentlyDisplayedDrawerId;

  const topLevelChildren = navigationLinks?.[topLevelDeliveryId]?.children;
  const hasTopLevelChildren = !!topLevelChildren?.length;

  // Auto-focus when opened via keyboard, or when opened from desktop nav (so Tab moves focus into drawer).
  // When opened with mouse from burger only, do not focus so Safari doesn't show the ring; first Tab will then focus the first item.
  const focusThisRefOnReset =
    (currentDepth === 1 && menuOpenedViaKeyboard && drawerOneFirstListRef) ||
    (currentDepth === 2 &&
      (menuOpenedViaKeyboard || openedFromDesktopNav) &&
      currentActiveDrawerOneContent) ||
    (currentDepth === 3 &&
      menuOpenedViaKeyboard &&
      isAboveTablet &&
      drawerTwoCloseButtonRef) ||
    (currentDepth === 3 &&
      menuOpenedViaKeyboard &&
      !isAboveTablet &&
      drawerOneBackButtonRef) ||
    undefined;

  const mainNavMobile = 'main-nav-mobile';

  useEffect(() => {
    if (currentDepth !== 1) return;
    requestAnimationFrame(() => {
      const el = currentActiveDrawerOneContent.current;
      if (!el) return;
      el.style.setProperty('transform', 'translateX(0)');
    });
  }, [currentDepth]);

  const onDrawerOneScroll = (e?: any) => {
    setDrawerOneIsScrolled(!!e.target.scrollTop);
  };
  const onDrawerTwoScroll = (e?: any) => {
    setDrawerTwoIsScrolled(!!e.target.scrollTop);
  };

  const removeHiddenLinks = (
    items: NodeContainer<NavigationHierarchyNode>[],
  ) => {
    return items?.filter(
      ({ content: link }) => !link.hideNode && !link.hideAsHighlighted,
    );
  };

  const handleTransitionEnd = (id: string) => {
    const shouldUseTopLevel = currentDepth === 1 && !chosenNavigationParentId;
    setCurrentlyDisplayedDrawerId(shouldUseTopLevel ? topLevelDeliveryId : id);
  };

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <FocusTrap
      focusAreaRef={focusAreaRef}
      focusThisRefOnReset={focusThisRefOnReset}
      resetEventsValue={[effectiveDisplayedDrawerId, menuOpen]}
    >
      <div ref={focusAreaRef} className={styles.component}>
        <div
          aria-hidden={!menuOpen ? true : undefined}
          aria-label={menuOpen ? t('navigation.mainMenu') : undefined}
          aria-modal={menuOpen ? true : undefined}
          inert={!menuOpen ? true : undefined}
          className={classNames(styles.burgerDrawer, styles.burgerDrawerOne)}
          onScroll={onDrawerOneScroll}
          data-testid="menubar"
          role="dialog"
        >
          <div
            className={classNames(styles.drawerTop, {
              [styles.doScrollState]: drawerOneIsScrolled && currentDepth === 1,
            })}
          >
            <Link
              {...(currentDepth > 1
                ? { 'aria-hidden': true }
                : { 'aria-label': t('navigation.backToHomepage') })}
              className={classNames(
                styles.logo,
                currentDepth > 1 && styles.hide,
              )}
              link={{ internalLink: '/' }}
              onClick={() => {
                toggleMenuDrawer();
              }}
              tabIndex={currentDepth === 1 ? 1 : -1}
            >
              <MainNavigationLogo ariaHidden />
            </Link>
            <Link
              ref={drawerOneBackButtonRef}
              aria-label={t('navigation.backToMainMenu')}
              className={classNames(
                styles.backButton,
                currentDepth < 2 && styles.hide,
              )}
              onClick={() => {
                handleDepth(1);
              }}
              tabIndex={currentDepth === 1 ? 1 : currentDepth >= 1 ? 0 : -1}
            >
              <Icon name="ArrowLeft_24" hidden />
            </Link>
            <Link
              aria-label={t('navigation.closeMenu')}
              className={classNames(styles.menuCloseButton, {
                [styles.hide]: currentDepth > 2,
              })}
              onClick={() => toggleMenuDrawer({ usedCloseButton: true })}
              tabIndex={currentDepth === 1 ? 1 : currentDepth <= 3 ? 0 : -1}
            >
              <Icon name="Close_24" hidden />
            </Link>
          </div>

          <div className={styles.drawerBody}>
            {/* DEPTH 1 START */}
            {hasTopLevelChildren && (
              <BurgerDrawerContent
                ref={
                  currentDepth === 1 ? currentActiveDrawerOneContent : undefined
                }
                doDisplay={currentDepth === 1}
                onTransitionEndCallback={handleTransitionEnd}
                prepareDisplay={currentDepth === 3 && isAboveTablet}
                uuid={topLevelDeliveryId}
              >
                <div className={styles.scrollableContent}>
                  <ul ref={drawerOneFirstListRef} className={styles.linkList}>
                    {removeHiddenLinks(topLevelChildren ?? []).map(
                      ({ content: link }) => (
                        <MainNavigationPrimaryButton
                          key={link._meta?.deliveryId}
                          isTabbable={
                            effectiveDisplayedDrawerId === topLevelDeliveryId
                          }
                          link={link}
                          onClick={(opts) => {
                            handleDepthLinkClick(
                              link,
                              (currentDepth ?? 0) + 1,
                              opts,
                            );
                            trackNavigationClick({
                              clickText: link.title,
                              title: 'burger menu',
                              title1: 'n/a',
                            });
                          }}
                          onLinkClick={() => {
                            toggleMenuDrawer({ usedCloseButton: true });
                            trackNavigationClick({
                              clickText: link.title,
                              title: 'burger menu',
                              title1: 'n/a',
                            });
                          }}
                        />
                      ),
                    )}
                    {supportLinks?.map((link, index) => (
                      <MainNavigationLink
                        key={index}
                        className={
                          index === 0 ? styles.linkListGroupStart : undefined
                        }
                        isCurrentPathId={
                          !!currentPathId &&
                          currentPathId === link?.internalLinkRef?.[0]?.id
                        }
                        isTabbable={currentDepth === 1}
                        link={link}
                        onClick={() =>
                          trackNavigationClick({
                            clickText: link.linkText,
                            title: 'burger menu',
                            title1: 'n/a',
                          })
                        }
                        toggleMenuDrawer={toggleMenuDrawer}
                      />
                    ))}
                    {profileLinks?.map((link, index) => (
                      <MainNavigationLink
                        key={index}
                        className={
                          index === 0 ? styles.linkListGroupStart : undefined
                        }
                        isCurrentPathId={
                          !!currentPathId &&
                          currentPathId === link?.internalLinkRef?.[0]?.id
                        }
                        isTabbable={currentDepth === 1}
                        link={link}
                        onClick={() =>
                          trackNavigationClick({
                            clickText: link.linkText,
                            title: 'burger menu',
                            title1: 'n/a',
                          })
                        }
                        toggleMenuDrawer={toggleMenuDrawer}
                      />
                    ))}
                    {crossBrandLinks && (
                      <CrossBrandNavigation
                        asListItems
                        brands={crossBrandLinks}
                        firstListItemClassName={classNames(
                          styles.linkListGroupStart,
                          styles.crossBrandGroupStart,
                        )}
                        lastListItemClassName={styles.crossBrandGroupEnd}
                      />
                    )}
                  </ul>
                </div>
              </BurgerDrawerContent>
            )}
            {/* DEPTH 1 END */}
            {/* DEPTH 2 START */}
            {Object.values(navigationLinks ?? {})?.map(
              (navigationLink, index) => {
                const doDisplay =
                  ((currentDepth > 1 && isAboveTablet) || currentDepth === 2) &&
                  navigationLink.content._meta.deliveryId ===
                    chosenNavigationParentId;

                const visibleHighlightedLinks =
                  navigationLink.content.highlightedLinks?.filter(
                    (link) => !link.hideNode,
                  ) ?? [];
                const hasHighlightedLinks = visibleHighlightedLinks.length > 0;

                const visibleNavigationLinks =
                  navigationLink.content.navigationLinks?.filter(
                    (link) => !link.hideNode,
                  ) ?? [];
                const hasNavigationLinks = visibleNavigationLinks.length > 0;

                const visibleChildren = removeHiddenLinks(
                  navigationLink.children ?? [],
                );
                const hasChildren = visibleChildren.length > 0;

                return (
                  <BurgerDrawerContent
                    key={navigationLink.content._meta.deliveryId}
                    ref={
                      currentDepth > 1 &&
                      navigationLink.content._meta.deliveryId ===
                        chosenNavigationParentId
                        ? currentActiveDrawerOneContent
                        : undefined
                    }
                    doDisplay={doDisplay}
                    onTransitionEndCallback={handleTransitionEnd}
                    prepareDisplay={currentDepth < 2 && menuOpen}
                    uuid={`d2-${
                      navigationLink.content?._meta?.deliveryId || index
                    }`}
                  >
                    <div
                      ref={doDisplay ? drawerOneStickyLinks : undefined}
                      className={classNames(styles.drawerContentFixed, {
                        [styles.doScrollState]: drawerOneIsScrolled,
                      })}
                    >
                      <Typography
                        tag="h2"
                        tagStyle="headlineLarge"
                        weight="bold"
                      >
                        {navigationLink.content.title}
                      </Typography>
                    </div>
                    <div
                      className={styles.scrollableContainer}
                      onScroll={onDrawerOneScroll}
                    >
                      <div className={styles.scrollableContent}>
                        {(hasHighlightedLinks ||
                          hasChildren ||
                          hasNavigationLinks) && (
                          <ul className={styles.linkList}>
                            {hasHighlightedLinks &&
                              visibleHighlightedLinks.map((link, index) => (
                                <MainNavigationLink
                                  key={`${link._meta.deliveryId}${index}`}
                                  className={
                                    index === 0
                                      ? styles.linkListGroupStart
                                      : undefined
                                  }
                                  isCurrentPathId={
                                    !!currentPathId &&
                                    currentPathId ===
                                      link.linkObject?.[0].internalLinkRef?.[0]
                                        ?.id
                                  }
                                  isHighlighted={true}
                                  isTabbable={
                                    ((currentDepth > 1 && isAboveTablet) ||
                                      currentDepth >= 2) &&
                                    (currentDepth === 3
                                      ? navigationLink.content._meta
                                          .deliveryId ===
                                        chosenNavigationParentId
                                      : navigationLink.content._meta
                                          .deliveryId ===
                                          currentlyDisplayedDrawerId ||
                                        !!navigationLink.children.find(
                                          ({ content: childItem }) =>
                                            childItem._meta.deliveryId ===
                                            currentlyDisplayedDrawerId,
                                        ))
                                  }
                                  link={link.linkObject?.[0]}
                                  onClick={() =>
                                    trackNavigationClick({
                                      clickText: link.linkObject?.[0]?.linkText,
                                      title: navigationLink.content.title,
                                      title1: 'n/a',
                                    })
                                  }
                                  toggleMenuDrawer={toggleMenuDrawer}
                                />
                              ))}
                            {hasChildren &&
                              visibleChildren.map(({ content: link }) => {
                                if (!link.navigationLinks) return;

                                return (
                                  <MainNavigationPrimaryButton
                                    key={link._meta.deliveryId}
                                    isTabbable={
                                      ((currentDepth > 1 && isAboveTablet) ||
                                        currentDepth >= 2) &&
                                      (currentDepth === 3
                                        ? navigationLink.content._meta
                                            .deliveryId ===
                                          chosenNavigationParentId
                                        : navigationLink.content._meta
                                            .deliveryId ===
                                            currentlyDisplayedDrawerId ||
                                          !!navigationLink.children.find(
                                            ({ content: childItem }) =>
                                              childItem._meta.deliveryId ===
                                              currentlyDisplayedDrawerId,
                                          ))
                                    }
                                    link={link}
                                    onClick={(opts) => {
                                      const nextDepth =
                                        currentDepth < 3
                                          ? (currentDepth ?? 0) + 1
                                          : currentDepth;

                                      handleDepthLinkClick(
                                        link,
                                        nextDepth,
                                        opts,
                                      );
                                      trackNavigationClick({
                                        clickText: link.title,
                                        title: navigationLink.content.title,
                                        title1: 'n/a',
                                      });
                                    }}
                                    onLinkClick={() => {
                                      toggleMenuDrawer({
                                        usedCloseButton: true,
                                      });
                                      trackNavigationClick({
                                        clickText: link.title,
                                        title: navigationLink.content.title,
                                        title1: 'n/a',
                                      });
                                    }}
                                    tagStyle={'headlineMedium'}
                                  />
                                );
                              })}
                            {hasNavigationLinks &&
                              visibleNavigationLinks.map((link, index) => (
                                <MainNavigationLink
                                  key={`${link._meta.deliveryId}${index}`}
                                  className={
                                    index === 0
                                      ? styles.linkListGroupStart
                                      : undefined
                                  }
                                  isCurrentPathId={
                                    !!currentPathId &&
                                    currentPathId ===
                                      link.linkObject?.[0]?.internalLinkRef?.[0]
                                        ?.id
                                  }
                                  isTabbable={
                                    ((currentDepth > 1 && isAboveTablet) ||
                                      currentDepth >= 2) &&
                                    (currentDepth === 3
                                      ? navigationLink.content._meta
                                          .deliveryId ===
                                        chosenNavigationParentId
                                      : navigationLink.content._meta
                                          .deliveryId ===
                                          currentlyDisplayedDrawerId ||
                                        !!navigationLink.children.find(
                                          ({ content: childItem }) =>
                                            childItem._meta.deliveryId ===
                                            currentlyDisplayedDrawerId,
                                        ))
                                  }
                                  link={link.linkObject?.[0]}
                                  onClick={() =>
                                    trackNavigationClick({
                                      clickText: link.linkObject?.[0]?.linkText,
                                      title: navigationLink.content.title,
                                      title1: 'n/a',
                                    })
                                  }
                                  toggleMenuDrawer={toggleMenuDrawer}
                                />
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </BurgerDrawerContent>
                );
              },
            )}

            {/* DEPTH 2 END */}

            {/* DEPTH 3 (MOBILE) START */}
            {!isAboveTablet &&
              Object.values(navigationLinks ?? {})?.map((navigationLink) => {
                return navigationLink.children.map(
                  ({ content: item }, index) => {
                    const blueLinks = item?.navigationLinks?.filter(
                      (link) => link.blueLink,
                    );
                    const regularLinks = item?.navigationLinks?.filter(
                      (link) => !link.blueLink,
                    );
                    const visibleBlueLinks =
                      blueLinks?.filter((link) => !link.hideNode) ?? [];
                    const hasBlueLinks = visibleBlueLinks.length > 0;
                    const visibleRegularLinks =
                      regularLinks?.filter((link) => !link.hideNode) ?? [];
                    const hasRegularLinks = visibleRegularLinks.length > 0;

                    const doDisplay =
                      currentDepth === 3 &&
                      item._meta.deliveryId === chosenNavigationChildId;

                    return (
                      <BurgerDrawerContent
                        key={item._meta.deliveryId}
                        doDisplay={doDisplay}
                        onTransitionEndCallback={handleTransitionEnd}
                        prepareDisplay={currentDepth < 3 && menuOpen}
                        uuid={`${mainNavMobile}-${item._meta?.deliveryId ?? index}`}
                      >
                        <div
                          ref={doDisplay ? drawerOneStickyLinks : undefined}
                          className={classNames(styles.drawerContentFixed, {
                            [styles.doScrollState]: drawerOneIsScrolled,
                          })}
                        >
                          <Typography
                            tag="h3"
                            tagStyle="headlineLarge"
                            weight="bold"
                          >
                            {item.title}
                          </Typography>
                        </div>
                        <div
                          className={styles.scrollableContainer}
                          onScroll={onDrawerOneScroll}
                        >
                          <div className={styles.scrollableContent}>
                            {(hasBlueLinks || hasRegularLinks) && (
                              <ul className={styles.linkList}>
                                {hasBlueLinks &&
                                  visibleBlueLinks.map((link, index) => (
                                    <MainNavigationLink
                                      key={`${link._meta.deliveryId}${index}`}
                                      className={
                                        index === 0
                                          ? styles.linkListGroupStart
                                          : undefined
                                      }
                                      isCurrentPathId={
                                        !!currentPathId &&
                                        currentPathId ===
                                          link.linkObject?.[0]
                                            ?.internalLinkRef?.[0]?.id
                                      }
                                      isHighlighted={true}
                                      isTabbable={
                                        currentDepth === 3 &&
                                        currentlyDisplayedDrawerId ===
                                          `${mainNavMobile}-${item._meta?.deliveryId ?? index}`
                                      }
                                      link={link.linkObject?.[0]}
                                      onClick={() =>
                                        trackNavigationClick({
                                          clickText:
                                            link.linkObject?.[0]?.linkText,
                                          title: navigationLink.content.title,
                                          title1: item.title,
                                        })
                                      }
                                      toggleMenuDrawer={toggleMenuDrawer}
                                    />
                                  ))}
                                {hasRegularLinks &&
                                  visibleRegularLinks.map((link, index) => (
                                    <MainNavigationLink
                                      key={`${link._meta.deliveryId}${index}`}
                                      className={
                                        index === 0 && hasBlueLinks
                                          ? styles.linkListGroupStart
                                          : undefined
                                      }
                                      isCurrentPathId={
                                        !!currentPathId &&
                                        currentPathId ===
                                          link.linkObject?.[0]
                                            ?.internalLinkRef?.[0]?.id
                                      }
                                      isTabbable={
                                        currentlyDisplayedDrawerId ===
                                          `${mainNavMobile}-${item._meta?.deliveryId ?? index}` &&
                                        currentDepth === 3
                                      }
                                      link={link.linkObject?.[0]}
                                      onClick={() =>
                                        trackNavigationClick({
                                          clickText:
                                            link.linkObject?.[0]?.linkText,
                                          title: navigationLink.content.title,
                                          title1: item.title,
                                        })
                                      }
                                      toggleMenuDrawer={toggleMenuDrawer}
                                    />
                                  ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </BurgerDrawerContent>
                    );
                  },
                );
              })}
            {/* DEPTH 3 (MOBILE) END */}
          </div>
        </div>

        {/* DEPTH 3 (DESKTOP) START */}
        {isAboveTablet && (
          <div
            className={classNames(styles.burgerDrawer, styles.burgerDrawerTwo, {
              [styles.drawerTwoOpen]: currentDepth === 3,
            })}
          >
            <div ref={drawerTwoTopRef} className={classNames(styles.drawerTop)}>
              <Link
                ref={drawerTwoCloseButtonRef}
                aria-label={t('navigation.closeMenu')}
                className={styles.menuCloseButton}
                onClick={toggleMenuDrawer}
                tabIndex={currentDepth === 3 ? 0 : -1}
              >
                <Icon name="Close_24" hidden />
              </Link>
            </div>
            <div className={styles.drawerBody} onScroll={onDrawerTwoScroll}>
              {navigationLinks &&
                Object.values(navigationLinks ?? {}).map((navigationLink) =>
                  navigationLink.children.map(({ content: item }, index) => {
                    const blueLinks = item?.navigationLinks?.filter(
                      (link) => link.blueLink,
                    );
                    const regularLinks = item?.navigationLinks?.filter(
                      (link) => !link.blueLink,
                    );
                    const visibleBlueLinks =
                      blueLinks?.filter((link) => !link.hideNode) ?? [];
                    const hasBlueLinks = visibleBlueLinks.length > 0;
                    const visibleRegularLinks =
                      regularLinks?.filter((link) => !link.hideNode) ?? [];
                    const hasRegularLinks = visibleRegularLinks.length > 0;

                    return (
                      <BurgerDrawerContent
                        key={item._meta?.deliveryId}
                        ref={
                          item._meta?.deliveryId === chosenNavigationChildId
                            ? currentActiveDrawerTwoContent
                            : undefined
                        }
                        doDisplay={
                          item._meta?.deliveryId === chosenNavigationChildId
                        }
                        isAboveTablet={isAboveTablet}
                        onTransitionEndCallback={handleTransitionEnd}
                        uuid={`main-nav-desktop-${item._meta?.deliveryId ?? index}`}
                      >
                        <div
                          className={classNames(styles.drawerContentFixed, {
                            [styles.doScrollState]: drawerTwoIsScrolled,
                          })}
                        >
                          <Typography
                            tag="h3"
                            tagStyle="headlineLarge"
                            weight="bold"
                          >
                            {item.title}
                          </Typography>
                        </div>
                        <div
                          className={styles.scrollableContainer}
                          onScroll={onDrawerTwoScroll}
                        >
                          <div className={styles.scrollableContent}>
                            {(hasBlueLinks || hasRegularLinks) && (
                              <ul className={styles.linkList}>
                                {hasBlueLinks &&
                                  visibleBlueLinks.map((link, index) => (
                                    <MainNavigationLink
                                      key={`${link._meta.deliveryId}${index}`}
                                      isCurrentPathId={
                                        !!currentPathId &&
                                        currentPathId ===
                                          link.linkObject?.[0]
                                            ?.internalLinkRef?.[0]?.id
                                      }
                                      isHighlighted={true}
                                      isTabbable={
                                        currentlyDisplayedDrawerId ===
                                          `main-nav-desktop-${item._meta?.deliveryId ?? index}` &&
                                        currentDepth === 3
                                      }
                                      link={link.linkObject?.[0]}
                                      onClick={() =>
                                        trackNavigationClick({
                                          clickText:
                                            link.linkObject?.[0]?.linkText,
                                          title: navigationLink.content.title,
                                          title1: item.title,
                                        })
                                      }
                                      toggleMenuDrawer={toggleMenuDrawer}
                                    />
                                  ))}
                                {hasRegularLinks &&
                                  visibleRegularLinks.map((link, index) => (
                                    <MainNavigationLink
                                      key={`${link._meta.deliveryId}${index}`}
                                      className={
                                        index === 0 && hasBlueLinks
                                          ? styles.linkListGroupStart
                                          : undefined
                                      }
                                      isCurrentPathId={
                                        !!currentPathId &&
                                        currentPathId ===
                                          link.linkObject?.[0]
                                            ?.internalLinkRef?.[0]?.id
                                      }
                                      isTabbable={
                                        currentlyDisplayedDrawerId ===
                                          `main-nav-desktop-${item._meta?.deliveryId ?? index}` &&
                                        currentDepth === 3
                                      }
                                      link={link.linkObject?.[0]}
                                      onClick={() =>
                                        trackNavigationClick({
                                          clickText:
                                            link.linkObject?.[0]?.linkText,
                                          title: navigationLink.content.title,
                                          title1: item.title,
                                        })
                                      }
                                      toggleMenuDrawer={toggleMenuDrawer}
                                    />
                                  ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </BurgerDrawerContent>
                    );
                  }),
                )}
            </div>
          </div>
        )}
        {/* DEPTH 3 (DESKTOP) END */}
      </div>
    </FocusTrap>
  );
};

export default MainNavigationBurger;
