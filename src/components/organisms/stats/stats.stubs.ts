import { StatsProps } from './stats';

const defaultStub: StatsProps = {
  backgroundImageObject: {
    alt: 'Bike',
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
        defaultHost: '1cv82es2irxh611i9hijypz4d9.staging.bigcontent.io',
        endpoint: 'merklenesandbox',
        id: 'd4f5e15c-ef1d-49c8-9333-98ce561fda0e',
        mimeType: 'image/png',
        name: 'BikePortrait3',
      },
      poi: {
        x: 0,
        y: 0,
      },
      rot: 0,
      sat: 0,
    },
  },
  button: [
    {
      lineBreakBefore: false,
      link: {
        internalLink: '/en-us/support',
        internalLinkRef: [
          {
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
            },
            contentType: 'https://giant.com/pages/GenericPage',
            id: '9204674c-0c8c-4ca4-b09a-1e63c8358ecf',
          },
        ],
        linkText: 'Stats button',

        target: '_self',
      },
      style: 'Secondary',
    },
  ],
  foregroundMedia: [
    {
      altText: 'Anya Finn showcasing shoppable bike features and ride',
      type: 'video',
      video: {
        _meta: {
          schema:
            'http://bigcontent.io/cms/schema/v1/core#/definitions/video-link',
        },
        defaultHost: '1cv82es2irxh611i9hijypz4d9.staging.bigcontent.io',
        endpoint: 'merklenesandbox',
        id: 'c8465840-4164-4d24-96d5-c99ebaa8dd0f',
        mimeType: 'video/quicktime',
        name: 'AnyaFinn-Shoppable',
      },
    },
  ],
  legalText: '*Than previous generation',
  stats: [
    {
      statsTitle: 'Lighter*',
      statsValue: '38,43G',
    },
    {
      statsTitle: 'Stiffer',
      statsValue: '53%',
    },
    {
      statsTitle: 'More efficient*',
      statsValue: '38,43G',
    },
    {
      statsTitle: 'More efficient*',
      statsValue: '3,38%',
    },
  ],
  title: 'Lighter. Stiffer. Faster',
};

export default <Record<string, StatsProps>>{
  default: defaultStub,
};
