import { CrossBrandNavigationProps } from './cross-brand-navigation';

const defaultStub: CrossBrandNavigationProps = {
  brands: [
    {
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
    {
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
    {
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
  ],
};

export default <Record<string, CrossBrandNavigationProps>>{
  default: defaultStub,
};
