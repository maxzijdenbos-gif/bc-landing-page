import { useRouter } from 'next/dist/client/router';
import { Fragment, memo, useEffect, useRef } from 'react';
import { useCookieConsentContext } from 'libraries/contexts/cookie-consent-context';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import useScrollInfo from 'libraries/hooks/dom/use-scroll-info';
import { CustomAppProps } from 'pages/_app';
import {
  gtmVirtualPageView,
  trackCustomError,
  trackCustomPageView,
  trackCustomScroll,
} from './scripts';

const TRACKING_WAIT_TIME = 500;
const SCROLL_RATIO_THRESHOLDS = [1.0, 0.75, 0.5, 0.25]; // Define the thresholds for reporting.

const ConsentBoundTracking = ({
  pageProps,
}: {
  pageProps: CustomAppProps['pageProps'];
}) => {
  const router = useRouter();
  const locale = getLocaleFromAsPath(router.asPath);
  const didReportInitialPageView = useRef(false);
  const { acceptsStatisticCookies } = useCookieConsentContext();
  const triggeredThresholds = useRef<Set<number>>(new Set());
  const renderedAt = useRef<number | null>(null);
  const didReportError = useRef(false);

  useEffect(() => {
    renderedAt.current = performance.now();
  }, []);

  // Report initial page view and also when the page view changes
  useEffect(() => {
    // Only start reporting once consent has been given. This event is also required for emptying the pending events buffer, so this is the best place to guard.
    if (!acceptsStatisticCookies) return;

    const trackCustomPageViewLater = () =>
      setTimeout(
        () => trackCustomPageView({ market: locale }),
        TRACKING_WAIT_TIME,
      );

    if (!didReportInitialPageView.current) {
      didReportInitialPageView.current = true;
      trackCustomPageViewLater();
    }

    router.events.on('routeChangeComplete', trackCustomPageViewLater);

    return () => {
      router.events.off('routeChangeComplete', trackCustomPageViewLater);
    };
  }, [acceptsStatisticCookies, locale, router]);

  // Report custom error in the client if set
  useEffect(() => {
    if (pageProps.customError && !didReportError.current) {
      didReportError.current = true;
      trackCustomError({
        errorMessage: pageProps.customError.errorMessage,
        errorType: pageProps.customError.errorType,
      });
    }
  }, [pageProps.customError]);

  useEffect(() => {
    const mainDataLayer = {
      pageName: pageProps?.seoFields?.metaTitle || '',
      pageType: pageProps?.seoFields?.ogType,
      pageTypeName: pageProps.page || null,
    };

    gtmVirtualPageView(mainDataLayer);

    triggeredThresholds.current = new Set(); // Reset thresholds on new page
  }, [pageProps, locale]);

  useScrollInfo({
    scrollProgressCallback: (progress) => {
      // Add a little grace to the progress ratio, rounding up the decimals only. ie. 0.99 stays 0.99 but 99.991% becomes 100%.
      const ratio = Math.ceil(progress * 100) / 100;

      // Return early in the case that the page probably is not done loading ( layout shift can trigger progress above the fold )
      if (
        renderedAt.current === null ||
        renderedAt.current + TRACKING_WAIT_TIME > performance.now()
      )
        return;

      // Find the highest possible threshold based on scroll ratio
      const highestEligibleThreshold = SCROLL_RATIO_THRESHOLDS.find(
        (threshold) => ratio >= threshold,
      ); // If ratio = 0.76, return 0.75, not 1.0

      // Retrieve the highest previously reached threshold
      const highestReachedThreshold = Math.max(
        ...(triggeredThresholds.current || []),
      );

      // Early return if no eligible threshold or eligible threshold is less than the highest reached
      if (
        !highestEligibleThreshold ||
        highestEligibleThreshold <= highestReachedThreshold
      )
        return;

      // Early return if previously reached same threshold
      if (triggeredThresholds.current.has(highestEligibleThreshold)) return;

      // Finally add the threshold for the record
      triggeredThresholds.current.add(highestEligibleThreshold);

      // Report to tracking
      trackCustomScroll({ scrollDepth: `${highestEligibleThreshold * 100}%` });
    },
  });

  return <Fragment></Fragment>;
};

export default memo(ConsentBoundTracking);
