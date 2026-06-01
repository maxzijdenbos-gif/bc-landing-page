import type {
  CartData,
  CartItemData,
} from 'integrations/ecommerce-api/ecommerce-api.types';
import {
  buildEcommercePayloadFromCart,
  type Ga4EcommerceItem,
  ga4UnitSellingPrice,
  mapCartItemToGa4Item,
  normalizeGa4Currency,
} from './ecommerce-ga4';

export const GTMHeadScript = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
  ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`
  : '';

export const GTMBodyTag = () => {
  return process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
    <noscript>
      <iframe
        height="0"
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
        width="0"
      />
    </noscript>
  ) : null;
};

export const gtmVirtualPageView = (rest: any) => {
  const event = {
    event: 'VirtualPageView',
    ...rest,
  };

  (window as any).dataLayer?.push(event);
};

enum GTMNavType {
  FooterNavigation = 'FooterNavigation',
  MainNavigation = 'MainNavigation',
}

let dataLayerActive = false;
const pendingEvents: any[] = [];

export const pushEventToDataLayer = (event: any) => {
  const gtmDataLayer = (window as any).dataLayer;

  if (!gtmDataLayer) return;

  // If we have not reached custom_page_view view, we will temporarily store the event in the pendingEvents buffer
  const dataLayer = dataLayerActive ? (window as any).dataLayer : pendingEvents;

  // If custom_page_view, we send the event first, then empty the pendingEvents buffer into the real dataLayer
  if (event.event === 'custom_page_view' && !dataLayerActive) {
    dataLayerActive = true;
    gtmDataLayer?.push(event);
    pendingEvents.map((eventData) => {
      gtmDataLayer?.push(eventData);
    });
  } else {
    // Store the event in the appropriate dataLayer
    dataLayer?.push(event);
    // console.table(event); // Uncomment for testing purposes
  }
};

// NAVIGATION TRACKING ------------------------------------------------------------------

const gtmNavigationClick = (data: {
  link_domain: string;
  link_text: string;
  link_url: string;
  nav_tree_text: string;
  nav_type: GTMNavType;
}) => {
  const dataEvent = {
    event: 'navigation',
    ...data,
  };

  pushEventToDataLayer(dataEvent);
};

const trackNavigationLinkClick = (item: BaseLink, type: GTMNavType) => {
  gtmNavigationClick({
    link_domain: window ? window.location.host : '',
    link_text: item.linkText ?? '',
    link_url: item.externalLink ?? '',
    nav_tree_text: '?',
    nav_type: type,
  });
};

// for component use
export const trackMainNavigationLinkClick = (item: BaseLink) => {
  trackNavigationLinkClick(item, GTMNavType.MainNavigation);
};
export const trackFooterNavigationLinkClick = (item: BaseLink) => {
  trackNavigationLinkClick(item, GTMNavType.FooterNavigation);
};

// CTA TRACKING ------------------------------------------------------------------

const gtmCTAClick = (data: {
  cta_section: string;
  link_domain: string;
  link_id: string;
  link_text: string;
  link_url: string;
  outbound?: boolean;
}) => {
  const dataEvent = {
    event: 'cta_click',
    ...data,
  };

  pushEventToDataLayer(dataEvent);
};

export const trackCTAClick = (item: BaseLink) => {
  gtmCTAClick({
    cta_section: window ? window.location.pathname : '',
    link_domain: window ? window.location.host : '',
    link_id: '',
    link_text: item?.linkText ?? '',
    link_url: item.externalLink ?? '',
    outbound: window ? item.externalLink?.includes('http') : undefined,
  });
};

// FORMS TRACKING ------------------------------------------------------------------

const gtmFormsEvent = (
  name: string,
  action: 'start' | 'complete' | 'error',
  errorMessage?: string,
) => {
  const dataEvent = {
    error_message: errorMessage,
    event: 'form',
    form_action: action,
    form_name: name,
  };

  pushEventToDataLayer(dataEvent);
};

export const trackFormSubmit = (formName: string) => {
  gtmFormsEvent(formName, 'start');
};
export const trackFormSuccess = (formName: string) => {
  gtmFormsEvent(formName, 'complete');
};
export const trackFormError = (formName: string, err: string) => {
  gtmFormsEvent(formName, 'error', err);
};

// CUSTOM EVENTS
// When a page loads
export const trackCustomPageView = ({ market }: { market?: string | null }) =>
  pushEventToDataLayer({
    content_group: 'discover pages',
    event: 'custom_page_view',
    market: market?.toLowerCase(),
  });

// When a user scrolls on a page (25%, 50%, 75% and 100% vertical depth)
export const trackCustomScroll = ({ scrollDepth }: { scrollDepth: string }) =>
  pushEventToDataLayer({
    event: 'custom_scroll',
    scroll_depth: scrollDepth,
  });

// When a user successfully signs up for newsletter
export const trackSubscribeEdm = ({ formType }: { formType?: string | null }) =>
  pushEventToDataLayer({
    event: 'subscribe_edm',
    form_type: formType?.toLowerCase(),
  });

// When a user clicks on a link in the footer
export const trackFooterClick = ({
  clickText,
  title,
}: {
  clickText?: string | null;
  title?: string | null;
}) =>
  pushEventToDataLayer({
    click_text: clickText?.toLowerCase(),
    event: 'footer_click',
    title: title?.toLowerCase(),
  });

// When a user clicks on social medias links
export const trackSocialChannel = ({
  socialNetwork,
}: {
  socialNetwork?: string | null;
}) =>
  pushEventToDataLayer({
    event: 'social_channel',
    social_network: socialNetwork?.toLowerCase(),
  });

// When a user clicks in the navigation
export const trackNavigationClick = ({
  title,
  title1,
  clickText,
}: {
  // The context title for clickText, if applicable. ie. road, mountain, etc.
  clickText?: string | null;
  title?: string | null;
  // The context title for title1 and clickText, if applicable. ie. burger menu, bikes, gear, etc.
  title1?: string | null; // The most important, the URL text
}) =>
  pushEventToDataLayer({
    click_text: clickText?.toLowerCase(),
    event: 'navigation_click',
    title: title?.toLowerCase(),
    title1: title1?.toLowerCase(),
  });

// When a user clicks on a link that leads to main site / iconnum
export const trackClickToMainSite = ({
  clickText,
  clickUrl,
}: {
  clickText?: string | null;
  clickUrl?: string | null;
}) =>
  pushEventToDataLayer({
    click_text: clickText?.toLowerCase(),
    click_url: clickUrl?.toLowerCase(),
    event: 'click_to_main_site',
  });

// When a user starts interacting with the carousel and when they completes the round of pictures
export const trackCarouselInteraction = ({
  action,
  title,
}: {
  action: 'start' | 'complete';
  title?: string | null;
}) =>
  pushEventToDataLayer({
    action,
    event: 'carousel_interaction',
    title: title?.toLowerCase(),
  });

let popUpModalLastTrigger: undefined | null | string = undefined;

// When a user triggers opening a pop up modal. Required for tracking trigger button text in the modal opening script.
export const setPopUpModalLastTrigger = (value: undefined | null | string) =>
  (popUpModalLastTrigger = value);
export const getPopUpModalLastTrigger = () => popUpModalLastTrigger;

// When a user opens a pop up modal (from all places) (action 'open')
// and
// When a user clicks on the tabs in the modal (action 'tab')
export const trackPopUpModal = ({
  action,
  title,
  clickText,
}: {
  action?: string | null;
  clickText?: string | null;
  title?: string | null;
}) =>
  pushEventToDataLayer({
    action,
    click_text: clickText?.toLowerCase(),
    event: 'pop_up_modal',
    title: title?.toLowerCase(),
  });

// When a user opens an accordian module
export const trackAccordionExpansion = ({
  clickText,
  title,
}: {
  clickText?: null | string;
  title?: null | string;
}) =>
  pushEventToDataLayer({
    click_text: clickText?.toLowerCase(),
    event: 'accordion_expansion',
    title: title?.toLowerCase(),
  });

// When a user watches 25%, 50%, 75% of a video. Only one time per video per page.
export const trackCustomVideoWatch = ({
  videoDuration,
  videoPercent,
  videoProvider,
  videoTitle,
}: {
  videoDuration?: null | string;
  videoPercent?: null | string;
  videoProvider?: null | string;
  videoTitle?: null | string;
}) =>
  pushEventToDataLayer({
    event: 'custom_video_watch',
    video_duration: videoDuration,
    video_percent: videoPercent,
    video_provider: videoProvider?.toLowerCase(),
    video_title: videoTitle?.toLowerCase(),
  });

// When a user starts a video. Only one time per video per page.
export const trackCustomVideoStart = ({
  videoDuration,
  videoProvider,
  videoTitle,
}: {
  videoDuration?: null | string;
  videoProvider?: null | string;
  videoTitle?: null | string;
}) =>
  pushEventToDataLayer({
    event: 'custom_video_start',
    video_duration: videoDuration,
    video_provider: videoProvider?.toLowerCase(),
    video_title: videoTitle?.toLowerCase(),
  });

// When a user completes a video. Only one time per video per page.
export const trackCustomVideoComplete = ({
  videoDuration,
  videoProvider,
  videoTitle,
}: {
  videoDuration?: null | string;
  videoProvider?: null | string;
  videoTitle?: null | string;
}) =>
  pushEventToDataLayer({
    event: 'custom_video_complete',
    video_duration: videoDuration,
    video_provider: videoProvider?.toLowerCase(),
    video_title: videoTitle?.toLowerCase(),
  });

// When a user clicks on a link that lead to a video
export const trackCustomVideoLinkClick = ({
  videoTitle,
  videoProvider,
  videoUrl,
}: {
  videoProvider?: null | string;
  videoTitle?: null | string;
  videoUrl?: null | string;
}) =>
  pushEventToDataLayer({
    event: 'custom_video_link_click',
    video_provider: videoProvider?.toLowerCase(),
    video_title: videoTitle?.toLowerCase(),
    video_url: videoUrl?.toLowerCase(),
  });

// When a user clicks on all types of card module links
export const trackCardModuleClick = ({
  cardType,
  clickUrl,
  title,
}: {
  cardType?: null | string;
  clickUrl?: null | string;
  title?: null | string;
}) =>
  pushEventToDataLayer({
    card_type: cardType?.toLowerCase(),
    click_url: clickUrl?.toLowerCase(),
    event: 'card_module_click',
    title: title?.toLowerCase(),
  });

// When a user clicks on a link in an endorsement
export const trackEndorsementClick = ({
  clickUrl,
  title,
}: {
  clickUrl?: null | string;
  title?: null | string;
}) =>
  pushEventToDataLayer({
    click_url: clickUrl?.toLowerCase(),
    event: 'endorsement_click',
    title: title?.toLowerCase(),
  });

// Track every time an error occurs on the website
export const trackCustomError = ({
  errorType,
  errorMessage,
}: {
  errorMessage?: null | string;
  errorType?: null | string;
}) =>
  pushEventToDataLayer({
    error_message: errorMessage?.toLowerCase(),
    error_type: errorType?.toLowerCase(),
    event: 'custom_error',
  });

// ECOMMERCE (GA4) — https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm
// dataLayer pushes for GA4 Event tags. Clear `ecommerce` before each event: the GTM snippets on that page use this
// pattern (avoids stale merged fields). The GA demos sample shop (e.g. enhancedecommerce.appspot.com) may omit it—
// implementations vary; we follow the written examples, not necessarily every demo.

const pushGa4EcommerceEvent = (
  eventName: string,
  ecommerce: {
    currency: string;
    items: Ga4EcommerceItem[];
    value: number;
  },
) => {
  pushEventToDataLayer({ ecommerce: null });
  pushEventToDataLayer({
    ecommerce,
    event: eventName,
  });
};

/** User opened the cart drawer and the cart has line items. */
export const trackEcommerceViewCart = (cart: CartData) => {
  const { currency, items, value } = buildEcommercePayloadFromCart(cart);
  pushGa4EcommerceEvent('view_cart', { currency, items, value });
};

/** User started checkout from the cart (e.g. checkout button). */
export const trackEcommerceBeginCheckout = (cart: CartData) => {
  const { currency, items, value } = buildEcommercePayloadFromCart(cart);
  pushGa4EcommerceEvent('begin_checkout', { currency, items, value });
};

/** Quantity increased in the cart (delta added). */
export const trackEcommerceAddToCart = (
  cart: CartData,
  item: CartItemData,
  quantityAdded: number,
) => {
  if (quantityAdded < 1) return;
  const ga4Item = mapCartItemToGa4Item(item, 0, quantityAdded);
  const unitSelling = ga4UnitSellingPrice(item);
  pushGa4EcommerceEvent('add_to_cart', {
    currency: normalizeGa4Currency(cart.total.currency),
    items: [ga4Item],
    value: unitSelling * quantityAdded,
  });
};

/** Quantity decreased in the cart or line removed (delta removed). */
export const trackEcommerceRemoveFromCart = (
  cart: CartData,
  item: CartItemData,
  quantityRemoved: number,
) => {
  if (quantityRemoved < 1) return;
  const ga4Item = mapCartItemToGa4Item(item, 0, quantityRemoved);
  const unitSelling = ga4UnitSellingPrice(item);
  pushGa4EcommerceEvent('remove_from_cart', {
    currency: normalizeGa4Currency(cart.total.currency),
    items: [ga4Item],
    value: unitSelling * quantityRemoved,
  });
};
