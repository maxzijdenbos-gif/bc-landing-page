import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import MessageBar from 'components/molecules/message-bar/message-bar';
import MainNavigationBurgerLoading from 'components/organisms/main-navigation/main-navigation-burger/main-navigation-burger-loading';
import MainNavigationShoppingCart from 'components/organisms/main-navigation/main-navigation-shopping-cart/main-navigation-shopping-cart';
import SearchBar from 'components/organisms/search-bar/search-bar';
import type { SuggestionsSection } from 'components/organisms/search-bar/search-bar-suggestions';
import Link from 'components/utilities/link/link';
import {
  CrossBrandLink,
  MainNavigationMessageBar,
  NavigationHierarchyNode,
} from 'integrations/content/amplience/endpoints/navigation/navigation.types';
import type { CartData } from 'integrations/ecommerce-api/ecommerce-api.types';
import { trackNavigationClick } from 'integrations/tracking/google-tag-manager/scripts';
import { useInternalLinksContext } from 'libraries/contexts/internal-navigation-context';
import { useMainNavigationContext } from 'libraries/contexts/main-navigation-context';
import {
  getLocaleFromAsPath,
  getPathForNavigationMatch,
} from 'libraries/getters/get-locale';
import useBreakpoints from 'libraries/hooks/dom/use-breakpoints';
import type { OnQuantityChange } from 'libraries/hooks/use-cart';
import { useNavigationScroll } from 'libraries/hooks/use-navigation-scroll';
import { getAllTabbableElements } from 'libraries/utilities/accessibility/get-all-tabbable-elements';
import { restoreFocus } from 'libraries/utilities/focus-restoration/focus-restoration';
import MainNavigationLogo from './main-navigation-logo/main-navigation-logo';
import styles from './main-navigation.module.scss';

const getPathIdInNavigationNode = (
  content: NavigationHierarchyNode,
  internalLinks: Record<string, Record<string, string>>,
  locale: string,
  path: string,
) => {
  for (const link of [
    ...(content?.highlightedLinks || []),
    ...(content?.navigationLinks || []),
  ]) {
    // Default to legacy internalLink, then search and override with internalLinkRef if available.
    let foundLink = link.linkObject?.[0]?.internalLink;
    const internalLinkRefId = link.linkObject?.[0]?.internalLinkRef?.[0]?.id;
    const pathName = path ? `${locale}/${path}` : locale;

    if (internalLinkRefId) {
      const internalLinkMapMatch =
        internalLinks?.[internalLinkRefId]?.[locale || ''];

      if (internalLinkMapMatch) {
        foundLink = internalLinkMapMatch;
      }
    }

    // We have a match!
    if (!!foundLink && foundLink === pathName) {
      return link.linkObject?.[0]?.internalLinkRef?.[0]?.id || true; // Early return because we don't care about the rest
    }
  }
};

const locatePathInNavigationHierarchy = (
  path: string,
  { children }: NodeContainer<NavigationHierarchyNode>,
  internalLinks: Record<string, Record<string, string>>,
  locale: string,
) => {
  // For all children of parent
  for (const child of children) {
    // Check if there is a path match inside the child ( depth 2 )
    const matchingLinkInParent = getPathIdInNavigationNode(
      child.content,
      internalLinks,
      locale,
      path,
    );

    let id = matchingLinkInParent;

    // If not, check all children of the child ( depth 3 )
    const matchingLinkInChild =
      !matchingLinkInParent &&
      child.children.find((grandChild) => {
        return (id = getPathIdInNavigationNode(
          grandChild.content,
          internalLinks,
          locale,
          path,
        ));
      })?.content;

    if (matchingLinkInParent || matchingLinkInChild) {
      return {
        child: matchingLinkInChild || undefined, // In the case that the match is inside children of current iteration item
        id,
        parent: child.content, // Static to current iteration item
      };
    }
  }
};

export interface MainNavigationProps {
  accountButton?: BaseLink;
  /** Cart data (items + total). Provided by layout/parent; when set with items, cart drawer shows list and checkout footer. */
  cart?: CartData | null;
  /** When true, cart is being fetched; drawer shows loading state. */
  cartLoading?: boolean;
  /** Link for the checkout button when cart has items. */
  checkoutButton?: BaseLink | null;
  /** A list if brands to reference at the bottom of the navigation */
  crossBrandLinks?: CrossBrandLink[];
  /** The url to link the call to action to */
  ctaLink?: NavigationHierarchyNode | null;
  hideTopNavigationBackground?: boolean;
  /** The url to link the logo to */
  homeLink?: BaseLink;
  /** When true, the search bar is shown (from Amplience global settings). */
  isSearchBarEnabled?: boolean;
  /** When true, the shopping cart icon and drawer are shown (from Amplience global settings). */
  isShoppingCartEnabled?: boolean;
  /** An array of the language links to show */
  languageLinks?: NavigationHierarchyNode[];
  /** The url of the logo to show on inside the drawer*/
  logoBlue?: string;
  /** The url of the logo to show on light backgrounds */
  logoDark?: string;
  /** The url of the logo to show on dark backgrounds */
  logoLight?: string;
  /**
   * Optional strip above the nav (from the e-commerce API via layout). Omitted or blank `message` hides it.
   */
  messageBar?: MainNavigationMessageBar | null;
  /** An array of the navigation links to show */
  navigationLinks?: NodeContainer<NavigationHierarchyNode>[];
  /** Called when user changes quantity for a cart item. Provided by layout/parent. */
  onQuantityChange?: OnQuantityChange;
  /** When search is enabled, called on every input change (layout may call instant search). */
  onSearchBarChange?: (value: string) => void;
  /** When search is enabled, called once each time the user opens the collapsed search bar (layout may prefetch suggestions). */
  onSearchBarExpanded?: () => void;
  /** When search is enabled, called with the trimmed query on submit (layout typically redirects to the main site search). */
  onSearchBarSubmit?: (keyword: string) => void;
  /** When search is enabled, called when the suggestions "bottom link" is activated (layout may choose custom behavior). */
  onSearchBarSuggestionsBottomLinkClick?: (keyword: string) => void;
  profileLinks?: BaseLink[];
  /** Passed to `SearchBar` as `suggestions` (e.g. category list from the layout / e-commerce API). */
  searchBarSuggestions?: SuggestionsSection[];
  searchBarSuggestionsClassName?: string;
  setIsMainNavigationHidden?: Dispatch<SetStateAction<boolean>>;
  shopButton?: BaseLink;
  supportLinks?: BaseLink[];
  topLevelDeliveryId: string;
}

const recursivelyGenerateNavigationMap = (
  navigation: NodeContainer<NavigationHierarchyNode>,
  map: Record<string, NodeContainer<NavigationHierarchyNode>> = {},
) => {
  if (navigation?.content?._meta?.deliveryId)
    map[navigation.content._meta.deliveryId] = navigation;

  if (navigation.children?.length)
    navigation.children.map((child) =>
      recursivelyGenerateNavigationMap(child, map),
    );

  return map;
};

const MainNavigation = ({
  crossBrandLinks,
  hideTopNavigationBackground,
  homeLink,
  isSearchBarEnabled,
  isShoppingCartEnabled,
  navigationLinks: hierarchy,
  profileLinks,
  shopButton,
  accountButton,
  cart,
  cartLoading,
  checkoutButton,
  messageBar,
  onQuantityChange,
  onSearchBarChange,
  onSearchBarExpanded,
  onSearchBarSuggestionsBottomLinkClick,
  onSearchBarSubmit,
  searchBarSuggestions,
  searchBarSuggestionsClassName,
  supportLinks,
  topLevelDeliveryId,
}: MainNavigationProps) => {
  const { t } = useI18n();
  const { asPath } = useRouter();
  const locale = getLocaleFromAsPath(asPath);
  const { internalLinks } = useInternalLinksContext();

  const [chosenNavigationParentId, setChosenNavigationParentId] = useState<
    any | undefined
  >(undefined);
  const [chosenNavigationChildId, setChosenNavigationChildId] = useState<
    any | undefined
  >(undefined);
  const [currentDepth, setCurrentDepth] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpenedViaKeyboard, setMenuOpenedViaKeyboard] = useState(false);
  const [openedFromDesktopNav, setOpenedFromDesktopNav] = useState(false);
  const [currentPathId, setCurrentPathId] = useState<string | undefined>();
  const [menuTriggerElement, setMenuTriggerElement] =
    useState<HTMLElement | null>(null);
  const { isTabletOrAbove = false } = useBreakpoints();

  const navigationLinks = useMemo(() => {
    const map = recursivelyGenerateNavigationMap({
      children: hierarchy || [],
      content: {
        _meta: {
          deliveryId: topLevelDeliveryId,
          schema: '',
        },
      },
    });

    return map;
  }, [topLevelDeliveryId, hierarchy]);

  const navigationProgress = useRef<(string | undefined)[]>([]);
  const messageBarMeasureRef = useRef<HTMLDivElement>(null);
  const messageBarHeightRef = useRef(0);
  const messageBarText = messageBar?.message?.trim() ?? '';
  const showMessageBar = Boolean(messageBarText);

  const { hideNavigation, makeNavigationSolid } = useNavigationScroll(
    menuOpen,
    showMessageBar ? messageBarHeightRef : undefined,
  );
  const { setIsNavigationHidden, preventHideNavigation } =
    useMainNavigationContext();

  useEffect(() => {
    if (preventHideNavigation) return;
    setIsNavigationHidden && setIsNavigationHidden(hideNavigation);
  }, [hideNavigation, preventHideNavigation, setIsNavigationHidden]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const el = messageBarMeasureRef.current;

    if (!el) {
      messageBarHeightRef.current = 0;
      root.style.setProperty('--messageBar-navigationOffset', '0px');

      return () => {
        root.style.removeProperty('--messageBar-navigationOffset');
      };
    }

    let measuredHeightPx = 0;
    let frameId = 0;

    const measureHeight = () => {
      const nextHeight = Math.round(el.getBoundingClientRect().height);

      measuredHeightPx = nextHeight;
      messageBarHeightRef.current = nextHeight;
    };

    const applyNavOffset = () => {
      const { bottom, top } = el.getBoundingClientRect();
      const visibleHeightPx = Math.max(
        0,
        Math.min(bottom, window.innerHeight) - Math.max(top, 0),
      );
      const offsetPx = Math.min(measuredHeightPx, Math.round(visibleHeightPx));

      root.style.setProperty('--messageBar-navigationOffset', `${offsetPx}px`);
    };

    const updateNavOffset = () => {
      frameId = 0;
      applyNavOffset();
    };

    const scheduleNavOffsetUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateNavOffset);
    };

    const resizeObserver = new ResizeObserver(() => {
      measureHeight();
      applyNavOffset();
    });

    resizeObserver.observe(el);
    measureHeight();
    applyNavOffset();
    window.addEventListener('scroll', scheduleNavOffsetUpdate, {
      passive: true,
    });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      resizeObserver.disconnect();
      window.removeEventListener('scroll', scheduleNavOffsetUpdate);
      root.style.removeProperty('--messageBar-navigationOffset');
    };
  }, [showMessageBar]);

  const handleDepthLinkClick = useCallback(
    (
      navigationLink: NavigationHierarchyNode,
      newLevel: number,
      options?: { viaKeyboard?: boolean },
    ) => {
      const handleFocusNextElement = () => {
        if (!navigationLink?._meta?.deliveryId) return;

        const getNextDepthItem = getAllTabbableElements(
          document.getElementById(navigationLink?._meta?.deliveryId),
        );

        getNextDepthItem &&
          getNextDepthItem.length > 0 &&
          getNextDepthItem[0]?.focus();
      };

      if (options?.viaKeyboard) {
        window.requestAnimationFrame(handleFocusNextElement);
      }

      if (newLevel === 2) {
        setChosenNavigationParentId(navigationLink?._meta.deliveryId);
      } else {
        setChosenNavigationChildId(navigationLink?._meta.deliveryId);
      }
      navigationProgress.current[newLevel - 1] = navigationLink.title;
      setCurrentDepth(newLevel);
    },
    [],
  );

  const toggleMenuDrawer = useCallback(
    (options?: {
      forceTopLevel?: boolean;
      openedViaKeyboard?: boolean;
      triggerElement?: HTMLElement | null;
      usedCloseButton?: boolean;
    }) => {
      const {
        forceTopLevel,
        openedViaKeyboard,
        triggerElement,
        usedCloseButton,
      } = options || {};
      let matchingPathLocation;

      // Only run expensive function if menu is going to open
      if (!menuOpen) {
        setMenuOpenedViaKeyboard(openedViaKeyboard ?? false);
        setOpenedFromDesktopNav(false); // Opening via burger, not desktop nav
        if (triggerElement) {
          setMenuTriggerElement(triggerElement);
        }
        const path = getPathForNavigationMatch(asPath, locale);

        matchingPathLocation = locatePathInNavigationHierarchy(
          path,
          navigationLinks?.[topLevelDeliveryId],
          internalLinks,
          locale,
        );

        if (matchingPathLocation?.id) {
          setCurrentPathId(matchingPathLocation.id.toString());
        } else {
          setCurrentPathId(undefined);
        }

        navigationProgress.current = [
          'burger menu',
          matchingPathLocation?.parent?.title,
          matchingPathLocation?.child?.title,
        ];
      }

      // Set depth to 0 if menu will close. Try to get as big a depth as possible given the path id, if applicable.
      setCurrentDepth(
        menuOpen
          ? 0
          : forceTopLevel
            ? 1
            : matchingPathLocation
              ? matchingPathLocation.child?._meta?.deliveryId
                ? 3
                : 2
              : 1,
      );
      setMenuOpen(!menuOpen);
      if (menuOpen) setOpenedFromDesktopNav(false);
      setChosenNavigationParentId(
        forceTopLevel
          ? undefined
          : matchingPathLocation?.parent?._meta?.deliveryId,
      );
      setChosenNavigationChildId(
        forceTopLevel
          ? undefined
          : matchingPathLocation?.child?._meta?.deliveryId,
      );

      if (menuOpen) {
        // The menu will close
        restoreFocus(menuTriggerElement);

        // Ignore reporting if not closed via button
        if (!usedCloseButton) return;

        // Grab the last two items and map to title and title1
        const [title, title1] = navigationProgress.current
          .slice(0, currentDepth) // We only care about progress up to current depth
          .filter((title) => !!title) // Filter away falsey values
          .slice(-2); // Grab last two

        // Do the report
        trackNavigationClick({
          clickText: 'close',
          title: title || 'n/a',
          title1: title1 || 'n/a',
        });

        // Reset navigation progress
        navigationProgress.current = [];
      }
    },
    [
      menuOpen,
      asPath,
      navigationLinks,
      topLevelDeliveryId,
      internalLinks,
      locale,
      currentDepth,
      menuTriggerElement,
    ],
  );

  const handleDepth = useCallback((newDepth: number) => {
    setCurrentDepth(newDepth);
    setChosenNavigationParentId(undefined);
    setChosenNavigationChildId(undefined);
  }, []);

  return (
    <Fragment>
      {showMessageBar && messageBar ? (
        <div ref={messageBarMeasureRef}>
          <MessageBar
            link={messageBar.link ?? undefined}
            linkText={messageBar.linkText ?? ''}
            message={messageBarText}
            variant={messageBar.variant ?? 'Primary'}
          />
        </div>
      ) : null}
      <nav
        className={classNames(styles.component, {
          [styles.hideNavigation]: hideNavigation && !preventHideNavigation,
        })}
      >
        <div
          className={classNames(styles.solidBackground, {
            [styles.isSolid]:
              makeNavigationSolid && !hideTopNavigationBackground,
          })}
        />

        <div className={styles.burgerAndLinksContainer}>
          <MainNavigationBurgerLoading
            chosenNavigationChildId={chosenNavigationChildId}
            chosenNavigationParentId={chosenNavigationParentId}
            crossBrandLinks={crossBrandLinks}
            currentDepth={currentDepth}
            currentPathId={currentPathId}
            handleDepth={handleDepth}
            handleDepthLinkClick={handleDepthLinkClick}
            isAboveTablet={isTabletOrAbove}
            menuOpen={menuOpen}
            menuOpenedViaKeyboard={menuOpenedViaKeyboard}
            openedFromDesktopNav={openedFromDesktopNav}
            navigationLinks={navigationLinks}
            profileLinks={profileLinks}
            supportLinks={supportLinks}
            toggleMenuDrawer={toggleMenuDrawer}
            topLevelDeliveryId={topLevelDeliveryId}
          />
          <div className={styles.navigationLinks}>
            {navigationLinks[topLevelDeliveryId] && (
              <ul className={styles.linkList}>
                {navigationLinks[topLevelDeliveryId].children?.map(
                  ({ content: item }, index) => {
                    if (item.hideAsHighlighted) return;

                    const key =
                      item._meta?.deliveryId ||
                      `${item.title || 'item'}_${index}`;

                    if (item.linkObject) {
                      return (
                        <li key={key}>
                          <Link
                            className={styles.linkItem}
                            link={item.linkObject[0]}
                            onClick={() => {
                              trackNavigationClick({
                                clickText: item.title,
                                title: 'n/a',
                                title1: 'n/a',
                              });
                            }}
                          >
                            <Typography
                              tagStyle={'bodyMedium'}
                              weight="semiBold"
                            >
                              {item.title}
                            </Typography>
                          </Link>
                        </li>
                      );
                    }
                    return (
                      <li key={key}>
                        <button
                          className={styles.linkItem}
                          onClick={(e) => {
                            if (!menuOpen) {
                              setMenuTriggerElement(e.currentTarget);
                              setOpenedFromDesktopNav(true); // So Tab moves focus into drawer
                            }
                            setMenuOpen(true);
                            handleDepthLinkClick(item, 2);
                            trackNavigationClick({
                              clickText: item.title,
                              title: 'n/a',
                              title1: 'n/a',
                            });
                          }}
                        >
                          <Typography tagStyle={'bodyMedium'} weight="semiBold">
                            {item.title}
                          </Typography>
                        </button>
                      </li>
                    );
                  },
                )}
              </ul>
            )}
          </div>
        </div>

        <Link
          {...(menuOpen
            ? { 'aria-hidden': true }
            : {
                'aria-label':
                  homeLink?.linkText ?? t('navigation.backToHomepage'),
              })}
          className={styles.logo}
          link={{ internalLink: '/' }}
        >
          <MainNavigationLogo ariaHidden />
        </Link>

        <div className={styles.callToActionContainer}>
          {isSearchBarEnabled && (
            <SearchBar
              onChange={onSearchBarChange}
              onExpanded={onSearchBarExpanded}
              onSuggestionsBottomLinkClick={
                onSearchBarSuggestionsBottomLinkClick
              }
              onSubmit={onSearchBarSubmit}
              suggestions={searchBarSuggestions}
              suggestionsClassName={searchBarSuggestionsClassName}
            />
          )}
          {!!shopButton && !isShoppingCartEnabled && (
            <Button
              aria-hidden={!!menuOpen}
              link={shopButton}
              onClick={() =>
                trackNavigationClick({
                  clickText: shopButton.linkText,
                  title: 'n/a',
                  title1: 'n/a',
                })
              }
              size="small"
              target={shopButton.target}
              text={shopButton.linkText}
              variant="Tertiary"
            />
          )}

          {!!accountButton && (
            <Button
              aria-hidden={!!menuOpen}
              innerClassName={styles.accountButton}
              aria-label={accountButton.linkText ?? ''}
              link={accountButton}
              onClick={() =>
                trackNavigationClick({
                  clickText: accountButton.linkText,
                  title: 'n/a',
                  title1: 'n/a',
                })
              }
              size="small"
              target={accountButton.target}
              rightIcon="Profile"
              variant="Tertiary"
              noBackground
            />
          )}

          {isShoppingCartEnabled && (
            <MainNavigationShoppingCart
              cart={cart}
              cartLoading={cartLoading}
              checkoutButton={checkoutButton}
              menuOpen={menuOpen}
              onQuantityChange={onQuantityChange}
              shopButton={shopButton}
            />
          )}
        </div>
      </nav>
    </Fragment>
  );
};

MainNavigation.displayName = 'MainNavigation';

export default MainNavigation;
