import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getHierarchy,
  getHierarchyByKey,
} from 'integrations/content/amplience/endpoints/hierarchy-api/get-hierarchy';
import { PreviewData } from 'integrations/content/amplience/page/page.types';
import { recursivelyGenerateUrls } from 'integrations/content/amplience/page/page-helper-functions';
import { FALLBACK_LOCALE } from 'libraries/getters/get-locale';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { deliveryKey, deliveryId, locale, stagingEnvironment, hierarchyOnly } =
    req.query;

  const skipPublished = hierarchyOnly?.toString() === 'true';

  const publishedOptions = {
    locale: locale?.toString() || FALLBACK_LOCALE,
  };

  const options = {
    locale: locale?.toString() || FALLBACK_LOCALE,
    stagingEnvironment:
      stagingEnvironment?.toString() ||
      (
        req.previewData as PreviewData | undefined
      )?.stagingEnvironment?.toString() ||
      undefined,
  };

  let hierarchy;
  let publishedHierarchy;

  if (deliveryId) {
    hierarchy = await getHierarchy(deliveryId.toString(), options);
    if (!skipPublished)
      publishedHierarchy = await getHierarchy(
        deliveryId.toString(),
        publishedOptions,
      );
  } else if (deliveryKey) {
    hierarchy = await getHierarchyByKey(deliveryKey.toString(), options);
    if (!skipPublished)
      publishedHierarchy = await getHierarchyByKey(
        deliveryKey.toString(),
        publishedOptions,
      );
  } else {
    return res
      .status(400)
      .send('Error: No deliveryKey or deliveryId specified.');
  }

  const internalLinks = publishedHierarchy
    ? recursivelyGenerateUrls(publishedHierarchy, publishedOptions.locale)
    : undefined;

  res.status(200).json({ hierarchy, internalLinks });
};

export default handler;
