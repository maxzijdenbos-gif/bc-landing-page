import config from 'next.config';
import { HeroGuidesAndArticlesProps } from 'components/organisms/hero-guides-and-articles/hero-guides-and-articles';
import { ModuleAccordionIntoTextLines } from 'components/organisms/module-accordion/module-accordion';
import { CopyIntoTextLines } from 'components/organisms/text/text';
import { TwoColumnFactsIntoTextLines } from 'components/organisms/two-column-facts/two-column-facts';
import { OrganizationSchemaProps } from 'integrations/content/amplience/endpoints/schema/schema.types';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import { getImageObjectUrl } from '../social-meta-tags';

export type ComponentPropsIntoTextLinesFunction<T> = (
  lineBuffer: string[],
  data: T,
) => void;

const extractors: Record<string, ComponentPropsIntoTextLinesFunction<any>> = {
  Accordion: ModuleAccordionIntoTextLines,
  Copy: CopyIntoTextLines,
  TwoColumnFacts: TwoColumnFactsIntoTextLines,
};

const extractDataFromModules = (
  topModules: PageAdapter['topModules'],
  modules: PageAdapter['modules'],
) => {
  const topModule = topModules[0]?.data as HeroGuidesAndArticlesProps;

  if (!topModule) return;

  const articleBodyLines: string[] = topModule.leadParagraph
    ? [topModule.leadParagraph]
    : [];

  for (const mod of modules) {
    const key = mod.name as string;

    if (!extractors[key]) continue;

    extractors[key](articleBodyLines, mod.data);
  }

  const { dateModified, datePublished, headline } = topModule;

  const image = topModule.imageObject
    ? [getImageObjectUrl(topModule.imageObject)]
    : [];

  return {
    articleBody: articleBodyLines.join('\n\n'),
    dateModified,
    datePublished,
    headline,
    image,
  };
};

const generate = (
  currentLink: BaseLink,
  topModules: PageAdapter['topModules'],
  modules: PageAdapter['modules'],
  schemaData: PageAdapter['schemaData'],
  organizationSchema: OrganizationSchemaProps,
) => {
  if (!process.env.NEXT_PUBLIC_DOMAIN_NAME) return null;

  const extract = extractDataFromModules(topModules, modules);

  if (!extract) return;

  const { articleBody, dateModified, datePublished, headline, image } = extract;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    articleBody,
    author: {
      '@type': schemaData?.author?.[0]?.authorType || 'Organization',
      name: schemaData?.author?.[0].authorName || organizationSchema.name,
    },
    dateModified: dateModified || datePublished,
    datePublished,
    headline,
    image,
    mainEntityOfPage: organizationSchema.mainEntityOfPage[0]?.internalLink,
    publisher: {
      '@type': 'Organization',
      logo: {
        '@type': 'ImageObject',
        url: organizationSchema.logo,
      },
      name: organizationSchema.name,
    },
    url: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${config.basePath}/${currentLink.internalLink}`,
  };
};

export default generate;
