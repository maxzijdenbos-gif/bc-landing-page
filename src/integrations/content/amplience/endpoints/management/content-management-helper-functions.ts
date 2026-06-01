import {
  ContentLinkInstance,
  ContentRepository,
  DynamicContent,
} from 'dc-management-sdk-js';
import {
  LOCALIZED_SCHEMA_SUFFIX,
  UpdatedContentItem,
} from './content-management.types';

const GLOBAL_LOCALE =
  process.env.NEXT_PUBLIC_AMPLIENCE_GLOBAL_LOCALE ?? 'en-US';

export const getUrlLinkForContentItem = (contentItemId: string) => {
  return `https://app.amplience.net/content/#!/${process.env.NEXT_PUBLIC_AMPLIENCE_HUB_ID}/authoring/content-item/edit/${contentItemId}`;
};

export const removeLocalizedSuffix = (schema?: string) => {
  if (!schema) {
    return '';
  }

  return schema.split(LOCALIZED_SCHEMA_SUFFIX)[0];
};

/**
 *
 * @param obj Modify the given object directly
 * @param locale looking for this locale
 * @returns nothing
 */
export const localizeRelevantContentItemValues = (
  obj: any,
  locale: string,
  locales: Locale[],
): any => {
  // Guard clause
  // If the value is not an object or null, return the value
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      localizeRelevantContentItemValues(item, locale, locales),
    );
  }

  for (const key in obj) {
    // object has 'values' attribute
    const objValuesKey = obj[key]?.values;

    if (
      Array.isArray(objValuesKey) && // The values we are looking for is an array
      objValuesKey?.length > 0 && // Needs to be populated
      typeof objValuesKey[0] === 'object' && // The first value is an object
      objValuesKey[0]?.locale === locale // first value is keyName locale and equals the locale we are looking for
    ) {
      const globalContentValue = objValuesKey[0]?.value;

      if (locales.length === 1) {
        // if only one locale, we can just set the value to the value to the globalContentValue
        obj[key] = globalContentValue;
      } else {
        // If there are multiple locales, we need to follow the same contract structure as the global content
        // We keep the global locale as the first value, so the user has a reference to the original value
        const values = [
          {
            locale: GLOBAL_LOCALE,
            value: globalContentValue, // updated to use globalContentValue as the value
          },
        ];

        // Locales are the targeted local repository's locales, they are looped over to create initial values
        locales.forEach((element) => {
          values.push({
            locale: element,
            value: globalContentValue, // updated to use globalContentValue as the value
          });
        });

        obj[key].values = values;
      }
    }
    localizeRelevantContentItemValues(obj[key], locale, locales);
  }
};

export const resetContentItemAttributes = (contentItem: UpdatedContentItem) => {
  contentItem.id = undefined as any; // Remove the id in order to create a new contentItem
  delete contentItem.body._meta.deliveryKey; // Remove the deliveryKey in order to create a new contentItem
  delete contentItem.body._meta.deliveryKeys; // Remove the deliveryKeys in order to create a new contentItem
  // Below are removed to reset as the content item was just created, and has no ties to the original creator
  // and also to unpublish the content item if it was published in global
  contentItem.createdBy = undefined as any;
  contentItem.createdDate = undefined as any;
  contentItem.lastModifiedBy = undefined as any;
  contentItem.lastModifiedDate = undefined as any;
  contentItem.version = undefined as any;
  contentItem.workflow = undefined as any;
  contentItem.status = undefined as any;
  contentItem.publishingStatus = undefined as any;
  contentItem.lastPublishedDate = undefined as any;
  contentItem.lastPublishedVersion = undefined as any;
  contentItem.folderId = undefined as any;
  contentItem.body.tags = undefined as any; // Remove the tags in order to create a new contentItem
};

export const createAndLocalizeContentItems = async ({
  contentLinks,
  localRepository,
  managementClient,
}: {
  contentLinks: ContentLinkInstance[];
  localRepository: ContentRepository;
  managementClient: DynamicContent;
}) => {
  const returnObject: Record<string, string> = {};

  if (!contentLinks || contentLinks.length === 0) {
    return returnObject;
  }

  try {
    const fetchPromises = contentLinks.map(async (contentLink) => {
      const contentItem = await managementClient.contentItems.get(
        contentLink.id,
      );

      if (contentItem.status === 'ARCHIVED') {
        // If the content item is archived, we do not want to copy it
        return;
      }

      // OldId is kept in order to map the old id to the new id
      const oldId = contentItem.id;

      if (!localRepository?.itemLocales) {
        throw new Error('No locales found in the local repository');
      }

      localizeRelevantContentItemValues(
        contentItem.body,
        GLOBAL_LOCALE,
        localRepository.itemLocales,
      );
      // Clean the contentItem for the local repository
      contentItem.locale = localRepository.itemLocales?.[0];
      resetContentItemAttributes(contentItem);

      // Only remove the localized suffix if there is only one locale
      if (localRepository.itemLocales.length === 1) {
        contentItem.body._meta.schema = removeLocalizedSuffix(
          contentItem.body._meta.schema,
        );
      }

      const createdItem =
        await localRepository.related.contentItems.create(contentItem);

      // Map the new id to the old id
      returnObject[oldId] = createdItem.id;
    });

    await Promise.all(fetchPromises);

    return returnObject;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateContentLinkIds = (
  modules: Record<string, string>,
  contentLinks: ContentLinkInstance[],
  isMultiLanguage: boolean,
) => {
  contentLinks?.forEach((module, index) => {
    const contentType = !isMultiLanguage
      ? removeLocalizedSuffix(module.contentType)
      : module.contentType;

    const contentLinkIndex = contentLinks.findIndex(
      (contentLink) => contentLink.id === module.id,
    );

    contentLinks[contentLinkIndex] = {
      ...contentLinks[index],
      contentType,
      id: modules[module.id],
    };
  });
};
