import {
  ContentModule,
  ContentModuleName,
  ContentModuleProps,
  isContentModule,
} from 'components/utilities/content-modules/content-modules';
import {
  ContentPageResponse,
  EnhancedContentPageResponse,
} from 'integrations/content/amplience/types/content-types';
import {
  generateAnchorLinkTarget,
  getAnchorList,
} from 'libraries/utilities/anchor-links/create-anchor-link-list';
import { PageAdapter } from './page.types';

export const splitSchemaName = (schema: string) => {
  const splitModuleSchema = schema.split('/');

  return splitModuleSchema[splitModuleSchema.length - 1];
};

const contentModulesAdapter = (
  responseModules: ContentPageResponse['modules'],
  schemaData: ContentPageResponse['schemaData'],
  tags: ContentPageResponse['tags'],
) => {
  const modules: ContentModule[] = [];

  responseModules?.map(async (module, index) => {
    const splitModuleSchema = splitSchemaName(module._meta.schema);
    const getModuleName = splitModuleSchema;

    const formattedAnchorTarget = generateAnchorLinkTarget(
      index,
      module.anchorTitle,
    );

    const moduleName = getModuleName as ContentModuleName;

    const moduleObj = {
      data: {
        ...module,
        schemaData: schemaData || null,
        tags: tags || null,
        ...(formattedAnchorTarget && { anchorTarget: formattedAnchorTarget }),
      } as ContentModuleProps,
      name: moduleName,
    };

    if (isContentModule(moduleObj)) {
      modules.push(moduleObj);
    }
  });

  return modules;
};

const topModulesAdapter = (
  responseTopModules: ContentPageResponse['modules'],
  modules: ContentModule[],
  schemaData: ContentPageResponse['schemaData'],
  tags: ContentPageResponse['tags'],
) => {
  const topModules = contentModulesAdapter(
    responseTopModules,
    schemaData,
    tags,
  );
  const anchorList = getAnchorList(modules);

  return topModules.map((module) => {
    return {
      ...module,
      data: {
        ...module.data,
        ...(anchorList?.length && { anchorList }),
      },
    };
  });
};

export const pageAdapter = (
  response: EnhancedContentPageResponse,
  customError?: Record<string, string | undefined>,
): PageAdapter => {
  if (!response || typeof response !== 'object') {
    throw 'no response provided';
  }
  const titleOrFallback =
    response?.pageMetaData?.pageTitle ||
    response?.title ||
    response?._meta?.name;

  const seoFields = {
    canonical:
      response?.pageMetaData?.canonicalLink?.[0]?.internalLinkRef || null,
    languageVersions: response._meta?.deliveryKeys?.values || null,
    metaDescription: response?.pageMetaData?.metaDescription || '',
    metaRobotsFollow: response.pageMetaData?.follow ?? true,
    metaRobotsIndex: response.pageMetaData?.index ?? true,
    metaTitle: titleOrFallback,
  };
  const modules = contentModulesAdapter(
    response.modules,
    response.schemaData,
    response.tags,
  );

  // Extract only the module videos schemas
  const videoSchemas =
    [...(response.modules || []), ...(response.topModules || [])]
      .filter((module) => module?.wistiaId && module?.schema)
      .map((module) => ({
        ...module.schema[module.wistiaId],
        author: module.author || null,
      })) || null;

  return {
    breadcrumbLinks: response.breadcrumbLinks || null,
    currentLink: response.currentLink || null,
    customError: customError || null,
    drilldownLinks: response.drilldownLinks ? response.drilldownLinks : null,
    hasOrgSchema: response.hasOrgSchema || null,
    modules: modules ? modules : null,
    pageColor: response.theme ?? 'primary',
    pageNavigation: response?.pageNavigation
      ? {
          breadcrumbName: response.pageNavigation?.breadcrumbName
            ? response.pageNavigation?.breadcrumbName
            : response.pageNavigation?.urlName
              ? response.pageNavigation?.urlName
              : null,
          hasBreadcrumbs: response.pageNavigation?.hasBreadcrumbs
            ? response.pageNavigation?.hasBreadcrumbs
            : null,
          hasDrilldown: response.pageNavigation?.hasDrilldown
            ? response.pageNavigation?.hasDrilldown
            : null,
        }
      : null,
    pageSchemas: response?.pageSchemas ? response.pageSchemas : null,
    pageType: response._meta?.schema
      ? (splitSchemaName(response._meta?.schema) as PageAdapter['pageType'])
      : null,
    productListSettings: {
      onlyDiscountProducts: response?.productListSettings?.onlyDiscountProducts
        ? response?.productListSettings?.onlyDiscountProducts
        : null,
      productListCategories: response?.productListSettings
        ?.productListCategories
        ? response?.productListSettings?.productListCategories
        : null,
    },
    schemaData: response?.schemaData ? response.schemaData : null,
    seoFields: seoFields ? seoFields : null,
    socialMediaSharing: response.socialMediaSharing ?? null,
    tags: response.tags ? response.tags : null,
    topModules: topModulesAdapter(
      response.topModules,
      modules,
      response.schemaData,
      response.tags,
    ),
    videoSchemas,
  };
};

export const isPageAdapter = (data: unknown): data is PageAdapter => {
  return (
    data !== null &&
    typeof data === 'object' &&
    'modules' in data &&
    Array.isArray(data.modules)
  );
};
