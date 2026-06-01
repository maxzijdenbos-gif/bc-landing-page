import {
  ContentPageResponse,
  ContentPageSeoFields,
  SocialMediaSharing,
} from 'integrations/content/amplience/types/content-types';
import { FALLBACK_LOCALE } from 'libraries/getters/get-locale';
import {
  BaseSocialMetaTag,
  createSocialMetaTagList,
  getImageObjectUrl,
  getLocalizedFallbacks,
  getTopModuleImage,
} from '.';

export interface TwitterSocialMetaTag extends BaseSocialMetaTag {
  content: string;
}

const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 418;

export const extractTwitterMetaTags = (
  socialMediaSharing?: SocialMediaSharing | null,
  seoFields?: ContentPageSeoFields | null,
  locale = FALLBACK_LOCALE,
  topModules?: ContentPageResponse['topModules'],
) => {
  if (!socialMediaSharing) return [];

  const { socialSharingFallback: fallbacks, twitterCards: values } =
    socialMediaSharing;

  if (!fallbacks && !values) return [];

  const { addTag, tagList } = createSocialMetaTagList<TwitterSocialMetaTag>(
    'twitter',
    'name',
    'content',
  );

  const { title, description, imageObject } = values || {};
  const { twitterSiteName } = getLocalizedFallbacks(socialMediaSharing, locale);

  let image = imageObject?.diImage?.image && imageObject;

  // Fallback image to first topmodule image
  if (!image) {
    image = getTopModuleImage(topModules);
  }

  // Fallback image to global fallback
  if (!image && fallbacks?.twitterImageFallback?.diImage?.image) {
    image = fallbacks.twitterImageFallback;
  }

  addTag('card', 'summary');
  addTag('site', twitterSiteName);
  addTag('title', title || seoFields?.metaTitle);
  addTag('description', description || seoFields?.metaDescription);
  addTag('image', getImageObjectUrl(image, IMAGE_WIDTH, IMAGE_HEIGHT));
  addTag('image:alt', image?.alt);

  return tagList;
};
