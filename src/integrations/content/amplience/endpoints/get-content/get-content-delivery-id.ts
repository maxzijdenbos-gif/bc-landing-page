import { ContentModuleCommonProperties } from '../../types/content-types';
import { getContentClient } from './get-content-client';

export const getContentDeliveryId = async <T = ContentModuleCommonProperties>(
  id: string,
  locale?: Locale,
  stagingEnvironment?: string,
): Promise<T> => {
  const client = getContentClient({ locale, stagingEnvironment });

  try {
    const response = await client.getContentItemById(id);

    // needs to be serialized and deserialized in order for nextJS to accept values such as: _meta: {}
    const cleanedResponse = JSON.parse(JSON.stringify(response.body));

    return cleanedResponse;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
