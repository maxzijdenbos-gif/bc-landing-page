import { HeroRangeProps } from './hero-range';

const defaultStub: HeroRangeProps = {
  imageObject: {
    alt: 'Test',
    diImage: {
      aspectLock: 'clear',
      bri: 0,
      crop: [0, 0, 0, 0],
      hue: 0,
      image: {
        _meta: {
          schema:
            'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
        },
        defaultHost: '1cv82es2irxh611i9hijypz4d9.staging.bigcontent.io',
        endpoint: 'merklenesandbox',
        id: '26ea56fe-4ec5-4e7c-9410-34b5aa3ab5df',
        mimeType: 'image/png',
        name: 'test1',
      },
      poi: {
        x: -1,
        y: -1,
      },
      rot: 0,
      sat: 0,
    },
    dimensions: {
      height: 940,
      width: 1443,
    },
  },
  leadParagraphs: [
    {
      paragraphButton: [
        {
          link: { linkText: 'PLAY VIDEO' },
        },
      ],
      paragraphText:
        'The new TCR builds on innovations of the bikes that came before it, achieving greater efficiency, improved aerodynamics, and more seamless integration to elevate the road riding experience.',
    },
    {
      paragraphButton: [
        {
          link: {
            linkText: 'SHOP BIKE',
          },
        },
      ],
      paragraphText:
        'Integrated disc brakes deliver smooth, powerful stopping power and modulation for added control in variable weather and road conditions.',
    },
  ],
  rangeButton: [
    {
      link: {
        linkText: 'SHOP BIKE',
      },
    },
  ],

  title: 'THE TOTAL RACE BIKE Made faster',
};

const withRangeLogoStub: HeroRangeProps = {
  ...defaultStub,
  bikeCategory: 'road',
  rangeIconReference: [{ rangeIconsName: 'defy' }],
};

export default <Record<string, HeroRangeProps>>{
  default: defaultStub,
  withRangeLogo: withRangeLogoStub,
};
