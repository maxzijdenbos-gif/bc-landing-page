import { FooterProps } from './footer';

const defaultStub: FooterProps = {
  _meta: {
    deliveryId: '4e66e1bf-43b1-43cf-bd53-4b214fd0ca94',
    name: 'Footer',
    schema: 'https://giant.com/modules/Footer',
  },
  brandImage: {
    _meta: {
      deliveryId: '03228700-9889-40f9-8f6a-70340fb67d45',
      name: 'Footer brand content',
      schema: 'https://giant.com/content/FooterBrandContent',
    },
    imageObject: {
      alt: 'Giant logo footer',
      diImage: {
        image: {
          _meta: {
            schema:
              'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
          },
          defaultHost: '1cv82es2irxh611i9hijypz4d9.staging.bigcontent.io',
          endpoint: 'merklenesandbox',
          id: '27dc9e1b-0388-48fd-ac2f-79e5a94670f7',
          mimeType: 'image/png',
          name: 'GiantFooter',
        },
      },
    },
  },
  copyrightText: 'Copyright © {{year}} Giant. All rights reserved.',
  languageLink: {
    iconClass: 'World_24',
    link: [
      {
        externalLink: 'https://www.giant-bicycles.com/global/countryselect',
        linkText: 'Link to language page',
        target: '_self',
      },
    ],
    selectedLanguage: 'USA',
  },
  linkColumns: [
    {
      header: 'Column 1',
      links: [
        {
          externalLink: '/link1',
          linkText: 'Link 1',
          target: '_self',
        },

        {
          externalLink: '/link2',
          linkText: 'Link 2',
        },
      ],
    },
    {
      header: 'Column 2',
      links: [
        {
          externalLink: '/link3',
          linkText: 'Link 3',
          target: '_self',
        },

        {
          externalLink: '/link4',
          linkText: 'Link 4',
          target: '_self',
        },
      ],
    },
    {
      header: 'Column 5',
      links: [
        {
          externalLink: '/link5',
          linkText: 'Link 5',
          target: '_self',
        },

        {
          externalLink: '/link6',
          linkText: 'Link 6',
        },
      ],
    },
  ],
  socialMediaLinks: [
    {
      iconClass: 'FacebookCircle',
      link: [
        {
          externalLink: 'https://facebook.com',
          linkText: 'Facebook',
          target: '_blank',
        },
      ],
    },
    {
      iconClass: 'Youtube',
      link: [
        {
          externalLink: 'https://youtube.com',
          linkText: 'Youtube',
          target: '_blank',
        },
      ],
    },
    {
      iconClass: 'Instagram',
      link: [
        {
          externalLink: 'https://Instagram.com',
          linkText: 'Instagram',
          target: '_blank',
        },
      ],
    },
  ],
};

export default <Record<string, FooterProps>>{
  default: defaultStub,
};
