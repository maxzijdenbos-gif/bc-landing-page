import { fn } from 'storybook/test';
import type { SearchBarProps } from './search-bar';
import {
  recentSearches,
  suggestedCategories,
  suggestedProducts,
} from './search-bar-suggestions.stubs';

const defaultStub: SearchBarProps = {
  onChange: fn(),
  onClear: fn(),
  onSubmit: fn(),
  suggestions: [recentSearches],
};

const twoSectionsStub: SearchBarProps = {
  ...defaultStub,
  suggestions: [suggestedProducts, suggestedCategories],
};

export default <Record<string, SearchBarProps>>{
  default: defaultStub,
  twoSections: twoSectionsStub,
};
