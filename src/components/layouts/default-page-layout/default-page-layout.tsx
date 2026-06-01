import classNames from 'classnames';
import { APP_ROOT_ID } from 'constants/index';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import React, { useCallback, useMemo } from 'react';
import Footer, { FooterProps } from 'components/organisms/footer/footer';
import MainNavigation, {
  MainNavigationProps,
} from 'components/organisms/main-navigation/main-navigation';
import suggestionStyles from 'components/organisms/search-bar/search-bar-suggestions.module.scss';
import Head from 'components/utilities/head/head';
import SkipToMainContent, {
  SkipToMainContentProps,
} from 'components/utilities/skip-to-main-content/skip-to-main-content';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import {
  CookieInformationScript,
  GoogleV2ConsentModeScript,
} from 'integrations/tracking/cookieinformation/scripts';
import { GTMBodyTag } from 'integrations/tracking/google-tag-manager/scripts';
import HierarchyLinksContext from 'libraries/contexts/hierarchy-links-context';
import { MainNavigationContextProvider } from 'libraries/contexts/main-navigation-context';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import { getMainSiteSearchUrlForKeyword } from 'libraries/getters/get-main-site-search-url';
import { useCart } from 'libraries/hooks/use-cart';
import { useMessageBar } from 'libraries/hooks/use-message-bar';
import { useSearch } from 'libraries/hooks/use-search';
import { recordRecentSearchKeyword } from 'libraries/storage/recent-search-keywords';

interface DefaultPageLayoutProps extends PageAdapter {
  children?: React.ReactNode;
  footer?: FooterProps;
  hideTopNavigationBackground?: boolean;
  inIframe?: boolean;
  mainNavigation?: MainNavigationProps & SkipToMainContentProps;
}

const MAIN_CONTENT_ID = 'main-content';

export const DRAWER_CONTENT_ID = 'drawer-content';

const DefaultPageLayout = ({
  breadcrumbLinks,
  children,
  currentLink,
  inIframe,
  drilldownLinks,
  footer,
  hasOrgSchema,
  hideTopNavigationBackground,
  mainNavigation,
  modules,
  pageColor,
  pageSchemas,
  pageType,
  schemaData,
  seoFields,
  socialMediaSharing,
  topModules,
  videoSchemas,
}: DefaultPageLayoutProps) => {
  const router = useRouter();
  const { t } = useI18n();
  const { cartData, isCartLoading, onQuantityChange } = useCart();

  const showMainNavigation = Boolean(mainNavigation && !inIframe);
  const { messageBar } = useMessageBar(showMainNavigation);

  const searchLabels = useMemo(
    () => ({
      formatShowAllResults: (count: number) =>
        count === 1
          ? t('search.showOneResult')
          : t('search.showAllResults', { count }),
      instantContent: t('search.instantContent'),
      instantProducts: t('search.instantProducts'),
      recentSearches: t('search.recentSearches'),
      recommendedCategories: t('search.recommendedCategories'),
    }),
    [t],
  );

  const {
    fetchSearchSuggestions,
    isIdleSearch,
    onSearchBarQueryChange,
    searchBarSuggestions,
  } = useSearch(searchLabels);

  const searchBarSuggestionsClassName = useMemo(
    () =>
      classNames({
        [suggestionStyles.suggestionsMobileSectionReverse]: isIdleSearch,
      }) || undefined,
    [isIdleSearch],
  );

  const handleSearchNavigation = useCallback(
    (keyword: string) => {
      recordRecentSearchKeyword(keyword);
      window.location.assign(
        getMainSiteSearchUrlForKeyword(
          keyword,
          getLocaleFromAsPath(router.asPath),
        ),
      );
    },
    [router.asPath],
  );

  return (
    <React.Fragment>
      {!inIframe && (
        <Head
          breadcrumbLinks={breadcrumbLinks}
          currentLink={currentLink}
          hasOrgSchema={hasOrgSchema}
          languageChooserLink={footer?.languageLink?.link?.[0]?.externalLink}
          modules={modules}
          pageSchemas={pageSchemas}
          pageType={pageType}
          schemaData={schemaData}
          seoFields={seoFields}
          socialMediaSharing={socialMediaSharing}
          topModules={topModules}
          videoSchemas={videoSchemas}
        />
      )}
      {!inIframe && GoogleV2ConsentModeScript()}
      {!inIframe && CookieInformationScript(router?.locale)}
      {!inIframe && GTMBodyTag()}
      <div data-page-color={pageColor} id={APP_ROOT_ID}>
        {!inIframe && (
          <SkipToMainContent
            mainContentId={MAIN_CONTENT_ID}
            skipLinkText={mainNavigation?.skipLinkText}
          />
        )}
        <MainNavigationContextProvider>
          {mainNavigation && !inIframe && (
            <header>
              <MainNavigation
                {...mainNavigation}
                cart={cartData}
                cartLoading={isCartLoading}
                checkoutButton={mainNavigation.checkoutButton}
                hideTopNavigationBackground={hideTopNavigationBackground}
                messageBar={messageBar}
                onQuantityChange={onQuantityChange}
                onSearchBarChange={onSearchBarQueryChange}
                onSearchBarExpanded={fetchSearchSuggestions}
                onSearchBarSuggestionsBottomLinkClick={handleSearchNavigation}
                onSearchBarSubmit={handleSearchNavigation}
                searchBarSuggestions={searchBarSuggestions}
                searchBarSuggestionsClassName={searchBarSuggestionsClassName}
              />
            </header>
          )}
          <main id={MAIN_CONTENT_ID} role="main">
            <HierarchyLinksContext.Provider
              value={{
                breadcrumbLinks: breadcrumbLinks || [],
                currentLink: currentLink || null,
                drilldownLinks: drilldownLinks || [],
              }}
            >
              {children}
            </HierarchyLinksContext.Provider>
          </main>
        </MainNavigationContextProvider>
        {footer && !inIframe && <Footer {...footer} />}
        <div id={DRAWER_CONTENT_ID}></div>
      </div>
    </React.Fragment>
  );
};

export default DefaultPageLayout;
