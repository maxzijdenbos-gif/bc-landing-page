import { ModuleSitemapProps, SitemapNodeProps } from './module-sitemap';

const generateNode = (children?: SitemapNodeProps[]) => {
  const name = `Node Name with ${children?.length || 0} children`;

  return {
    children: children || [],
    content: {
      _meta: { name },
    },
  };
};

export const moduleSitemapMockHierarchyResponse = {
  children: [generateNode(), generateNode(), generateNode(), generateNode()],
  content: {},
};

const defaultStub: ModuleSitemapProps = {
  headline: 'Default headline',
};

export default <Record<string, ModuleSitemapProps>>{
  default: defaultStub,
};
