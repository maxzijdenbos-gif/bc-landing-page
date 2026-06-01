import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import { BREADCRUMB_CURRENT_PAGE_PATH } from '../breadcrumb/breadcrumb.mock';

const drilldownLinksMock: PageAdapter['drilldownLinks'] = [
  { internalLink: 'en-us/explore', linkText: 'Explore all' },
  {
    internalLink: BREADCRUMB_CURRENT_PAGE_PATH,
    linkText: 'Explore Mountain bikes',
  },
];

export default drilldownLinksMock;
