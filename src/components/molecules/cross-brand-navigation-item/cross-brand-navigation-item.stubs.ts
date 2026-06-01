import { CrossBrandNavigationItemProps } from './cross-brand-navigation-item';

const defaultStub: CrossBrandNavigationItemProps = {
  brand: {
    brandDefinition: 'giant',
    crossBrandImageAltText: 'Hover text',
    crossBrandLink: [
      {
        externalLink: 'https://www.liv-cycling.com/dk',
        linkText: 'For [...]',
        target: '_blank',
      },
    ],
  },
};
const livStub: CrossBrandNavigationItemProps = {
  brand: {
    brandDefinition: 'liv',
    crossBrandImageAltText: 'Hover text',
    crossBrandLink: [
      {
        externalLink: 'https://www.liv-cycling.com/dk',
        linkText: 'For her',
        target: '_blank',
      },
    ],
  },
};
const momentumStub: CrossBrandNavigationItemProps = {
  brand: {
    brandDefinition: 'momentum',
    crossBrandImageAltText: 'Hover text',
    crossBrandLink: [
      {
        externalLink: 'https://www.liv-cycling.com/dk',
        linkText: 'For city life',
        target: '_blank',
      },
    ],
  },
};

export default <Record<string, CrossBrandNavigationItemProps>>{
  default: defaultStub,
  liv: livStub,
  momentum: momentumStub,
};
