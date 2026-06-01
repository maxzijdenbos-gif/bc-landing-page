import { ContentModuleCommonProperties } from '../../types/content-types';
import { getContentClient } from './get-content-client';

const statusNameToStatusCode: Record<string, number> = {
  CONTENT_NOT_FOUND: 404,
};

export interface ContentDeliveryError {
  message?: string;
  status?: number;
}

interface GetContentDeliveryKeyOptions {
  locale?: string;
  slug: string;
  stagingEnvironment?: string;
}

export const getContentDeliveryKey = async <T = ContentModuleCommonProperties>({
  slug,
  locale,
  stagingEnvironment,
}: GetContentDeliveryKeyOptions): Promise<T> => {
  const client = getContentClient({ locale, stagingEnvironment });

  try {
    const response = await client.getContentItemByKey(slug);

    // needs to be serialized and deserialized in order for nextJS to accept values such as: _meta: {}
    // for some reason, deliveryKeys are stripped if just passing repost.body. Therefore we spread the response.body and _meta
    const cleanedResponse = JSON.parse(
      JSON.stringify({
        ...response.body,
        _meta: {
          ...response.body._meta,
        },
      }),
    );

    return cleanedResponse;
  } catch (error) {
    throw {
      message: (error as Error).message,
      status: statusNameToStatusCode[(error as Error).name] || 500,
    } as ContentDeliveryError;
  }
};
