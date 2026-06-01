import {
  MainNavigationBurgerLinks,
  MainNavigationResponse,
  NavigationAdaptor,
} from './navigation.types';

export const mainNavigationAdapter = (
  response: MainNavigationResponse & {
    navigationLinks: MainNavigationBurgerLinks;
    topLevelDeliveryId: string;
  },
): NavigationAdaptor => {
  if (!response || typeof response !== 'object') {
    throw 'no response provided';
  }

  return {
    mainNavigation: {
      accountButton: response.accountButton?.[0] ?? null,
      checkoutButton: response.checkoutButton?.[0] ?? null,
      crossBrandLinks: response.crossBrandLinks ?? [],
      navigationLinks: response.navigationLinks ?? [],
      profileLinks: response.profileLinks ?? [],
      shopButton: response.shopButton?.[0] ?? null,
      skipLinkText: response.skipLinkText ?? '',
      supportLinks: response.supportLinks ?? [],
      topLevelDeliveryId: response.topLevelDeliveryId ?? '',
    },
  };
};
