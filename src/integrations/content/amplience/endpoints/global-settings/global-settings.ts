import { GlobalSettingsResponse } from 'integrations/content/amplience/preview/types';
import { getContentDeliveryKey } from '../get-content/get-content-delivery-key';

const GLOBAL_SETTINGS_SLUG =
  process.env.ACCESS_AMPLIENCE_CONFIG_DELIVERY_KEY || 'globalsettings';

export const getGlobalSettings = async (
  locale?: string,
  stagingEnvironment?: string,
): Promise<GlobalSettingsResponse> => {
  try {
    const response = await getContentDeliveryKey<GlobalSettingsResponse>({
      locale,
      slug: GLOBAL_SETTINGS_SLUG,
      stagingEnvironment,
    });

    return response ?? {};
  } catch {
    return {};
  }
};
