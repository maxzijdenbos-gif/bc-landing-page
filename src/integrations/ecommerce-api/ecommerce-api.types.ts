import type { components } from './ecommerce-api.schema';

/** Cart response from the e-commerce API (GET /carts/{cartGuid}). */
export type CartData = components['schemas']['CartResponseModel'];

/** Single item in a cart (element of CartData.items). */
export type CartItemData = components['schemas']['CartItemResponseModel'];

/** Message bar payload from the e-commerce API (GET /content/message-bar). */
export type MessageBarData = components['schemas']['MessageBarResponseModel'];

/** Brand query value for e-commerce API requests that require a brand scope. */
export type EcommerceApiBrand = components['schemas']['Brand'];

/** Search suggestions payload from the e-commerce API (GET /search/suggestions). */
export type SearchSuggestionsData =
  components['schemas']['SearchSuggestionItemModel'];

/** Instant search payload from the e-commerce API (GET /search/instant). */
export type InstantSearchResponse =
  components['schemas']['InstantSearchResponseModel'];
