import { getContentClient } from '../get-content/get-content-client';

const MAXIMUM_DEPTH = 6;

interface GetHierarchyOptions {
  locale?: string;
  maximumDepth?: number;
  stagingEnvironment?: string;
}

export const getHierarchy = async <T = NodeContainer<any>>(
  rootId: string,
  {
    maximumDepth = MAXIMUM_DEPTH,
    stagingEnvironment,
    locale,
  }: GetHierarchyOptions,
): Promise<T> => {
  const client = getContentClient({ locale, stagingEnvironment });

  try {
    const response = await client.getByHierarchy({
      maximumDepth,
      rootId,
      sortKey: 'default',
      sortOrder: 'ASC',
    });

    // needs to be serialized and deserialized in order for nextJS to accept values such as: _meta: {}
    const cleanedResponse = JSON.parse(JSON.stringify(response));

    return cleanedResponse;
  } catch (error) {
    // Apparantly, getByHierarchy and getHirarchyByKey will crash on 404
    return { error } as T;
  }
};

export const getHierarchyByKey = async <T = NodeContainer<any>>(
  deliveryKey: string,
  {
    maximumDepth = MAXIMUM_DEPTH,
    stagingEnvironment,
    locale,
  }: GetHierarchyOptions,
): Promise<T> => {
  const client = getContentClient({ locale, stagingEnvironment });

  try {
    const response = await client.getHierarchyByKey({
      maximumDepth,
      rootKey: deliveryKey,
      sortKey: 'default',
      sortOrder: 'ASC',
    });

    // needs to be serialized and deserialized in order for nextJS to accept values such as: _meta: {}
    const cleanedResponse = JSON.parse(JSON.stringify(response));

    return cleanedResponse;
  } catch (error) {
    // Apparantly, getByHierarchy and getHirarchyByKey will crash on 404
    return { error } as T;
  }
};
