import type { DictionaryEntry } from 'integrations/content/amplience/endpoints/dictionary/dictionary.types';
import type { DeepRequired } from 'types/helpers';

const dictionary: DeepRequired<DictionaryEntry> = {
  accordion: {
    collapse: 'Collapse',
    expand: 'Expand',
  },
  carouselRegion: {
    endorsements: 'Endorsements carousel',
    entryCards: 'Entry cards carousel',
    entryCardsSlider: 'Entry cards slider carousel',
    portraitImageGallery: 'Portrait image gallery carousel',
    product: 'Product carousel',
    similarProducts: 'Similar products carousel',
    teaserList: 'Teaser list carousel',
    withTitle: '{{title}} carousel',
  },
  cart: {
    bundleBadge: 'Bundle',
    checkout: 'Checkout',
    checkoutUnavailableHint:
      'Remove unavailable items from your cart to continue.',
    clearanceFinalSaleMessage:
      'Clearance Items are Non-Refundable (Final Sale)',
    continueShopping: 'Continue shopping',
    decreaseBtn: 'Decrease quantity',
    destinationFee: 'Destination fee',
    destinationFeeInfo:
      'Destination Fee reflects costs incurred in transportation, logistics, and other associated fees. The destination fee is non-refundable or negotiable.',
    destinationFeeInfoTrigger: 'Destination fee information',
    emptyDescription:
      'When you add products to your cart, they will appear here.',
    emptyTitle: 'Your cart is empty',
    inCart: 'in cart',
    increaseBtn: 'Increase quantity',
    item: 'item',
    items: 'items',
    outOfStock: 'No longer available',
    quantity: 'Quantity',
    removeBtn: 'Remove item from cart',
    shoppingCartHeader: 'Shopping cart',
    subtotal: 'Subtotal',
    totalDiscount: 'Total savings',
    totalLabel: 'Total',
  },
  cookies: {
    consentCategoryFunctional: 'functional',
    consentCategoryMarketing: 'marketing',
    consentCategoryNecessary: 'necessary',
    consentCategoryStatistic: 'statistic',
    consentCategoryUnclassified: 'unclassified',
    contentIsBlocked:
      'This content is not displayed as you have not accepted cookies of the following categories: {{missingAcceptOfCookieCategories}}',
    updateConsent: 'Update consent',
  },
  formErrors: {
    emailError: 'Email address invalid',
    generalNewsLetterError:
      'An Error occurred while signing you up to our newsletter, we’re sorry for the inconvenience, please try again.',
  },
  forms: {
    email: 'Email',
    required: 'Required field',
    requiredConsent: 'Consent is required',
  },
  global: {
    action: 'action',
    back: 'Back',
    breadcrumbLabel: 'Breadcrumb',
    close: 'Close',
    closeFullscreen: 'Close full screen',
    download: 'download',
    goTo: 'Go to',
    loading: 'loading',
    loadingDetailed: 'loading',
    next: 'Next',
    numberOfModels: '{{numberOfModels}} models',
    pause: 'pause',
    play: 'play',
    previous: 'Previous',
    pricesFrom: 'From {{price}}',
    product: 'product',
    progressSentence: 'Showing slide {{currentSlide}} of {{totalSlides}}',
    share: 'share',
    shopCta: 'Shop',
    socialMediaLink: 'social media link',
  },
  legal: {
    legalNewsletterLink:
      'https://www.giant-bicycles.com/global/legal/terms-and-conditions',
    legalNewsletterText:
      'I would like to sign up and learn about new products, special events and get riding tips sent straight to my inbox every week. See how we protect your personal information',
    legalNewsletterTextLink: 'here.',
    legalNewsletterTextLinkAriaLabel: 'link to the terms and conditions',
  },
  modal: {
    closeModal: 'Close modal',
  },
  navigation: {
    backToHomepage: 'Giant Bicycles homepage',
    backToMainMenu: 'Back to main menu',
    closeMenu: 'Close menu',
    logo: 'logo',
    mainMenu: 'Main menu',
    openCart: 'Open cart',
    openMenu: 'Open menu',
  },
  portraitImageGallery: {
    nextImage: 'Next image',
    previousImage: 'Previous image',
  },
  productDetails: {
    relatedProductsNext: 'Go to next product',
    relatedProductsPrevious: 'Go to previous product',
  },
  productSeriesCarousel: {
    linkNarration: 'Press Enter to navigate to {{linkText}}',
    nextImage: 'Next image',
    previousImage: 'Previous image',
    progressSentence: 'Product slide {{currentSlide}} of {{totalSlides}}',
  },
  search: {
    clearBtn: 'Clear search',
    inputLabel: 'Search',
    inputPlaceholder: 'What are you looking for?',
    instantContent: 'Related content',
    instantProducts: 'Suggested products',
    recentSearches: 'Recent searches',
    recommendedCategories: 'Recommended categories',
    searchToggleBtn: 'Search',
    showAllResults: 'Show all {{count}} results',
    showOneResult: 'Show 1 result',
    submitBtn: 'Search',
    suggestionsLabel: 'Search suggestions',
  },
  ugcEndorsements: {
    endorsementNext: 'Next endorsement',
    endorsementPrevious: 'Previous endorsement',
  },
  video: {
    mediaPlayer: 'media player',
    pause: 'Pause video',
    pauseDecorative:
      'Pause decorative background video. Visuals do not add information beyond atmosphere.',
    play: 'Play video',
    playDecorative:
      'Play decorative background video. Visuals do not add information beyond atmosphere.',
  },
};

export default dictionary;
