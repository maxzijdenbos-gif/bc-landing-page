import { createContext } from 'react';

interface HierarchyLinks {
  breadcrumbLinks: BaseLink[] | null;
  currentLink: BaseLink | null;
  drilldownLinks: BaseLink[] | null;
}

const HierarchyLinksContext = createContext<HierarchyLinks>({
  breadcrumbLinks: null,
  currentLink: null,
  drilldownLinks: null,
});

export default HierarchyLinksContext;
