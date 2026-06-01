import { GetStaticPropsContext } from 'next';
import { getLocaleParam } from 'libraries/getters/get-page-route-params';
import {
  FALLBACK_LOCALE,
  isSupportedLocale,
  normalizeLocale,
} from 'libraries/getters/locale-config';
import { fallbackErrorPageProps } from 'pages/404';
import { getDictionary } from '../endpoints/dictionary/dictionary';
import { getFooter } from '../endpoints/footer/footer';
import { getGlobalSettings } from '../endpoints/global-settings/global-settings';
import { getHierarchyByKey } from '../endpoints/hierarchy-api/get-hierarchy';
import { getNavigation } from '../endpoints/navigation/navigation';
import { NavigationAdaptor } from '../endpoints/navigation/navigation.types';
import { PreviewData, SharedPropsOptions } from './page.types';
import {
  getPage,
  recursivelyGenerateUrls,
  slugAsString,
} from './page-helper-functions';

const MAXIMUM_DEPTH_LINK_HIERARCHY = 14; // 14 because that is the maximum depth of the hierarchy, so this way we don't limit amount of nested links
const IS_DEV = process.env.NODE_ENV !== 'production';
const DEV_ENABLED_STAGING =
  process.env.NEXT_PUBLIC_AMPLIENCE_STAGING_ENV && IS_DEV // This is to enable a more smooth development experience
    ? process.env.NEXT_PUBLIC_AMPLIENCE_STAGING_ENV
    : undefined;

const getRevalidateSeconds = () =>
  process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME, 10) : 600;

export const getSharedStaticProps = async (
  context: GetStaticPropsContext,
  options?: SharedPropsOptions,
) => {
  const { params, preview, previewData } = context;
  const locale = normalizeLocale(
    options?.localeOverride || getLocaleParam(params) || FALLBACK_LOCALE,
  );

  if (!locale || !isSupportedLocale(locale)) {
    throw new Error('no locale');
  }

  try {
    const hasSlug = options?.slugOverride || params?.slug;

    if (!hasSlug) {
      throw new Error('no page slug');
    }

    const slug = options?.slugOverride
      ? slugAsString(hasSlug)
      : locale + '/' + slugAsString(hasSlug);

    let pageContentCall = () => getPage(slug, { locale }, DEV_ENABLED_STAGING);

    if (preview && previewData) {
      const { stagingEnvironment } = previewData as PreviewData;

      pageContentCall = () => getPage(slug, { locale }, stagingEnvironment);
    }

    /** We fetch the Hierarchy and map all deliveryId to the deliveryKey
     * Record<deliveryId, deliveryKey>
     * Reason: Amplience does not deliver the deliveryKey in the ContentReference object
     * We need the deliveryKey to generate the correct internal links
     */
    let hierarchy;

    const getInternalLinkMap = async () => {
      hierarchy = await (<any>getHierarchyByKey(locale, {
        locale,
        maximumDepth: MAXIMUM_DEPTH_LINK_HIERARCHY,
        stagingEnvironment: DEV_ENABLED_STAGING,
      }));

      if (!hierarchy || !!hierarchy?.error) {
        hierarchy = {};

        return hierarchy;
      }

      return recursivelyGenerateUrls(hierarchy, locale);
    };

    const statuses = await Promise.all([
      pageContentCall(),
      getDictionary(locale, DEV_ENABLED_STAGING),
      getNavigation(locale, DEV_ENABLED_STAGING),
      getFooter(locale, DEV_ENABLED_STAGING),
      getGlobalSettings(locale, DEV_ENABLED_STAGING),
      getInternalLinkMap(),
    ]);

    const [
      data,
      dictionary,
      navigation,
      footer,
      globalSettings,
      internalLinkMap,
    ] = statuses;

    const mainNavigation =
      navigation && 'mainNavigation' in navigation
        ? {
            ...(navigation as NavigationAdaptor).mainNavigation,
            isSearchBarEnabled: globalSettings?.isSearchBarEnabled ?? false,
            isShoppingCartEnabled:
              globalSettings?.isShoppingCartEnabled ?? false,
          }
        : undefined;

    const props = {
      ...data,
      dictionary,
      ...navigation,
      ...(mainNavigation !== undefined && { mainNavigation }),
      footer: { ...footer },
      hierarchy,
      internalLinkMap,
      previewData: previewData || null,
    };

    if (options?.forServerSide) {
      return { props };
    }

    return {
      props,
      revalidate: getRevalidateSeconds(),
    };
  } catch (error: any) {
    if (error.status && error.status === 404) {
      if (options?.forServerSide) {
        return { notFound: true };
      }

      return {
        notFound: true,
        props: fallbackErrorPageProps,
        revalidate: getRevalidateSeconds(),
      };
    }

    throw error;
  }
};
