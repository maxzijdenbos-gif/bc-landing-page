import { HeroWithImageProps } from './hero-with-image';

const defaultStub: HeroWithImageProps = {
  buttonGroup: [
    {
      lineBreakBefore: false,
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
        linkText: 'Shop now',
        target: '_self',
      },
      style: 'Primary',
    },
    {
      lineBreakBefore: false,
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
      style: 'Secondary',
    },
  ],
  color: 'primary',
  doRecut: false,
  heroText:
    'Enduro is a mountain biking style that lets you balance technical descents with tough climbs. Perfect for riders who crave the ticking of a clock and the thumping of their heart. It’s not about either speed or exploration but both. Enduro offers the perfect blend of challenge and excitement for adventure-minded and technically skilled riders.',
  imageObject: {
    alt: 'a mountain biker jumping a rock on a trail',
    diImage: {
      aspectLock: 'poi',
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
        id: '8f3060d3-fa3f-4dee-a5f3-548206a6409b',
        name: 'Image',
      },
      poi: {
        x: 0.7118421052631578,
        y: 0.24675095560129373,
      },
      query: 'poi=0.7118,0.2468,0,0&scaleFit=poi',
      rot: 0,
      sat: 0,
    },
  },
  title: 'This is Enduro',
};

export default <Record<string, HeroWithImageProps>>{
  default: defaultStub,
};
