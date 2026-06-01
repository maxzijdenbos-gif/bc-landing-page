import { ContentModuleName } from 'components/utilities/content-modules/content-modules';
import { removeLocalizedSuffix } from 'integrations/content/amplience/endpoints/management/content-management-helper-functions';
import {
  InternalLinkLocaleMap,
  InternalLinkMapTypeRecord,
} from 'libraries/contexts/internal-navigation-context';
import getLocale, { FALLBACK_LOCALE } from 'libraries/getters/get-locale';
import { getContentDeliveryIds } from '../endpoints/get-content/get-content-delivery-ids';
import {
  ContentDeliveryError,
  getContentDeliveryKey,
} from '../endpoints/get-content/get-content-delivery-key';
import {
  fetchBreadcrumbs,
  getBreadCrumbFromContentPageResponse,
} from '../endpoints/hierarchy-links/breadcrumbs/breadcrumbs';
import getDrillDown from '../endpoints/hierarchy-links/drilldown/drilldown';
import { fetchPageSchemas } from '../endpoints/schema/schema';
import { errorAdapter } from '../error/error.adapter';
import { isErrorResponse } from '../error/error.response';
import {
  ContentModuleResponse,
  ContentPageResponse,
  ContentTeaserListElementResponse,
} from '../types/content-types';
import { pageAdapter } from './page.adapter';
import { splitSchemaName } from './page.adapter';

// start dynamic teaser list content helper functions
const TEASER_LIST_MODULE_NAME = 'TeaserListContent';
const TEASER_LIST_ELEMENT_IS_REFERENCE_TO_ARTICLE = 'semiManual';
const TEASER_LIST_ELEMENT_MAX_NUM_OF_TAGS = 2;

const isTeaserListComponent = (moduleName: ContentModuleName): boolean =>
  TEASER_LIST_MODULE_NAME === moduleName;

const teaserListElementIsSemiManuel = (
  element: ContentTeaserListElementResponse,
) => {
  return element.type === TEASER_LIST_ELEMENT_IS_REFERENCE_TO_ARTICLE;
};
const teaserListHasSemiManuelElement = (module: ContentModuleResponse) => {
  const teaserElementsSource =
    module.isVisualization && module.data?.teaserElements
      ? module.data.teaserElements
      : module.teaserElements;

  return !!teaserElementsSource?.some(
    (element: ContentTeaserListElementResponse) =>
      teaserListElementIsSemiManuel(element),
  );
};

export const formatArticleDataToTeaserElement = (
  articlesData?: ContentPageResponse,
) => {
  if (!articlesData) return;
  const { deliveryId } = articlesData._meta;
  const { tags, topModules } = articlesData;

  if (!topModules) return;
  const { imageObject, headline, title } = topModules[0];

  const formattedTags = tags
    ?.filter(({ hide, tag }) => !hide && tag?.[0].tagText)
    .map(({ tag }) => tag?.[0].tagText)
    .slice(0, TEASER_LIST_ELEMENT_MAX_NUM_OF_TAGS);

  const teaserListElement = {
    imageObject: imageObject ?? null, // null as undefined cannot be serialized
    link: [{ internalLinkRef: [{ id: deliveryId }] }],
    teaserHeadline: headline ?? title ?? null, // null as undefined cannot be serialized
    teaserTags: formattedTags ?? null, // null as undefined cannot be serialized
    teaserType: 'content',
  };

  return teaserListElement;
};

const getArticlesData = async ({
  deliveryIds,
  locale,
  stagingEnv,
}: {
  deliveryIds: string[];
  locale?: string;
  stagingEnv?: string;
}) => {
  try {
    const articlesData = await getContentDeliveryIds({
      ids: deliveryIds,
      locale,
      stagingEnvironment: stagingEnv,
    });

    return articlesData;
  } catch (error) {
    return null;
  }
};

const teaserListElementAdaptor = (
  teaserElement: ContentTeaserListElementResponse,
) => {
  delete teaserElement.articleRef;
  delete teaserElement.type;

  return teaserElement;
};

export const populateTeaserListWithDynamicContent = async (
  response: ContentPageResponse,
  locale?: string,
  isVisualization?: boolean,
  stagingEnv?: string,
) => {
  if (!response.modules) {
    return response;
  } else {
    const modulesToPopulate = await Promise.all(
      response.modules.map(async (module: ContentModuleResponse) => {
        const moduleName = removeLocalizedSuffix(
          splitSchemaName(module._meta.schema),
        ) as ContentModuleName;

        const teaserElementsSource =
          isVisualization && module.data?.teaserElements
            ? module.data.teaserElements
            : module.teaserElements;

        if (!isTeaserListComponent(moduleName)) return module;
        if (module.populationMode === 'automatic') {
          return module;
        } else if (teaserListHasSemiManuelElement(module)) {
          const articleIdsToFetch = teaserElementsSource
            .map(
              (teaserElement: ContentTeaserListElementResponse) =>
                teaserElement.articleRef?.[0]?.id,
            )
            .filter((id: string | undefined) => !!id);

          const articlesData =
            (await getArticlesData({
              deliveryIds: articleIdsToFetch,
              locale,
              stagingEnv: isVisualization
                ? process.env.NEXT_PUBLIC_AMPLIENCE_STAGING_ENV
                : stagingEnv,
            })) ?? [];

          // We need to loop over elements in module payload to keep the order
          const allTeaserElements = teaserElementsSource
            .map((element: ContentTeaserListElementResponse) => {
              if (teaserListElementIsSemiManuel(element)) {
                const elementData = articlesData.find(
                  (articleData) =>
                    articleData?.content?._meta?.deliveryId ===
                    element.articleRef?.[0]?.id,
                );

                return elementData?.content
                  ? formatArticleDataToTeaserElement(elementData.content)
                  : null;
              } else {
                return teaserListElementAdaptor(element) ?? null;
              }
            })
            .filter((el: null): el is NonNullable<typeof el> => el !== null);

          return {
            ...module,
            teaserElements: allTeaserElements,
          };
        } else {
          return module;
        }
      }),
    );

    return { ...response, modules: modulesToPopulate };
  }
};
// end dynamic teaser list content helper functions

export const fetchBreadcrumbsAndDrilldown = async (
  response: ContentPageResponse,
  locale: Locale,
  stagingEnv?: string,
) => {
  const hierarchyLinks: Promise<
    Record<'breadcrumbLinks', BaseLink[]> | Record<'drilldownLinks', BaseLink[]>
  >[] = [];

  if (response._meta?.hierarchy?.parentId) {
    hierarchyLinks.push(
      fetchBreadcrumbs(
        response._meta?.hierarchy?.parentId,
        [],
        locale,
        stagingEnv,
      ),
    );
  }

  if (response.pageNavigation?.hasBreadcrumbs && response._meta?.deliveryId) {
    hierarchyLinks.push(
      getDrillDown(response._meta?.deliveryId, locale, stagingEnv),
    );
  }

  const [parentBreadcrumbs, drilldownLinks] = await Promise.all(hierarchyLinks);

  const currentLink =
    getBreadCrumbFromContentPageResponse({ ...response, locale }) || null;

  // Combine parent breadcrumbs with current page link
  const parentLinks =
    (parentBreadcrumbs as { breadcrumbLinks: BaseLink[] })?.breadcrumbLinks ||
    [];
  const breadcrumbLinks = {
    breadcrumbLinks: [...parentLinks, ...(currentLink ? [currentLink] : [])],
  };

  return { breadcrumbLinks, currentLink, drilldownLinks };
};

export const errorFallbackSlug: Record<number, string | undefined> = {
  404: 'error-404',
};

export const slugAsString = (slug: string | string[]) => {
  return typeof slug === 'object' ? slug.join('/') : slug;
};

const mapInternalLinkAndLocale = (array: Record<string, string>[]) => {
  const localeLinkObject: InternalLinkLocaleMap = {};

  array.forEach((item) => {
    const locale = getLocale(item.value.split('/')[0]);
    const link = item.value;

    localeLinkObject[locale] = link;
  });

  return localeLinkObject;
};

// Helps to recursively generate urls for the internalLinkMap
export const recursivelyGenerateUrls = (
  { content, children }: { children: any[]; content: any },
  locale: Locale,
  urls: InternalLinkMapTypeRecord = {},
) => {
  if (content?._meta?.deliveryKeys || content?._meta?.deliveryKey)
    urls[content._meta.deliveryId] = content._meta.deliveryKeys // If the content has multiple deliveryKeys, we use the first one
      ? mapInternalLinkAndLocale(content._meta.deliveryKeys.values) // Since keys should be identical, except for the locale
      : { [locale]: content._meta.deliveryKey }; // If no deliveryKeys are present, we try to use the deliveryKey

  for (const child of children || []) {
    recursivelyGenerateUrls(child, locale, urls);
  }

  return urls;
};

export const getPage = async (
  slug: string,
  options?: {
    locale?: string;
  },
  stagingEnv?: string,
): Promise<any> => {
  let response;

  // Used for tracking purposes
  let customError: Record<string, string | undefined> | undefined = undefined;

  try {
    // Locale is either supplied or fallback
    const locale = options?.locale || FALLBACK_LOCALE;

    // In the case that the requested slug is actually just a locale, we should not add it as a slug to the getContentDeliveryKey call to prevent eg. en-us/en-us
    response = await getContentDeliveryKey<ContentPageResponse>({
      locale,
      slug,
      stagingEnvironment: stagingEnv,
    });
    const { breadcrumbLinks, currentLink, drilldownLinks } =
      await fetchBreadcrumbsAndDrilldown(response, locale, stagingEnv);

    response = (await populateTeaserListWithDynamicContent(
      response,
      locale,
      false,
      stagingEnv,
    )) as ContentPageResponse;

    const pageSchemas = await fetchPageSchemas(locale, stagingEnv);

    response = {
      ...response,
      ...breadcrumbLinks,
      currentLink,
      ...drilldownLinks,
      pageSchemas,
    };
  } catch (error) {
    const { message, status } = error as ContentDeliveryError;

    if (!status) throw new Error(message);

    customError = {
      errorMessage: message,
      errorType: `${status}`,
    };

    const fallbackSlug = errorFallbackSlug[status];

    if (fallbackSlug) {
      const locale = options?.locale || FALLBACK_LOCALE;

      response = await getContentDeliveryKey({
        locale,
        slug: locale + '-' + fallbackSlug,
        stagingEnvironment: stagingEnv,
      });
    } else {
      throw error;
    }
  }

  return isErrorResponse(response) || !response
    ? errorAdapter(response)
    : pageAdapter(response, customError);
};
