import { fn } from 'storybook/test';
import type {
  SearchBarSuggestionsProps,
  SuggestionsSection,
} from './search-bar-suggestions';

export const suggestedCategories: SuggestionsSection = {
  items: [
    {
      title: 'Electric bikes',
      titleHighlighted: 'Electric bik<mark>es</mark>',
      url: '/categories/electronics',
    },
    {
      title: 'Road bikes',
      titleHighlighted: 'Road bik<mark>es</mark>',
      url: '/categories/road-bikes',
    },
    {
      title: 'Mountain bikes',
      titleHighlighted: 'Mountain bik<mark>es</mark>',
      url: '/categories/mountain-bikes',
    },
    {
      title: 'Accessories',
      titleHighlighted: 'Accessories',
      url: '/categories/accessories',
    },
  ],
  title: 'Recommended categories',
};

export const suggestedProducts: SuggestionsSection = {
  bottomLink: {
    title: 'Show all 123 results',
    url: '/search?q=value',
  },
  items: [
    {
      image: 'https://placehold.co/48x48',
      subtitle: 'Dirt Bikes',
      subtitleHighlighted: 'Dirt <mark>Bikes</mark>',
      title: 'RFX 800 Mountain Bike',
      titleHighlighted: 'RFX 800 Mountain <mark>Bike</mark>',
      url: '/categories/dirt-bikes',
    },
    {
      brand: 'liv',
      image: 'https://placehold.co/48x48',
      subtitle: 'Road Bikes',
      subtitleHighlighted: 'Road <mark>Bikes</mark>',
      title: 'Endurance Road Bike',
      titleHighlighted: 'Endurance Road <mark>Bike</mark>',
      url: '/categories/endurance-road-bikes',
    },
    {
      brand: 'momentum',
      image: 'https://placehold.co/48x48',
      subtitle: 'Mountain Bikes',
      subtitleHighlighted: 'Mountain <mark>Bikes</mark>',
      title: 'RFX 800 Mountain Bike',
      titleHighlighted: 'RFX 800 Mountain <mark>Bike</mark>',
      url: '/categories/mountain-bikes',
    },
    {
      brand: 'giant',
      image: 'https://placehold.co/48x48',
      subtitle: 'Electric Road Bikes',
      subtitleHighlighted: 'Electric Road <mark>Bikes</mark>',
      title: 'Defy E+ Advanced 2',
      titleHighlighted: 'Defy E+ Advanced 2',
      url: '/categories/electric-road-bikes',
    },
  ],
  title: 'Suggested products',
};

export const recentSearches: SuggestionsSection = {
  items: [
    {
      icon: 'Search_24',
      title: 'E-bikes',
      titleHighlighted: 'E-bik<mark>es</mark>',
      url: '/search?q=e-bikes',
    },
    {
      icon: 'Search_24',
      title: 'Road bikes',
      titleHighlighted: 'Road bik<mark>es</mark>',
      url: '/search?q=road-bikes',
    },
    {
      icon: 'Search_24',
      title: 'Mountain bikes',
      titleHighlighted: 'Mountain bik<mark>es</mark>',
      url: '/search?q=mountain-bikes',
    },
  ],
  title: 'Recent searches',
};

const defaultStub: SearchBarSuggestionsProps = {
  onFocusOut: fn(),
  query: 'bike',
  suggestions: [recentSearches],
};

const twoSectionsStub: SearchBarSuggestionsProps = {
  onFocusOut: fn(),
  query: 'rfx',
  suggestions: [suggestedProducts, suggestedCategories],
};

export default <Record<string, SearchBarSuggestionsProps>>{
  default: defaultStub,
  twoSections: twoSectionsStub,
};
