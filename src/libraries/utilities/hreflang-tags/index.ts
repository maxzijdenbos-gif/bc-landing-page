import { NextRouter } from 'next/router';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import {
  extractLocaleFromPath,
  getLocaleFromAsPath,
} from 'libraries/getters/get-locale';
import { getUrlFromPath } from 'libraries/getters/get-url';

export const displayHrefLangTag = ({
  canonicalPath,
  router,
  seoFields,
}: {
  canonicalPath?: string;
  router: NextRouter;
  seoFields: PageAdapter['seoFields'];
}) => {
  const { cleanPath, localeInPath, normalizedPath } = extractLocaleFromPath(
    router.asPath,
  );
  const locale = getLocaleFromAsPath(router.asPath);

  // Prevent double locale by checking if path already has a locale
  const urlPath = localeInPath ? cleanPath : `${locale}${normalizedPath}`;

  const currentUrl = getUrlFromPath(urlPath);

  if (currentUrl !== canonicalPath) return false; // Only display hreflang tag on canonical page

  return !!seoFields?.metaRobotsIndex; // Only display hreflang tag if page is indexable
};
