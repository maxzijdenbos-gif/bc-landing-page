import { WistiaMedia } from 'pages/amplience/extensions/wistia-schema';
import { PageSchemasProps } from '../endpoints/schema/schema.types';
import {
  AmplienceTag,
  ContentPageSeoFields,
  SocialMediaSharing,
} from '../types/content-types';

export interface PageAdapter {
  breadcrumbLinks?: BaseLink[] | null;
  currentLink?: BaseLink | null;
  customError?: Record<string, string | undefined> | null;
  drilldownLinks?: BaseLink[] | null;
  hasOrgSchema?: boolean | null;
  modules: any;
  pageColor: BackgroundColor;
  pageNavigation?: {
    breadcrumbName: string | null;
    hasBreadcrumbs: boolean | null;
    hasDrilldown: boolean | null;
  } | null;
  pageSchemas?: PageSchemasProps | null;
  pageType?: 'ProductListPage' | 'GenericPage' | null;
  productListSettings?: {
    onlyDiscountProducts: boolean | null;
    productListCategories: string[] | null;
  } | null;
  schemaData?: {
    author?:
      | {
          authorName?: string | null;
          authorType?: string | null;
        }[]
      | null;
  } | null;
  seoFields?: ContentPageSeoFields | null;
  socialMediaSharing?: SocialMediaSharing | null;
  tags?: AmplienceTag[] | null;
  topModules: any;
  videoSchemas: WistiaMedia[] | null;
}

export interface SharedPropsOptions {
  /** When true, omit `revalidate` and shape results for `getServerSideProps` (ISR keys are invalid there). */
  forServerSide?: boolean;
  localeOverride?: string;
  slugOverride?: string | string[];
}

export interface PreviewData {
  stagingEnvironment: string; // Used for access preview data
}
