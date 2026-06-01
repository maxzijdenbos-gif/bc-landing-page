import { NextApiRequest, NextApiResponse } from 'next';
import { createManagementClient } from 'integrations/content/amplience/endpoints/management/content-management';

const PAT = process.env.AMPLIENCE_PAT;

// Guarded by middleware
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!PAT) {
    res.status(500).send({ statusText: 'Not configured properly' });

    return;
  }

  const { hubId } = (req.body as { hubId: string }) ?? {};

  if (!hubId) {
    res.status(400).send({ statusText: 'Hub ID is required' });

    return;
  }

  const managementClient = createManagementClient({
    patToken: PAT,
  });

  const getCorrectSchemas = async (
    page: number,
    schemaArray: any[] = [],
    totalFetched: number,
  ) => {
    const hub = await managementClient.hubs.get(hubId);

    // reset counter
    totalFetched = 0;

    // Type is any because of the lack of SDK typing
    const allSchemasInHub: any = await hub.related.contentTypeSchema.list({
      page: page, // Pagination
      size: 100, // Get as many as possible in order to reduce the number of requests
      status: 'ACTIVE', // We only want active schemas
    } as { page: number; size: number; status: string });

    // count fetched
    totalFetched = allSchemasInHub._embedded['content-type-schemas'].length;
    // This approach is not documented by Amplience, but it is the way we need to retrieve the schemas
    const filterSchemasWithHierarchyTrait = allSchemasInHub._embedded[
      'content-type-schemas'
    ].filter((schema: { body: string; schemaId: string }) => {
      const schemaBody = JSON.parse(schema.body);

      // We only want schemas with the hierarchy trait that have child content types
      return schemaBody['trait:hierarchy']?.childContentTypes?.length > 0;
    });

    // Concat the schemas from the recursive call
    const concatSchemaArray = schemaArray.concat(
      filterSchemasWithHierarchyTrait,
    );

    // If we have 100 schemas, we need to get the next page
    // We need to call the function recursively until we get all the schemas

    if (totalFetched === 100) {
      return await getCorrectSchemas(page + 1, concatSchemaArray, totalFetched);
    }

    if (!filterSchemasWithHierarchyTrait.length) {
      throw new Error('Schema not found');
    }

    const map: Record<string, string[]> = {};

    concatSchemaArray.forEach((item) => {
      const schemaBody = JSON.parse(item.body);

      if (schemaBody['trait:hierarchy']?.childContentTypes) {
        map[item.schemaId] = schemaBody['trait:hierarchy'].childContentTypes;
      } else {
        map[item.schemaId] = [];
      }
    });

    return map;
  };

  try {
    const response = await getCorrectSchemas(0, [], 0);

    res.status(200).json(response);
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
