import { HeroCategoryProps } from './hero-category';

const defaultStub: HeroCategoryProps = {
  button: [
    {
      internalLink: '/en-us',
      internalLinkRef: [
        {
          _meta: {
            schema:
              'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
          },
          contentType: 'https://giant.com/pages/HomePage',
          id: '698684be-bb2d-4ce9-8053-99bd92fe3378',
        },
      ],
      linkText: 'Shop now',
      target: '_self',
    },
  ],
  heroText:
    'Montainbiking is limitless action. A forest is a highway. A desert is an intersection. An icy lake is hangout. Built for everything from steep, technical trails to fast and flowy singletracks, our range of mountain bikes turns you into a force of nature. Explore the fun of full suspension, the highs of hardtail, and the X of X. Scroll now, ride later.',
  media: [
    {
      image: {
        alt: 'a man riding a bike on a road in the mountains',
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
            id: '8f3060d3-fa3f-4dee-a5f3-548206a6409b',
            mimeType: 'image/png',
            name: 'Image',
          },
          poi: {
            x: -1,
            y: -1,
          },
          rot: 0,
          sat: 0,
        },
      },
      type: 'image',
    },
  ],
  title: 'Mountain biking',
};

const withVideoStub: HeroCategoryProps = {
  button: [
    {
      internalLink: '/en-us',
      internalLinkRef: [
        {
          _meta: {
            schema:
              'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
          },
          contentType: 'https://giant.com/pages/HomePage',
          id: '698684be-bb2d-4ce9-8053-99bd92fe3378',
        },
      ],
      linkText: 'Shop now',
      target: '_self',
    },
  ],
  heroText:
    'Montainbiking is limitless action. A forest is a highway. A desert is an intersection. An icy lake is hangout. Built for everything from steep, technical trails to fast and flowy singletracks, our range of mountain bikes turns you into a force of nature.',
  media: [
    {
      altText: 'Rider on TCR bike in outdoor action on road',
      type: 'video',
      video: {
        _meta: {
          schema:
            'http://bigcontent.io/cms/schema/v1/core#/definitions/video-link',
        },
        defaultHost: '1cv82es2irxh611i9hijypz4d9.staging.bigcontent.io',
        endpoint: 'merklenesandbox',
        id: '967a1ac9-855d-4c3c-82b2-f2602384ef65',
        mimeType: 'video/mp4',
        name: 'tcr red action outdoor 60fps_V1-0002',
      },
    },
  ],
  title: 'Mountain biking',
};

export default <Record<string, HeroCategoryProps>>{
  default: defaultStub,
  withVideo: withVideoStub,
};
