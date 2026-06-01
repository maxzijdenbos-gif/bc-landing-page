import { HeroGuidesAndArticlesProps } from './hero-guides-and-articles';

const defaultStub: HeroGuidesAndArticlesProps = {
  dateModified: 'August 05 2024',
  datePublished: 'August 04 2024',
  doRecut: false,
  doWaterMark: true,
  headline:
    'Saddle Up with Confidence: What to know before your Bike Fit Appointment',
  imageObject: {
    alt: 'a man riding a bike on a road in the mountains',
    diImage: {
      image: {
        _meta: {
          schema:
            'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
        },
        defaultHost: 'cdn.media.amplience.net',
        endpoint: 'merklenesandbox',
        id: 'e408e6b6-e978-4af7-9c61-7f515a62f9ac',
        mimeType: 'image/png',
        name: 'HeroMountainBiking',
      },
    },
  },
  leadParagraph:
    "Everyone's unique body shape and size, along with injuries and personal goals, can affect how comfortable and efficient you are on your bike. Our bikes have adjustable components to tailor to your specific needs. Bike fit aims to optimize comfort, efficiency, and power by adjusting the bike's setup.",
  schemaData: {
    author: [
      {
        authorName: 'Author Name',
        authorType: 'Person',
      },
    ],
  },
  tags: [
    {
      hide: false,
      tag: [
        {
          _meta: {
            deliveryId: '3c56dcd2-cb8b-464e-a097-a235ec0287b9',
            hierarchy: {
              parentId: '1f96e46c-4032-4256-b3b2-9f65c78f7bdf',
              root: false,
            },
            name: 'Mountain',
            schema: 'https://giant.com/content/Tag',
          },
          tagText: 'Mountain',
        },
      ],
    },
    {
      hide: false,
      tag: [
        {
          _meta: {
            deliveryId: '0bb646e4-479e-4178-b9cd-87f8f106bada',
            hierarchy: {
              parentId: 'bbfb6a12-56a5-4481-bc88-c063380caf04',
              root: false,
            },
            name: 'Glory',
            schema: 'https://giant.com/content/Tag',
          },
          tagText: 'Glory',
        },
      ],
    },
    {
      hide: true,
      tag: [
        {
          _meta: {
            deliveryId: 'a89ff0c8-3b60-448c-a4a7-e5a9516a42f1',
            hierarchy: {
              parentId: '1f96e46c-4032-4256-b3b2-9f65c78f7bdf',
              root: false,
            },
            name: 'Ebike',
            schema: 'https://giant.com/content/Tag',
          },
          tagText: 'E-bike',
        },
      ],
    },
  ],
  waterMark: {
    _meta: {
      deliveryId: '0ba4471d-021b-402f-aa89-c6a5ef8401b9',
      name: 'Brand content',
      schema: 'https://giant.com/content/BrandContent',
    },
    imageObject: {
      alt: 'Giant logo',
      diImage: {
        image: {
          _meta: {
            schema:
              'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
          },
          defaultHost: 'cdn.media.amplience.net',
          endpoint: 'merklenesandbox',
          id: '4b1df721-4218-4412-b4f4-98132f9e684c',
          mimeType: 'image/png',
          name: 'Watermark_Giant_Desktop',
        },
      },
    },
    imageObjectMobile: {
      alt: 'Giant logo mobile',
      diImage: {
        image: {
          _meta: {
            schema:
              'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
          },
          defaultHost: 'cdn.media.amplience.net',
          endpoint: 'merklenesandbox',
          id: '631cd51c-226b-4b95-b5c8-79000ba6af74',
          mimeType: 'image/png',
          name: 'Watermark_Giant_Mobile',
        },
      },
    },
  },
};

const onlyText: HeroGuidesAndArticlesProps = {
  ...defaultStub,
  doWaterMark: false,
  imageObject: undefined,
};
const recut: HeroGuidesAndArticlesProps = {
  ...defaultStub,
  doRecut: true,
};

export default <Record<string, HeroGuidesAndArticlesProps>>{
  default: defaultStub,
  onlyText: onlyText,
  recut: recut,
};
