import { getContentClient } from 'integrations/content/amplience/endpoints/get-content/get-content-client';
import { ContentPageResponse } from 'integrations/content/amplience/types/content-types';

const getDrillDown = async (
  metaId: string,
  locale?: Locale,
  stagingEnvironment?: string,
) => {
  const response = await getContentClient({ locale, stagingEnvironment })
    .filterByParentId<ContentPageResponse>(metaId)
    .request({
      depth: 'all',
      format: 'inlined',
    });

  const drilldownLinks = response?.responses.map((page) => {
    const breadcrumbName =
      (page.content?.pageNavigation?.breadcrumbName ||
        page.content?.pageNavigation?.urlName ||
        page.content._meta?.name) ??
      '';

    return {
      internalLink: page.content._meta?.deliveryKey ?? null,
      linkText: breadcrumbName,
    };
  });

  return { drilldownLinks: drilldownLinks };
};

export default getDrillDown;
