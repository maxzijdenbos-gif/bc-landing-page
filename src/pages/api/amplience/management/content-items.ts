import { NextApiRequest, NextApiResponse } from 'next';
import { createManagementClient } from 'integrations/content/amplience/endpoints/management/content-management';
import {
  GlobalToLocalRepositoryPayload,
  UpdatedContentItem,
} from 'integrations/content/amplience/endpoints/management/content-management.types';
import { checkIfUserIsAdmin } from 'integrations/content/amplience/endpoints/users/get-active-user-extension';
import { UserState } from 'integrations/content/amplience/endpoints/users/get-active-user-extension.types';

const GLOBAL_REPOSITORY_ID = process.env.AMPLIENCE_GLOBAL_REPOSITORY_ID;
const PAT = process.env.AMPLIENCE_PAT;

// Guarded by middleware
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!PAT || !GLOBAL_REPOSITORY_ID) {
    res.status(500).send({ statusText: 'Not configured properly' });

    return;
  }

  const { hubId, assignedRepositories, teams } = (req.body as UserState) ?? {};

  if (!hubId) {
    res.status(400).json({ message: 'Missing hubId' });
  }

  if (!assignedRepositories?.length && !teams.length) {
    res.status(400).json({ message: 'Missing assigned roles' });
  }

  const managementClient = createManagementClient({
    patToken: PAT,
  });

  try {
    // Get the global repository
    const globalRepository =
      await managementClient.contentRepositories.get(GLOBAL_REPOSITORY_ID);

    const allItems = [];
    let page = 0;
    let totalPages = 1;
    let lastPageNumber: number | null = null;

    do {
      const result = await globalRepository.related.contentItems.list({
        page,
        size: 100,
      });

      const items = result?.getItems?.() ?? [];
      allItems.push(...items);

      const pageInfo = result?.page;
      totalPages = pageInfo?.totalPages ?? totalPages;

      const currentPageNumber = pageInfo?.number ?? page;

      if (lastPageNumber !== null && currentPageNumber <= lastPageNumber) {
        page = totalPages; // break the loop
        break;
      }

      lastPageNumber = currentPageNumber;
      page = currentPageNumber + 1;
    } while (page < totalPages);

    // Filter out the content items that are not ready for localization or archived
    const contentItems: UpdatedContentItem[] = allItems.filter(
      (item) =>
        item.body?.localizedInfo?.readyForLocalization &&
        item.status !== 'ARCHIVED',
    );

    const hub = await managementClient.hubs.get(hubId);

    // Get all repositories that is the given hub
    const allRepositories = (
      await hub.related.contentRepositories.list()
    ).getItems();

    const isUSerAdmin = checkIfUserIsAdmin({ hubId, teams });
    // Filter out the repositories that the user does not have access to
    const filteredRepositories = allRepositories.filter((repository) => {
      // If user is an admin of the given hub, they should have access to all repositories
      if (isUSerAdmin) {
        return repository.id && repository.id !== GLOBAL_REPOSITORY_ID;
      }

      // If the user is not an admin, then they should have assigned repositories
      // Therefore we filter out the repositories that are not assigned to the user
      return (
        repository.id &&
        repository.id !== GLOBAL_REPOSITORY_ID &&
        assignedRepositories?.includes(repository.id)
      );
    });

    const mappedRepositories: GlobalToLocalRepositoryPayload[] = [];

    // Filter out unwanted repositories and map them to the correct format
    filteredRepositories.forEach((element) => {
      if (element?.features?.includes('slots')) return; // Removes "content slots" from the list

      if (!element.id) return;

      const locale = element?.itemLocales?.[0]; // It is not important which locale we choose because all share the same region

      if (!locale) return; // We need to have a locale to get the region

      const region = new Intl.Locale(locale).region;
      const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(
        region ?? '',
      );

      // This format is used for the select component in the frontend
      mappedRepositories.push({
        text: element.label ?? countryName ?? locale,
        value: {
          isMultiLocale: Array.isArray(element?.itemLocales)
            ? element.itemLocales.length > 1
            : false,
          locale: String(locale).toLowerCase(),
          repositoryId: element.id,
        },
      });
    });

    if (mappedRepositories.length === 0) {
      res.status(403).json({ message: 'No repositories found' });
    }

    res.status(200).json({ contentItems, mappedRepositories });
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
