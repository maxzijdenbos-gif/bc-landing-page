import { StorytellingProps } from './storytelling';

const defaultStub: StorytellingProps = {
  bikeCategory: 'road',
  button: [
    {
      lineBreakBefore: false,
      link: {
        internalLink: '/en-us/all-bikes',
        linkText: 'All road bikes',
        target: '_blank',
      },
      style: 'Primary',
    },
  ],
  imageObject: {
    alt: 'a man riding a bike on a road with a mountain in the background',
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
        id: 'e408e6b6-e978-4af7-9c61-7f515a62f9ac',
        mimeType: '',
        name: 'HeroMountainBiking',
      },
      poi: {
        x: -1,
        y: -1,
      },
      rot: 0,
      sat: 0,
    },
    dimensions: {
      height: 810,
      width: 1440,
    },
  },
  textElements: [
    {
      headerText: 'GENERATION X',
      textElementChoice: 1,
    },
    {
      headerText:
        'Build to win races. Lighter weight and increased stiffness equals better efficiency on the road',
      textElementChoice: 2,
    },
    {
      bodyText:
        "It’s the result of a team effort involving Giant product developers, our in-house aerodynamics team, and the athletes and team technicians from Team Jayco-AlUla. The flagship model of the new range, the TCR Advanced SL, is the lightest, most efficient TCR ever. The entire range also features innovative new features that are largely made possible by new construction techniques.\n\nIt's about saving watts, but also about making the most of your road riding experience. Stiffness and weight matter, but not at the expense of ride quality or control. Internal cable routing and a more integrated cockpit improve aerodynamics and offer a cleaner profile, but not at the cost of overly complicated maintenance and adjustment.",
      headerText: 'Carries on a tradition that began 28 years ago',
      textElementChoice: 3,
    },
  ],
  videoObject: {
    altText: 'TCR road bike in red, outdoor action footage',
    video: {
      _meta: {
        schema:
          'http://bigcontent.io/cms/schema/v1/core#/definitions/video-link',
      },
      defaultHost: '1cv82es2irxh611i9hijypz4d9.staging.bigcontent.io',
      endpoint: 'merklenesandbox',
      id: '967a1ac9-855d-4c3c-82b2-f2602384ef65',
      mimeType: '',
      name: 'tcr red action outdoor 60fps_V1-0002',
    },
  },
};

export default <Record<string, StorytellingProps>>{
  default: defaultStub,
};
