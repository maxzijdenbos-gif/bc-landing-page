import { ContentMeta as AmplienceContentMeta } from 'dc-delivery-sdk-js/build/main/lib/content/model/ContentMeta';
import { ContentTeaserListElementProps } from 'components/organisms/teaser-list/teaser-list-element/teaser-list-element';
import { PageSchemasProps } from '../endpoints/schema/schema.types';

export interface ContentMeta {
  deliveryId?: string;
  deliveryKey?: string;
  deliveryKeys?: { values: Record<'value', Locale>[] };
  hierarchy?: AmplienceContentMeta['hierarchy'];
  name?: string;
  schema: AmplienceContentMeta['schema'];
}

interface AmplienceImageLink {
  _meta: {
    schema: string;
  };
  defaultHost: string;
  endpoint: string;
  id: string;
  mimeType?: string;
  name: string;
}

export interface AmplienceVideoPayload extends AmplienceImageLink {
  altText?: string;
}

export interface AmplienceImagePayload {
  alt?: string;
  staticSrc?: string;
  diImage?: {
    aspectLock?: string;
    bri?: number;
    crop?: [number, number, number, number];
    defaultHost?: string;
    fliph?: boolean;
    flipv?: boolean;
    hue?: number;
    image?: AmplienceImageLink;
    poi?: {
      x: number;
      y: number;
    };
    query?: string;
    rot?: number;
    sat?: number;
  };
  dimensions?: {
    height?: number;
    width?: number;
  };
  mimeType?: string;
}

export interface AmplienceMediaPayload {
  altText?: string;
  image?: AmplienceImagePayload;
  type: 'image' | 'video';
  video?: AmplienceVideoPayload;
}

export interface AmplienceMediaVideoObjectPayload {
  altText: string;
  video: AmplienceVideoPayload;
}
export interface ContentModuleCommonProperties {
  _meta: ContentMeta;
}

export interface ContentModuleResponse extends ContentModuleCommonProperties {
  [index: string]: any;
}

export interface ContentPageSeoFields {
  canonical?: BaseLink['internalLinkRef'] | null;
  languageVersions?: { value: string }[] | null;
  metaDescription?: string;
  metaRobotsFollow?: boolean;
  metaRobotsIndex?: boolean;
  metaTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogSiteName?: string;
  ogTitle?: string;
  ogType?: string;
}

interface PageMetaData {
  canonicalLink?: [
    {
      internalLinkRef: BaseLink['internalLinkRef'];
    },
  ];
  follow?: boolean;
  index?: boolean;
  metaDescription?: string;
  pageTitle?: string;
}

interface OpenGraph {
  description?: string;
  imageObject?: AmplienceImagePayload;
  title?: string;
  url?: [
    {
      externalLink?: string;
      internalLinkRef: BaseLink['internalLinkRef'];
    },
  ];
}

interface TwitterCards {
  description?: string;
  imageObject?: AmplienceImagePayload;
  title?: string;
}

type LocalizedSocialMediaFallbacks = Record<
  Locale,
  {
    ogSiteName?: string;
    twitterSiteName?: string;
  }
>;

interface SocialSharingFallback {
  localizedSocialMediaFallbacks?: LocalizedSocialMediaFallbacks;
  ogImageFallback?: AmplienceImagePayload;
  ogSiteName?: string;
  twitterImageFallback?: AmplienceImagePayload;
  twitterSiteName?: string;
}

export type SocialMediaSharing = {
  OpenGraph?: OpenGraph;
  socialSharingFallback?: SocialSharingFallback;
  twitterCards?: TwitterCards;
};

export interface AmplienceTag {
  hide?: boolean;
  tag?: {
    _meta?: {
      deliveryId?: string;
      hierarchy?: {
        parentId?: string;
        root?: boolean;
      };
      name?: string;
      schema?: string;
    };
    tagText?: string;
  }[];
}

export interface ContentPageResponse {
  _meta: ContentMeta;
  hasOrgSchema?: boolean;
  modules?: ContentModuleResponse[];
  pageMetaData?: PageMetaData;
  pageNavigation?: {
    breadcrumbName?: string;
    hasBreadcrumbs?: boolean;
    hasDrilldown?: boolean;
    urlName?: string;
  };
  productListSettings?: {
    onlyDiscountProducts: boolean | null;
    productListCategories?: string[];
  };
  ranking?: number;
  schemaData?: {
    author: {
      authorName?: string;
      authorType?: 'Organization' | 'Person';
    }[];
  };
  socialMediaSharing?: SocialMediaSharing;
  tags?: AmplienceTag[];
  theme?: BackgroundColor;
  title?: string;
  topModules?: ContentModuleResponse[];
}

export interface ContentTeaserListElementResponse extends ContentTeaserListElementProps {
  articleRef?: [{ id: string }];
  type?: string;
}

export interface EnhancedContentPageResponse extends ContentPageResponse {
  breadcrumbLinks?: BaseLink[];
  currentLink?: BaseLink;
  drilldownLinks?: BaseLink[];
  pageSchemas?: PageSchemasProps;
}

export interface IconLink {
  iconClass: IconName;
  link: [BaseLink];
}
