import { ContentHighlightProps } from './content-highlight';

const defaultStub: ContentHighlightProps = {
  backgroundImageObject: {
    diImage: {
      aspectLock: 'clear',
      bri: 0,
      crop: [0, 0, 0, 0],
      fliph: false,
      flipv: false,
      hue: 0,
      image: {
        _meta: {
          schema:
            'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
        },
        defaultHost: '1qff1v2nv6fpm13egpoympvtd3.staging.bigcontent.io',
        endpoint: 'giantgroup',
        id: '6d8c101b-5dbe-4ada-a851-3cf47c45d8d6',
        mimeType: 'image/jpeg',
        name: 'nav_mtb_bike_fs_m',
      },
      poi: {
        x: -1,
        y: -1,
      },
      rot: 0,
      sat: 0,
    },
  },
  buttonGroup: [
    {
      link: {
        internalLink: '/en-us/bikes',
        internalLinkRef: [
          {
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
            },
            contentType: 'https://giant.com/pages/ProductListPage',
            id: 'a67f292f-f84c-4311-8922-d9d24f966632',
          },
        ],
        linkText: 'Shop here',
        target: '_self',
      },
    },
    {
      link: {
        internalLink: '/en-us/generic-page',
        internalLinkRef: [
          {
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
            },
            contentType: 'https://giant.com/pages/GenericPage',
            id: '10a2243c-8667-45d2-aca0-b528931491a0',
          },
        ],
        linkText: 'Read more',
        target: '_self',
      },
    },
  ],
  contentType: 'content',
  headline: 'Content Headline',
  label: '2025',
  paragraph:
    'The official bike of WorldTeam Liv AlUla Jayco, the Langma Advanced SL is the queen of all-rounder performance. The race-engineered frameset and components are seamlessly integrated, delivering the efficient power transfer you need to rule the mountains. Superior control and aerodynamics slingshot you through the finish in a blur of glory.',
};

const productTeaserTextQuinaryStub: ContentHighlightProps = {
  buttonGroup: [
    {
      link: {
        internalLink: '/en-us/bikes',
        internalLinkRef: [
          {
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
            },
            contentType: 'https://giant.com/pages/ProductListPage',
            id: 'a67f292f-f84c-4311-8922-d9d24f966632',
          },
        ],
        linkText: 'Shop here',
        target: '_self',
      },
    },
    {
      link: {
        internalLink: '/en-us/generic-page',
        internalLinkRef: [
          {
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
            },
            contentType: 'https://giant.com/pages/GenericPage',
            id: '10a2243c-8667-45d2-aca0-b528931491a0',
          },
        ],
        linkText: 'Read more',
        target: '_self',
      },
    },
  ],
  contentType: 'product',
  headline: 'Product headline',
  label: '2025',
  paragraph:
    'The official bike of WorldTeam Liv AlUla Jayco, the Langma Advanced SL is the queen of all-rounder performance. The race-engineered frameset and components are seamlessly integrated, delivering the efficient power transfer you need to rule the mountains. Superior control and aerodynamics slingshot you through the finish in a blur of glory.',
  productImageObject: {
    alt: 'a mountain bike is shown against a black background',
    diImage: {
      aspectLock: '1:1',
      bri: 0,
      crop: [226, 84, 970, 970],
      fliph: false,
      flipv: false,
      hue: 0,
      image: {
        _meta: {
          schema:
            'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
        },
        defaultHost: '1qff1v2nv6fpm13egpoympvtd3.staging.bigcontent.io',
        endpoint: 'giantgroup',
        id: '752593a4-d4fa-486b-8e2a-df29e45f8347',
        mimeType: 'image/png',
        name: 'spotimage',
      },
      poi: {
        x: -1,
        y: -1,
      },
      query: 'crop={18.9%},{7.34%},{81.1%},{84.79%}',
      rot: 0,
      sat: 0,
    },
  },
  theme: 'quinary',
};

const productTeaserLogoSecondaryStub: ContentHighlightProps = {
  ...productTeaserTextQuinaryStub,
  backgroundImageObject: {
    diImage: {
      aspectLock: 'clear',
      bri: 0,
      crop: [0, 0, 0, 0],
      fliph: false,
      flipv: false,
      hue: 0,
      image: {
        _meta: {
          schema:
            'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
        },
        defaultHost: '1qff1v2nv6fpm13egpoympvtd3.staging.bigcontent.io',
        endpoint: 'giantgroup',
        id: '6d8c101b-5dbe-4ada-a851-3cf47c45d8d6',
        mimeType: 'image/jpeg',
        name: 'nav_mtb_bike_fs_m',
      },
      poi: {
        x: -1,
        y: -1,
      },
      rot: 0,
      sat: 0,
    },
  },
  contentType: 'product',
  rangeLogoReference: [{ rangeIconsName: 'tcx' }],
  theme: 'secondary',
};

const productTeaserLogoSecondaryNoBackgroundStub: ContentHighlightProps = {
  ...productTeaserLogoSecondaryStub,
  backgroundImageObject: undefined,
};
const productTeaserLogoQuinaryNoBackgroundStub: ContentHighlightProps = {
  ...productTeaserLogoSecondaryStub,
  backgroundImageObject: undefined,
  theme: 'quinary',
};

export default <Record<string, ContentHighlightProps>>{
  default: defaultStub,
  productTeaserLogoQuinaryNoBackgroundStub,
  productTeaserLogoSecondaryNoBackgroundStub,
  productTeaserLogoSecondaryStub,
  productTeaserTextQuinaryStub,
};
