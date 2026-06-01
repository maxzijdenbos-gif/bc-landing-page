import { MAIN_MENU_DRAWER_ID } from 'constants/index';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import React, { useMemo, useRef, useState } from 'react';
import BurgerIcon from 'components/atoms/burger-icon/burger-icon';
import Drawer from 'components/utilities/drawer/drawer';
import {
  NavigationHierarchyLinkNode,
  NavigationHierarchyNode,
} from 'integrations/content/amplience/endpoints/navigation/navigation.types';
import { trackNavigationClick } from 'integrations/tracking/google-tag-manager/scripts';
import {
  InternalLinkMapTypeRecord,
  useInternalLinksContext,
} from 'libraries/contexts/internal-navigation-context';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import { MainNavigationBurgerProps } from './main-navigation-burger';
import styles from './main-navigation-burger-loading.module.scss';

const processLinks = (
  links: NavigationHierarchyLinkNode[],
  locale: string,
  internalLinks: InternalLinkMapTypeRecord,
) => {
  if (!links || !internalLinks) return null;

  return links.map(({ linkObject }, index) => {
    const link = linkObject?.[0];

    if (!link) return null;

    let pathname = link.externalLink;
    const internalLinkRef = link.internalLinkRef?.[0];

    pathname =
      internalLinks[internalLinkRef?.id || '']?.[locale] ||
      link.internalLink ||
      link.externalLink ||
      link.modalId ||
      '#';

    return (
      <li key={index}>
        <a href={pathname}>{link.linkText}</a>
      </li>
    );
  });
};

const recursivelyGenerateURLMap = (
  {
    children,
    content,
  }: { children: NodeContainer<NavigationHierarchyNode>[]; content: any },
  locale?: string | null,
  internalLinks?: InternalLinkMapTypeRecord | null,
) => {
  if (!content || !children || !locale || !internalLinks) return null;

  return (
    <ul>
      {!content.hideNode && (
        <React.Fragment>
          {processLinks(content.highlightedLinks || [], locale, internalLinks)}
          {processLinks(content.navigationLinks || [], locale, internalLinks)}
        </React.Fragment>
      )}
      {children.map((child, index) => (
        <React.Fragment key={index}>
          {recursivelyGenerateURLMap(child, locale, internalLinks)}
        </React.Fragment>
      ))}
    </ul>
  );
};

const MainNavigationBurgerLight = (props: MainNavigationBurgerProps) => {
  const router = useRouter();
  const locale = getLocaleFromAsPath(router.asPath);
  const { internalLinks } = useInternalLinksContext();

  const navigationTree = useMemo(() => {
    if (!props) return null;

    return recursivelyGenerateURLMap(
      {
        children:
          props.navigationLinks[props.topLevelDeliveryId]?.children || [],
        content: {
          _meta: { schema: '' },
          navigationLinks: [
            ...(props.supportLinks || []),
            ...(props.profileLinks || []),
          ].map(
            (link) => ({ linkObject: [link] }) as NavigationHierarchyLinkNode,
          ),
        },
      },
      locale,
      internalLinks,
    );
  }, [props, locale, internalLinks]);

  return (
    <nav style={{ background: 'white', color: 'black' }}>{navigationTree}</nav>
  );
};

const MainNavigationBurger = dynamic(
  () =>
    import('components/organisms/main-navigation/main-navigation-burger/main-navigation-burger'),
  {
    ssr: false,
  },
);

const Navigation = ({
  isReady,
  setIsReady,
  props,
}: {
  isReady: boolean;
  props: MainNavigationBurgerProps;
  setIsReady: (arg0: boolean) => void;
}) => {
  return (
    <React.Fragment>
      {!isReady && <MainNavigationBurgerLight {...props} />}
      <MainNavigationBurger {...props} onReady={() => setIsReady(true)} />
    </React.Fragment>
  );
};

const MainNavigationBurgerLoading = (props: MainNavigationBurgerProps) => {
  const { t } = useI18n();
  const [isReady, setIsReady] = useState(false);
  const openedViaKeyboardRef = useRef(false);

  return (
    <div className={styles.component}>
      <div className={styles.topBarContent}>
        <button
          aria-controls={MAIN_MENU_DRAWER_ID}
          aria-expanded={props.menuOpen}
          aria-label={t('navigation.openMenu')}
          className={styles.menuToggleButton}
          onClick={(e) => {
            if (openedViaKeyboardRef.current) {
              openedViaKeyboardRef.current = false;
              return;
            }
            props.toggleMenuDrawer({
              forceTopLevel: !props.menuOpen,
              triggerElement: e.currentTarget,
            });
            trackNavigationClick({
              clickText: 'burger icon',
              title: 'n/a',
              title1: 'n/a',
            });
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !props.menuOpen) {
              e.preventDefault();
              openedViaKeyboardRef.current = true;
              props.toggleMenuDrawer({
                forceTopLevel: true,
                openedViaKeyboard: true,
                triggerElement: e.currentTarget,
              });
              trackNavigationClick({
                clickText: 'burger icon',
                title: 'n/a',
                title1: 'n/a',
              });
            }
          }}
        >
          <BurgerIcon />
        </button>
      </div>
      <Drawer
        id={MAIN_MENU_DRAWER_ID}
        isOpen={props.menuOpen}
        onInternalClose={props.toggleMenuDrawer}
      >
        <Navigation isReady={isReady} props={props} setIsReady={setIsReady} />
      </Drawer>
    </div>
  );
};

MainNavigationBurgerLoading.displayName = 'MainNavigationBurgerLoading';

export default React.memo(MainNavigationBurgerLoading);
