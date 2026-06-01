import { PageAdapter } from 'integrations/content/amplience/page/page.types';

export const BREADCRUMB_CURRENT_PAGE_PATH = 'en-us/explore/mountain-bikes';

const breadcrumbLinksMock: PageAdapter['breadcrumbLinks'] = [
  { internalLink: 'en-us/explore', linkText: 'Explore all' },
  {
    internalLink: BREADCRUMB_CURRENT_PAGE_PATH,
    linkText: 'Explore Mountain bikes',
  },
];

export default breadcrumbLinksMock;
