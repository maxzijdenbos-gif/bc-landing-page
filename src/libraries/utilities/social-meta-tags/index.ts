import { Image, ImageUrlBuilder } from 'dc-delivery-sdk-js';
import {
  AmplienceImagePayload,
  ContentPageResponse,
  ContentPageSeoFields,
  SocialMediaSharing,
} from 'integrations/content/amplience/types/content-types';
import { InternalLinkMapTypeRecord } from 'libraries/contexts/internal-navigation-context';
import { FALLBACK_LOCALE } from 'libraries/getters/get-locale';
import { extractOpenGraphMetaTags } from './openGraph';
import { extractTwitterMetaTags } from './twitter';

export interface BaseSocialMetaTag {
  name: string;
}

const generateAllSocialMetaTags = (
  socialMediaSharing?: SocialMediaSharing | null,
  seoFields?: ContentPageSeoFields | null,
  locale = FALLBACK_LOCALE,
  topModules?: ContentPageResponse['topModules'],
  canonicalPath?: string,
  internalLinks?: InternalLinkMapTypeRecord,
) => [
  ...extractOpenGraphMetaTags(
    socialMediaSharing,
    seoFields,
    locale,
    topModules,
    canonicalPath,
    internalLinks,
  ),
  ...extractTwitterMetaTags(socialMediaSharing, seoFields, locale, topModules),
];

export const createSocialMetaTagList = <T>(
  prefix: string,
  idKey: string,
  valueKey: string,
) => {
  const tagList: T[] = [];

  return {
    addTag: (id: string, value?: string) => {
      if (!value) return;

      tagList.push({
        [idKey]: prefix ? `${prefix}:${id}` : id,
        [valueKey]: value,
      } as T);
    },
    tagList,
  };
};

export const getImageObjectUrl = (
  imageObject?: AmplienceImagePayload,
  newWidth?: number,
  newHeight?: number,
) => {
  if (!imageObject?.diImage?.image) return;

  const builder = new ImageUrlBuilder(new Image(imageObject.diImage.image, {}));

  builder.host(imageObject.diImage.image.defaultHost);
  builder.quality(100);

  // We must adhere to social media sizing requirements, but we can use Poi if provided.
  builder.parameter('sm', 'c');
  builder.parameter('scaleFit', 'poi');
  newWidth && builder.width(newWidth);
  newHeight && builder.height(newHeight);

  // Grab POI or default to center for the crop
  const poi = imageObject.diImage.poi;
  const poiX = poi?.x && poi.x !== -1 ? poi.x : 0.5;
  const poiY = poi?.y && poi.y !== -1 ? poi.y : 0.5;

  builder.parameter('poi', `${poiX},${poiY},0,0`);

  return builder.build();
};

export const getTopModuleImage = (
  topModules: ContentPageResponse['topModules'],
) => {
  const image = topModules?.find(({ data }) => {
    return (
      !!data?.imageObject?.diImage?.image ||
      !!data?.media?.[0]?.image?.diImage?.image
    );
  });

  return image?.data?.imageObject || image?.data?.media?.[0]?.image;
};

export const getLocalizedFallbacks = (
  socialMediaSharing: SocialMediaSharing,
  locale = FALLBACK_LOCALE,
) =>
  socialMediaSharing?.socialSharingFallback?.localizedSocialMediaFallbacks?.[
    locale.toLowerCase()
  ] || {};

export default generateAllSocialMetaTags;
