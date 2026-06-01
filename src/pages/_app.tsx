import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MODAL_ROOT_ID } from 'constants/index';
import { merge } from 'lodash';
import { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { I18nProvider } from 'next-localization';
import React from 'react';
import { ActiveModalProvider } from 'components/utilities/modal/context/modal-context';
import { DictionaryProps } from 'integrations/content/amplience/endpoints/dictionary/dictionary.types';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import { GTMHeadScript } from 'integrations/tracking/google-tag-manager/scripts';
import BreakpointContext from 'libraries/contexts/breakpoint-context';
import { CookieConsentContextProvider } from 'libraries/contexts/cookie-consent-context';
import InternalLinksContextProvider, {
  InternalLinkMapTypeRecord,
} from 'libraries/contexts/internal-navigation-context';
import { LoaderProvider } from 'libraries/contexts/loader-context';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import useSetupBreakpoints from 'libraries/hooks/dom/use-setupBreakpoints';
import { fontOpenSans } from 'libraries/utilities/global-fonts/open-sans';
import { SitemapNodeProps } from '../components/organisms/module-sitemap/module-sitemap';
import 'styles/_app.scss';

const THEME = process.env.NEXT_PUBLIC_THEME_NAME as Theme;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: 500,
    },
  },
});

export interface CustomAppProps extends AppProps {
  pageProps: PageAdapter & {
    dictionary: DictionaryProps;
    hierarchy?: SitemapNodeProps;
    internalLinkMap: InternalLinkMapTypeRecord;
    page?: string;
    previewData?: any;
  };
}

const ConsentBoundTracking = dynamic(
  () =>
    import('integrations/tracking/google-tag-manager/consent-bound-tracking'),
  { ssr: false },
);
const PageProgressLoader = dynamic(
  () =>
    import('components/utilities/page-progress-loader/page-progress-loader'),
  { ssr: false },
);
const PreviewIndicator = dynamic(
  () => import('components/molecules/preview-indicator/preview-indicator'),
  { ssr: false },
);

const CustomApp = ({ Component, pageProps }: CustomAppProps) => {
  const router = useRouter();
  const {
    breakpoint,
    isBelowDesktopView,
    isDesktop,
    isDesktopView,
    isLaptopOrAbove,
    isTabletOrAbove,
  } = useSetupBreakpoints();

  return (
    <React.Fragment>
      {/* Preconnect for GTM */}
      <link href="https://www.googletagmanager.com" rel="preconnect" />

      {/* DNS Prefetch as a fallback */}
      <link href="https://www.googletagmanager.com" rel="dns-prefetch" />
      <Script defer id="gtm-script" strategy="afterInteractive">
        {GTMHeadScript}
      </Script>
      {THEME === 'giant' && (
        <style global jsx>{`
          html {
            --fontFamily-body: ${fontOpenSans.style.fontFamily};
          }
        `}</style>
      )}

      <PageProgressLoader />

      <QueryClientProvider client={queryClient}>
        <I18nProvider
          lngDict={
            pageProps.dictionary
              ? merge(
                  pageProps.dictionary?.default,
                  pageProps.dictionary?.localizedDictionary ?? {},
                )
              : {}
          }
          locale={getLocaleFromAsPath(router.asPath)}
        >
          <LoaderProvider>
            <BreakpointContext.Provider
              value={{
                breakpoint,
                isBelowDesktopView,
                isDesktop,
                isDesktopView,
                isLaptopOrAbove,
                isTabletOrAbove,
              }}
            >
              <InternalLinksContextProvider
                hierarchy={pageProps?.hierarchy}
                internalLinks={pageProps?.internalLinkMap}
              >
                <CookieConsentContextProvider>
                  {pageProps && <ConsentBoundTracking pageProps={pageProps} />}
                  <ActiveModalProvider>
                    <Component {...pageProps} />
                    <div id={MODAL_ROOT_ID} />
                    {!!pageProps?.previewData?.displayIndicator && (
                      <PreviewIndicator {...pageProps?.previewData} />
                    )}
                  </ActiveModalProvider>
                </CookieConsentContextProvider>
              </InternalLinksContextProvider>
            </BreakpointContext.Provider>
          </LoaderProvider>
        </I18nProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
};

export default CustomApp;
