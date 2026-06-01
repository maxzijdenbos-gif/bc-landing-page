import { ContentModuleCommonProperties } from '../../types/content-types';
import { getContentClient } from './get-content-client';

export const getContentDeliveryIds = async <
  T = { content: ContentModuleCommonProperties }[],
>({
  ids,
  locale,
  stagingEnvironment,
}: {
  ids: string[];
  locale?: string;
  stagingEnvironment?: string;
}): Promise<T> => {
  const client = getContentClient({ locale, stagingEnvironment });

  try {
    const uniqueIds = [...new Set(ids)]; // API will fail if there are duplicate ids
    const response = await client.getContentItemsById(uniqueIds);

    // needs to be serialized and deserialized in order for nextJS to accept values such as: _meta: {}
    const cleanedResponse = JSON.parse(JSON.stringify(response.responses));

    return cleanedResponse;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
