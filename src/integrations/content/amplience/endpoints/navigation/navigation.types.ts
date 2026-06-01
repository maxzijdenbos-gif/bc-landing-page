import type { MessageBarVariant } from 'components/molecules/message-bar/message-bar';
import { ContentMeta } from '../../types/content-types';
import { TraverseHierarchyReturn } from './navigation';

export interface NavigationHierarchyLinkNode {
  _meta: ContentMeta;
  blueLink?: boolean;
  hideNode: boolean;
  linkObject: [BaseLink];
}
export interface NavigationHierarchyNode {
  _meta: ContentMeta;
  hideAsHighlighted?: boolean;
  hideNode?: boolean;
  highlightedLinks?: NavigationHierarchyLinkNode[];
  linkObject?: [BaseLink];
  navigationLinks?: NavigationHierarchyLinkNode[];
  ranking?: number;
  title?: string;
}

export type CrossBrandLink = {
  brandDefinition: BrandNames;
  crossBrandImageAltText: string;
  crossBrandLink: BaseLink[];
};

/** Optional strip above the nav; the UI hides it when `message` is missing or blank. */
export interface MainNavigationMessageBar {
  link?: string | null;
  linkText?: string | null;
  message?: string | null;
  variant?: MessageBarVariant;
}

export interface MainNavigationResponse {
  _meta: ContentMeta;
  accountButton: BaseLink[] | null;
  checkoutButton: BaseLink[] | null;
  crossBrandLinks: CrossBrandLink[];
  messageBar?: MainNavigationMessageBar | null;
  profileLinks: NavigationHierarchyNode[];
  shopButton: BaseLink[] | null;
  skipLinkText: string;
  supportLinks: NavigationHierarchyNode[];
}

export type MainNavigationBurgerLinks = TraverseHierarchyReturn[];

export interface NavigationAdaptor {
  mainNavigation: {
    accountButton: BaseLink | null;
    checkoutButton: BaseLink | null;
    crossBrandLinks: CrossBrandLink[];
    homeLink?: NavigationHierarchyNode;
    isShoppingCartEnabled?: boolean;
    navigationLinks?: MainNavigationBurgerLinks;
    profileLinks?: NavigationHierarchyNode[];
    shopButton: BaseLink | null;
    skipLinkText: string;
    supportLinks?: NavigationHierarchyNode[];
    topLevelDeliveryId: string;
  };
}

export interface HierarchyProps {
  contentId: string;
  locale: string;
  stagingEnvironment?: string;
}

export interface TraverseHierarchy {
  contentItem: NavigationHierarchyNode;
  locale: string;
  stagingEnvironment?: string;
}
