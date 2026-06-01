import { default as NextHead } from 'next/head';
import { useRouter } from 'next/router';
import { generateSchemaBreadcrumbs } from 'integrations/content/amplience/endpoints/hierarchy-links/breadcrumbs/breadcrumbs';
import {
  OrganizationSchemaProps,
  PageSchemasProps,
} from 'integrations/content/amplience/endpoints/schema/schema.types';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import { useInternalLinksContext } from 'libraries/contexts/internal-navigation-context';
import {
  getLocaleFromAsPath,
  getLocaleFromPath,
} from 'libraries/getters/get-locale';
import {
  getFullPathFromInternalLinkRef,
  getUrlFromPath,
} from 'libraries/getters/get-url';
import { displayHrefLangTag } from 'libraries/utilities/hreflang-tags';
import generateNewsArticleSchema from 'libraries/utilities/schemas/news-article-schema';
import generateOrganizationSchema from 'libraries/utilities/schemas/organization-schema';
import generateVideoSchema from 'libraries/utilities/schemas/video-schema';
import generateAllSocialMetaTags from 'libraries/utilities/social-meta-tags';

const theme = process.env.NEXT_PUBLIC_THEME_NAME as Theme;

const faviconTitle: Record<Theme, string> = {
  giant: 'Giant',
  liv: 'Liv',
};

interface HeadProps {
  breadcrumbLinks?: BaseLink[] | null;
  children?: React.ReactNode;
  currentLink?: BaseLink | null;
  hasOrgSchema?: PageAdapter['hasOrgSchema'];
  languageChooserLink?: string | null;
  modules?: PageAdapter['modules'];
  pageSchemas?: PageSchemasProps | null;
  pageType?: PageAdapter['pageType'];
  schemaData?: PageAdapter['schemaData'];
  seoFields?: PageAdapter['seoFields'];
  socialMediaSharing?: PageAdapter['socialMediaSharing'];
  topModules?: PageAdapter['topModules'];
  videoSchemas?: PageAdapter['videoSchemas'];
}

const createRobotsMetaContent = (seoFields: HeadProps['seoFields']) => {
  const response: string[] = [];

  response.push(seoFields?.metaRobotsIndex === false ? 'noindex' : 'index');
  response.push(seoFields?.metaRobotsFollow === false ? 'nofollow' : 'follow');
  seoFields?.metaRobotsIndex &&
    response.push(
      'max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    );

  return response.join(',');
};

const Head = ({
  breadcrumbLinks,
  currentLink,
  hasOrgSchema,
  modules,
  children,
  languageChooserLink,
  pageSchemas,
  socialMediaSharing,
  schemaData,
  seoFields,
  topModules,
  videoSchemas,
}: HeadProps) => {
  const { internalLinks } = useInternalLinksContext();

  const router = useRouter();
  const locale = getLocaleFromAsPath(router.asPath);
  const robotsString = createRobotsMetaContent(seoFields);
  const canonicalPath = getFullPathFromInternalLinkRef(
    seoFields?.canonical,
    internalLinks,
    router,
  );
  const socialMetaTags = generateAllSocialMetaTags(
    socialMediaSharing,
    seoFields,
    locale,
    topModules,
    canonicalPath,
    internalLinks,
  );

  const doDisplayHrefLangTag: boolean | undefined = displayHrefLangTag({
    canonicalPath,
    router,
    seoFields,
  });

  return (
    <NextHead>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>{seoFields?.metaTitle || ''}</title>
      {seoFields?.metaDescription && (
        <meta content={seoFields.metaDescription} name="description" />
      )}
      {doDisplayHrefLangTag &&
        seoFields?.languageVersions &&
        seoFields?.languageVersions?.map(({ value }) => {
          const validLanguageCode = getLocaleFromPath(value);
          const url = getUrlFromPath(value);

          if (url && validLanguageCode) {
            return (
              <link
                key={value}
                href={url}
                hrefLang={validLanguageCode}
                rel="alternate"
              />
            );
          }
        })}
      {doDisplayHrefLangTag && languageChooserLink && (
        <link href="x-default" hrefLang={languageChooserLink} rel="alternate" />
      )}
      {robotsString && <meta content={robotsString} name="robots" />}
      {socialMetaTags &&
        socialMetaTags.map((props, index) => (
          <meta key={`social-tag-${index}`} {...props} />
        ))}
      {canonicalPath && <link rel="canonical" href={canonicalPath} />}
      <meta content={faviconTitle[theme]} name="apple-mobile-web-app-title" />
      <link
        href={`/discover/images/favicons/${theme}/favicon-96x96.png?v=1`}
        rel="icon"
        sizes="96x96"
        type="image/png"
      />
      <link
        href={`/discover/images/favicons/${theme}/favicon.svg?v=1`}
        rel="icon"
        type="image/svg+xml"
      />
      <link
        href={`/discover/images/favicons/${theme}/apple-touch-icon.png?v=1`}
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href={`/discover/images/favicons/${theme}/favicon-32x32.png?v=1`}
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href={`/discover/images/favicons/${theme}/favicon-16x16.png?v=1`}
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link
        crossOrigin="use-credentials"
        href={`/discover/images/favicons/${theme}/site.webmanifest?v=1`}
        rel="manifest"
      />
      <link
        href={`/discover/images/favicons/${theme}/favicon.ico?v=1`}
        rel="shortcut icon"
      />
      <meta
        content={`/discover/images/favicons/${theme}/browserconfig.xml?v=1`}
        name="msapplication-config"
      />
      {!!breadcrumbLinks?.length && (
        <script
          dangerouslySetInnerHTML={{
            __html: generateSchemaBreadcrumbs(
              currentLink || null,
              breadcrumbLinks || [],
              locale,
            ),
          }}
          type="application/ld+json"
        />
      )}

      {!!hasOrgSchema && pageSchemas?.organizationSchema && (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateOrganizationSchema(pageSchemas.organizationSchema),
            ),
          }}
          type="application/ld+json"
        />
      )}
      {currentLink && pageSchemas?.organizationSchema && schemaData && (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateNewsArticleSchema(
                currentLink,
                topModules,
                modules,
                schemaData,
                pageSchemas.organizationSchema,
              ),
            ),
          }}
          type="application/ld+json"
        />
      )}
      {videoSchemas &&
        pageSchemas?.organizationSchema &&
        videoSchemas.map((videoSchema, index) => {
          return (
            <script
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  generateVideoSchema(
                    pageSchemas.organizationSchema as OrganizationSchemaProps,
                    videoSchema,
                  ),
                ),
              }}
              key={index}
              type="application/ld+json"
            />
          );
        })}
      {children}
    </NextHead>
  );
};

export default Head;
