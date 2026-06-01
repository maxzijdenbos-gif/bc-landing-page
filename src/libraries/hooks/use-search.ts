import { keepPreviousData } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import type {
  SuggestionsItem,
  SuggestionsSection,
} from 'components/organisms/search-bar/search-bar-suggestions';
import type {
  EcommerceApiBrand,
  InstantSearchResponse,
  SearchSuggestionsData,
} from 'integrations/ecommerce-api/ecommerce-api.types';
import { ecommerceApiQuery } from 'integrations/ecommerce-api/ecommerce-client';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import { getMainSiteSearchUrlForKeyword } from 'libraries/getters/get-main-site-search-url';
import { useDebouncedValue } from 'libraries/hooks/use-debounced-value';
import { getRecentSearchKeywords } from 'libraries/storage/recent-search-keywords';
import { toEcommerceApiLocale } from 'libraries/utilities/locale/to-ecommerce-api-locale';

/** GET /search/suggestions (`get-search-suggestions`) */
export const SEARCH_SUGGESTIONS_PATH = '/search/suggestions' as const;

/** GET /search/instant (`get-search-instant`) */
export const SEARCH_INSTANT_PATH = '/search/instant' as const;

/** Minimum trimmed characters before calling GET /search/instant. */
export const INSTANT_SEARCH_MIN_QUERY_LENGTH = 3;

/** Wait this long after the last keystroke before calling GET /search/instant. */
export const INSTANT_SEARCH_DEBOUNCE_MS = 250;

function resolveSearchBrand(): EcommerceApiBrand {
  return process.env.NEXT_PUBLIC_THEME_NAME === 'liv' ? 'liv' : 'giant';
}

function toSuggestionsItemBrand(brand: unknown): SuggestionsItem['brand'] {
  return typeof brand === 'string'
    ? (brand as SuggestionsItem['brand'])
    : undefined;
}

export function mapSearchSuggestionsResponseToSection(
  data: { suggestions?: SearchSuggestionsData[] | null } | undefined | null,
  sectionTitle: string,
): SuggestionsSection | undefined {
  const list = data?.suggestions;
  if (!list?.length) return undefined;

  const items = list.map((s) => ({
    title: s.name,
    url: s.url,
  }));

  if (!items.length) return undefined;

  return {
    items,
    title: sectionTitle,
  };
}

function mapInstantSearchResponseToSections(
  data: InstantSearchResponse | undefined,
  productSectionTitle: string,
  contentSectionTitle: string,
  keyword: string,
  formatShowAllResults: (totalCount: number) => string,
  locale: string,
): SuggestionsSection[] | undefined {
  if (!data) return undefined;

  const sections: SuggestionsSection[] = [];

  const productItems = (data.products ?? []).map((p) => ({
    brand: toSuggestionsItemBrand(p.brand),
    image: p.imageUrl,
    subtitle: p.categoryName,
    subtitleHighlighted: p.highlightedCategoryName ?? undefined,
    title: p.name,
    titleHighlighted: p.highlightedName ?? undefined,
    url: p.url,
  }));

  if (productItems.length) {
    sections.push({
      items: productItems,
      title: productSectionTitle,
    });
  }

  const contentItems = (data.content ?? []).map((c) => ({
    title: c.name,
    titleHighlighted: c.highlightedName ?? undefined,
    url: c.url,
  }));

  if (contentItems.length) {
    sections.push({
      items: contentItems,
      title: contentSectionTitle,
    });
  }

  if (!sections.length) return undefined;

  const first = sections[0];
  sections[0] = {
    ...first,
    bottomLink: {
      title: formatShowAllResults(data.totalCount),
      url: getMainSiteSearchUrlForKeyword(keyword, locale),
    },
  };

  return sections;
}

export type UseSearchLabels = {
  formatShowAllResults: (totalCount: number) => string;
  instantContent: string;
  instantProducts: string;
  recentSearches: string;
  recommendedCategories: string;
};

/**
 * E-commerce search: recommended categories (GET /search/suggestions) and instant
 * typeahead (GET /search/instant) after {@link INSTANT_SEARCH_MIN_QUERY_LENGTH} trimmed
 * characters, debounced by {@link INSTANT_SEARCH_DEBOUNCE_MS}. Locale follows `asPath`
 * for `[locale]` routes.
 */
export function useSearch(labels: UseSearchLabels): {
  fetchSearchSuggestions: () => void;
  isIdleSearch: boolean;
  onSearchBarQueryChange: (value: string) => void;
  searchBarSuggestions: SuggestionsSection[] | undefined;
} {
  const { asPath } = useRouter();
  const [keyword, setKeyword] = useState('');
  const trimmedKeyword = keyword.trim();
  const debouncedKeyword = useDebouncedValue(
    keyword,
    INSTANT_SEARCH_DEBOUNCE_MS,
  );
  const debouncedTrimmed = debouncedKeyword.trim();

  const pathLocale = useMemo(() => getLocaleFromAsPath(asPath), [asPath]);

  const apiLocale = useMemo(
    () => toEcommerceApiLocale(pathLocale),
    [pathLocale],
  );

  const { data, isFetching, isSuccess, refetch } = ecommerceApiQuery.useQuery(
    'get',
    SEARCH_SUGGESTIONS_PATH,
    {
      params: {
        query: {
          Brand: resolveSearchBrand(),
          Locale: apiLocale,
        },
      },
    },
    {
      enabled: false,
      /** One successful response per locale/brand key until a full page reload (new JS session). */
      gcTime: Number.POSITIVE_INFINITY,
      staleTime: Number.POSITIVE_INFINITY,
    },
  );

  const { data: instantData } = ecommerceApiQuery.useQuery(
    'get',
    SEARCH_INSTANT_PATH,
    {
      params: {
        query: {
          Brand: resolveSearchBrand(),
          Locale: apiLocale,
          Query: debouncedTrimmed,
        },
      },
    },
    {
      enabled: debouncedTrimmed.length >= INSTANT_SEARCH_MIN_QUERY_LENGTH,
      gcTime: 5 * 60 * 1000,
      placeholderData: keepPreviousData,
      staleTime: 0,
    },
  );

  const recommendedSection = useMemo(
    () =>
      mapSearchSuggestionsResponseToSection(data, labels.recommendedCategories),
    [data, labels.recommendedCategories],
  );

  const instantSections = useMemo(
    () =>
      mapInstantSearchResponseToSections(
        instantData,
        labels.instantProducts,
        labels.instantContent,
        trimmedKeyword,
        labels.formatShowAllResults,
        pathLocale,
      ),
    [
      instantData,
      labels.formatShowAllResults,
      labels.instantContent,
      labels.instantProducts,
      pathLocale,
      trimmedKeyword,
    ],
  );

  const { isIdleSearch, searchBarSuggestions } = useMemo(() => {
    const idleSections = (): SuggestionsSection[] | undefined => {
      const sections: SuggestionsSection[] = [];
      if (recommendedSection) sections.push(recommendedSection);
      const keywords = getRecentSearchKeywords();
      if (keywords.length) {
        sections.push({
          items: keywords.map((kw) => ({
            icon: 'Search_24',
            title: kw,
            url: getMainSiteSearchUrlForKeyword(kw, pathLocale),
          })),
          title: labels.recentSearches,
        });
      }
      return sections.length ? sections : undefined;
    };

    if (trimmedKeyword.length < INSTANT_SEARCH_MIN_QUERY_LENGTH) {
      return {
        isIdleSearch: true,
        searchBarSuggestions: idleSections(),
      };
    }
    if (debouncedTrimmed.length < INSTANT_SEARCH_MIN_QUERY_LENGTH) {
      return {
        isIdleSearch: true,
        searchBarSuggestions: idleSections(),
      };
    }
    return {
      isIdleSearch: false,
      searchBarSuggestions: instantSections,
    };
  }, [
    debouncedTrimmed,
    instantSections,
    labels.recentSearches,
    pathLocale,
    recommendedSection,
    trimmedKeyword,
  ]);

  const fetchSearchSuggestions = useCallback(() => {
    if (isSuccess || isFetching) return;
    void refetch();
  }, [isFetching, isSuccess, refetch]);

  const onSearchBarQueryChange = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  return {
    fetchSearchSuggestions,
    isIdleSearch,
    onSearchBarQueryChange,
    searchBarSuggestions,
  };
}
