import config from 'next.config';
import { getContentClient } from 'integrations/content/amplience/endpoints/get-content/get-content-client';
import { FALLBACK_LOCALE } from 'libraries/getters/get-locale';
import { RequestHandler } from './types';

export const handlePreviewRedirect: RequestHandler = async (req, res) => {
  const { id, locale, vse, deliveryKey } = req.query;
  const localeStr = (locale?.toString() || FALLBACK_LOCALE).toLowerCase();
  let pathName = '';

  if (!deliveryKey && id && id !== 'null') {
    const client = getContentClient({
      locale: localeStr,
      stagingEnvironment: vse?.toString() || undefined,
    });

    const response = await client.getContentItemById(id.toString());
    const deliveryKeys = response?.body?._meta?.deliveryKeys?.values;
    const matchedKey = deliveryKeys?.find(({ value }) =>
      value.toLowerCase().startsWith(localeStr),
    )?.value;

    pathName = matchedKey || response?.body?._meta?.deliveryKey || '';
  }

  if (!pathName && deliveryKey) {
    pathName = deliveryKey.toString();
  }

  res.redirect(`${config.basePath}/${pathName || localeStr}`);
};
