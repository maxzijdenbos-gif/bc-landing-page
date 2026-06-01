import {
  ContentPageResponse,
  ContentPageSeoFields,
  SocialMediaSharing,
} from 'integrations/content/amplience/types/content-types';
import { InternalLinkMapTypeRecord } from 'libraries/contexts/internal-navigation-context';
import { FALLBACK_LOCALE } from 'libraries/getters/get-locale';
import { getFullPathFromInternalLinkRef } from 'libraries/getters/get-url';
import {
  BaseSocialMetaTag,
  createSocialMetaTagList,
  getImageObjectUrl,
  getLocalizedFallbacks,
  getTopModuleImage,
} from '.';

export interface OpenGraphSocialMetaTag extends BaseSocialMetaTag {
  property: string;
}

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 630;

export const extractOpenGraphMetaTags = (
  socialMediaSharing?: SocialMediaSharing | null,
  seoFields?: ContentPageSeoFields | null,
  locale = FALLBACK_LOCALE,
  topModules?: ContentPageResponse['topModules'],
  canonicalPath?: string,
  internalLinks?: InternalLinkMapTypeRecord,
) => {
  if (!socialMediaSharing) return [];

  const { socialSharingFallback: fallbacks, OpenGraph: values } =
    socialMediaSharing;

  if (!fallbacks && !values) return [];

  const { addTag, tagList } = createSocialMetaTagList<OpenGraphSocialMetaTag>(
    'og',
    'property',
    'content',
  );
  const { title, description, imageObject, url } = values || {};

  let openGraphPath: string | undefined;

  if (!!url?.length && !!url?.[0]?.internalLinkRef?.length) {
    openGraphPath = getFullPathFromInternalLinkRef(
      url[0].internalLinkRef,
      internalLinks,
    );
  }

  const { ogSiteName } = getLocalizedFallbacks(socialMediaSharing, locale);

  let image = imageObject?.diImage?.image && imageObject;

  // Fallback image to first topmodule image
  if (!image) {
    image = getTopModuleImage(topModules);
  }

  // Fallback image to global fallback
  if (!image && fallbacks?.ogImageFallback?.diImage?.image) {
    image = fallbacks.ogImageFallback;
  }

  addTag('title', title || seoFields?.metaTitle);
  addTag('description', description || seoFields?.metaDescription);
  addTag('url', openGraphPath || canonicalPath);
  addTag('image', getImageObjectUrl(image, IMAGE_WIDTH, IMAGE_HEIGHT));
  addTag('type', 'website');
  addTag('site_name', ogSiteName);
  addTag('locale', locale !== FALLBACK_LOCALE ? locale : undefined);

  return tagList;
};
