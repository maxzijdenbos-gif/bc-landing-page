import { ContentItem, ContentLinkInstance } from 'dc-management-sdk-js';
import { ContentMeta } from '../../types/content-types';

export const LOCALIZED_SCHEMA_SUFFIX = 'Localized';

export interface ManagementClientConfig {
  patToken: string;
}

export interface LocaleRepositoryInfo {
  isMultiLocale: boolean;
  locale: Locale;
  repositoryId: string;
}

export interface GlobalToLocalRepositoryPayload {
  text: string;
  value: LocaleRepositoryInfo;
}

type LocalizationStatus = 'none' | 'localized' | 'ignored';

type UpdatedContentItemBody<T> = T & {
  _meta: ContentMeta;
  localizedInfo: {
    localizationComment?: string;
    localizationStatus: Record<Locale, LocalizationStatus>;
    readyForLocalization: boolean;
  };
  tags?: unknown;
};

export interface UpdatedContentItem<T = object> extends ContentItem {
  body: UpdatedContentItemBody<T>;
}

export interface UpdatedPageContentItem extends UpdatedContentItem<{
  modules?: ContentLinkInstance[];
  topModules?: ContentLinkInstance[];
}> {}

export interface CreateLocalContentItemPayload {
  contentItem: UpdatedContentItem; // Item to be copied
  parentId: string; // Placement in the hierarchy
  repositoryId: string; // Local repository id
  // Used to allow access to api route
  token?: string;
}

export interface GetGlobalContentItemsResponse {
  contentItems: UpdatedContentItem[];
  mappedRepositories: GlobalToLocalRepositoryPayload[];
}

export interface UpdateContentItemPayload {
  contentItem: UpdatedContentItem;
  locale: Locale; // Item to be copied
  localizationStatus: LocalizationStatus;
  // Used to allow access to api route
  token?: string;
}
