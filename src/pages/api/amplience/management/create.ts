import { NextApiRequest, NextApiResponse } from 'next';
import { createManagementClient } from 'integrations/content/amplience/endpoints/management/content-management';
import {
  CreateLocalContentItemPayload,
  UpdatedPageContentItem,
} from 'integrations/content/amplience/endpoints/management/content-management.types';
import {
  createAndLocalizeContentItems,
  localizeRelevantContentItemValues,
  removeLocalizedSuffix,
  resetContentItemAttributes,
  updateContentLinkIds,
} from 'integrations/content/amplience/endpoints/management/content-management-helper-functions';

const PAT = process.env.AMPLIENCE_PAT;
const GLOBAL_LOCALE = process.env.NEXT_PUBLIC_AMPLIENCE_GLOBAL_LOCALE;

// Guarded by middleware
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!PAT || !GLOBAL_LOCALE) {
    res.status(500).send({ statusText: 'Not configured properly' });

    return;
  }

  const { contentItem, repositoryId, parentId } =
    (req.body as CreateLocalContentItemPayload) ?? {};

  if (!contentItem || !repositoryId || !parentId) {
    res.status(400).json({ message: 'Missing required fields' });
  }

  const managementClient = createManagementClient({
    patToken: PAT,
  });

  try {
    const localRepository =
      await managementClient.contentRepositories.get(repositoryId);
    const isMultiLanguage = localRepository?.itemLocales
      ? localRepository?.itemLocales.length > 1
      : false;

    const newLocalContentItem: UpdatedPageContentItem = JSON.parse(
      JSON.stringify(contentItem),
    );

    localizeRelevantContentItemValues(
      newLocalContentItem,
      GLOBAL_LOCALE,
      localRepository.itemLocales ?? [],
    );

    // START - Update topModules

    if (newLocalContentItem.body.topModules) {
      // Updated topModules with new ids
      const topModules = await createAndLocalizeContentItems({
        contentLinks: newLocalContentItem.body.topModules,
        localRepository,
        managementClient,
      });

      // Filter out the contentLinks that are not in the modules
      const filterTopModulesContentLinks =
        newLocalContentItem.body.topModules.filter(
          (module) => !!topModules[module.id],
        );

      newLocalContentItem.body.topModules = filterTopModulesContentLinks;

      // Update topModules with new ids
      updateContentLinkIds(
        topModules,
        newLocalContentItem.body.topModules,
        isMultiLanguage,
      );
    }

    // END - Update topModules

    // START - Update modules

    if (newLocalContentItem.body.modules) {
      // Updated modules with new ids
      const modules = await createAndLocalizeContentItems({
        contentLinks: newLocalContentItem.body.modules,
        localRepository,
        managementClient,
      });

      // Filter out the contentLinks that are not in the modules
      const filterModulesContentLinks = newLocalContentItem.body.modules.filter(
        (module) => !!modules[module.id],
      );

      newLocalContentItem.body.modules = filterModulesContentLinks;
      // Update modules with new ids
      updateContentLinkIds(
        modules,
        newLocalContentItem.body.modules,
        isMultiLanguage,
      );
    }

    // END - Update modules

    // ContentItems themselves can only have one locale, we choose the first one
    // For Localization purposes this does not matter
    // One Improvement could be to set the locale as just the country and not the dialect
    // pt-mx -> mx
    newLocalContentItem.locale = localRepository.itemLocales?.[0];

    // Clear unnecessary attributes
    resetContentItemAttributes(newLocalContentItem);
    if (localRepository?.itemLocales?.length === 1) {
      newLocalContentItem.body._meta.schema = removeLocalizedSuffix(
        newLocalContentItem.body._meta.schema,
      );
    }

    // We need to make sure that a hierarchy is present before we can set the parentId
    if (newLocalContentItem.body._meta?.hierarchy) {
      newLocalContentItem.body._meta.hierarchy.root = false; // Set the parent id, so that it is placed in the right hierarchy
      newLocalContentItem.body._meta.hierarchy.parentId = parentId; // Set the parent id, so that it is placed in the right hierarchy
    }

    // Create/Copy new ContentItem to Locale repository
    const newContentItemResponse =
      await localRepository.related.contentItems.create(newLocalContentItem);

    // Update existing contentItem to set the status to localized
    const locale = String(newLocalContentItem.locale).toLowerCase();

    contentItem.body.localizedInfo.localizationStatus[locale] = 'localized';

    const updateGlobalContentItem = await managementClient.contentItems.get(
      contentItem.id,
    );

    await updateGlobalContentItem.related.update(contentItem);

    res.status(200).json({ newContentItemId: newContentItemResponse.id });
  } catch (error) {
    const jsonError = (error as any)?.response?.data?.errors;
    const errorMessage =
      typeof error === 'string'
        ? error
        : 'An error occurred, try again or contact administrator for assistance.';

    const errorResponse = [
      {
        message: jsonError ?? errorMessage,
      },
    ];

    res.status(400).json(jsonError ?? errorResponse);
  }
}
