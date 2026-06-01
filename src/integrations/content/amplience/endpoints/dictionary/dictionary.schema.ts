import { z } from 'zod';

const accordionSchema = z
  .object({
    collapse: z.string(),
    expand: z.string(),
  })
  .strict();

const carouselRegionSchema = z
  .object({
    endorsements: z.string(),
    entryCards: z.string(),
    entryCardsSlider: z.string(),
    portraitImageGallery: z.string(),
    product: z.string(),
    similarProducts: z.string(),
    teaserList: z.string(),
    withTitle: z.string(),
  })
  .strict();

const cartSchema = z
  .object({
    bundleBadge: z.string(),
    checkout: z.string(),
    checkoutUnavailableHint: z.string(),
    clearanceFinalSaleMessage: z.string(),
    continueShopping: z.string(),
    decreaseBtn: z.string(),
    destinationFee: z.string(),
    destinationFeeInfo: z.string(),
    destinationFeeInfoTrigger: z.string(),
    emptyDescription: z.string(),
    emptyTitle: z.string(),
    inCart: z.string(),
    increaseBtn: z.string(),
    item: z.string(),
    items: z.string(),
    outOfStock: z.string(),
    quantity: z.string(),
    removeBtn: z.string(),
    shoppingCartHeader: z.string(),
    subtotal: z.string(),
    totalDiscount: z.string(),
    totalLabel: z.string(),
  })
  .strict();

const cookiesSchema = z
  .object({
    consentCategoryFunctional: z.string(),
    consentCategoryMarketing: z.string(),
    consentCategoryNecessary: z.string(),
    consentCategoryStatistic: z.string(),
    consentCategoryUnclassified: z.string(),
    contentIsBlocked: z.string(),
    updateConsent: z.string(),
  })
  .strict();

const formErrorsSchema = z
  .object({
    emailError: z.string(),
    generalNewsLetterError: z.string(),
  })
  .strict();

const formsSchema = z
  .object({
    email: z.string(),
    required: z.string(),
    requiredConsent: z.string(),
  })
  .strict();

const globalSchema = z
  .object({
    action: z.string(),
    back: z.string(),
    breadcrumbLabel: z.string(),
    close: z.string(),
    closeFullscreen: z.string(),
    download: z.string(),
    goTo: z.string(),
    loading: z.string(),
    loadingDetailed: z.string(),
    next: z.string(),
    numberOfModels: z.string(),
    pause: z.string(),
    play: z.string(),
    previous: z.string(),
    pricesFrom: z.string(),
    product: z.string(),
    progressSentence: z.string(),
    share: z.string(),
    shopCta: z.string(),
    socialMediaLink: z.string(),
  })
  .strict();

const legalSchema = z
  .object({
    legalNewsletterLink: z.string(),
    legalNewsletterText: z.string(),
    legalNewsletterTextLink: z.string(),
    legalNewsletterTextLinkAriaLabel: z.string(),
  })
  .strict();

const modalSchema = z
  .object({
    closeModal: z.string(),
  })
  .strict();

const navigationSchema = z
  .object({
    backToHomepage: z.string(),
    backToMainMenu: z.string(),
    closeMenu: z.string(),
    logo: z.string(),
    mainMenu: z.string(),
    openCart: z.string(),
    openMenu: z.string(),
  })
  .strict();

const portraitImageGallerySchema = z
  .object({
    nextImage: z.string(),
    previousImage: z.string(),
  })
  .strict();

const productDetailsSchema = z
  .object({
    relatedProductsNext: z.string(),
    relatedProductsPrevious: z.string(),
  })
  .strict();

const productSeriesCarouselSchema = z
  .object({
    linkNarration: z.string(),
    nextImage: z.string(),
    previousImage: z.string(),
    progressSentence: z.string(),
  })
  .strict();

const searchSchema = z
  .object({
    clearBtn: z.string(),
    inputLabel: z.string(),
    inputPlaceholder: z.string(),
    instantContent: z.string(),
    instantProducts: z.string(),
    recentSearches: z.string(),
    recommendedCategories: z.string(),
    searchToggleBtn: z.string(),
    showAllResults: z.string(),
    showOneResult: z.string(),
    submitBtn: z.string(),
    suggestionsLabel: z.string(),
  })
  .strict();

const ugcEndorsementsSchema = z
  .object({
    endorsementNext: z.string(),
    endorsementPrevious: z.string(),
  })
  .strict();

const videoSchema = z
  .object({
    mediaPlayer: z.string(),
    pause: z.string(),
    pauseDecorative: z.string(),
    play: z.string(),
    playDecorative: z.string(),
  })
  .strict();

/**
 * Canonical full dictionary shape (used for `z.infer` / typings).
 * Runtime payloads from Amplience are merged over static fallback via coercion — see `dictionary.ts`.
 */
export const dictionaryEntryGlobalSchema = z
  .object({
    accordion: accordionSchema,
    carouselRegion: carouselRegionSchema,
    cart: cartSchema,
    cookies: cookiesSchema,
    formErrors: formErrorsSchema,
    forms: formsSchema,
    global: globalSchema,
    legal: legalSchema,
    modal: modalSchema,
    navigation: navigationSchema,
    portraitImageGallery: portraitImageGallerySchema,
    productDetails: productDetailsSchema,
    productSeriesCarousel: productSeriesCarouselSchema,
    search: searchSchema,
    ugcEndorsements: ugcEndorsementsSchema,
    video: videoSchema,
  })
  .strict();

export type DictionaryEntry = z.infer<typeof dictionaryEntryGlobalSchema>;
