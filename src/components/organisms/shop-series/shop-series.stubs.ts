/* eslint-disable sort-keys */
import { ShopSeriesProps } from './shop-series';

const defaultStub: ShopSeriesProps = {
  seriesElements: [
    {
      fromPrice: '$2.000',
      imageObject: {
        diImage: {
          crop: [0, 0, 0, 0],
          rot: 0,
          hue: 0,
          sat: 0,
          bri: 0,
          fliph: false,
          flipv: false,
          poi: {
            x: -1,
            y: -1,
          },
          aspectLock: 'clear',
          image: {
            defaultHost: 'cdn.media.amplience.net',
            endpoint: 'merklenesandbox',
            mimeType: 'image/png',
            name: 'MY25 TCR Advanced Pro 1-Di2_Color A Carbon_Chrome',
            id: '1c86307b-2e08-47a5-a996-2012088a0740',
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
            },
          },
        },
        alt: 'TCR',
      },
      numberOfVariants: '3',
      link: 'https://www.giant-bicycles.com/us/propel-advanced-sl-0',
      seriesDescription:
        'From hors categorie climbs to rollers and flats, this WorldTour level race bike is the pro’s choice for all-rounder performance. The all-new flagship TCR uses system integration and innovative construction methods to deliver a clear advantage on the road.',

      seriesName: 'TCR Advanced SL',
      tags: ['New', 'Award winning'],
    },
    {
      fromPrice: '$12.570,00',
      imageObject: {
        diImage: {
          crop: [0, 0, 0, 0],
          rot: 0,
          hue: 0,
          sat: 0,
          bri: 0,
          fliph: false,
          flipv: false,
          poi: {
            x: -1,
            y: -1,
          },
          aspectLock: 'clear',
          image: {
            defaultHost: 'cdn.media.amplience.net',
            endpoint: 'merklenesandbox',
            mimeType: 'image/png',
            name: 'MY25 TCR Advanced 0-PC_Color A Frost Silver',
            id: 'c4ec1587-7ca6-4752-8bb5-c4bb264f9d6f',
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
            },
          },
        },
      },
      link: 'https://www.giant-bicycles.com/us/propel-advanced-sl-0',
      seriesName: 'TCR Advanced Pro',
      seriesDescription:
        'Superlight, ultra-efficient and rides like a dream. This well-rounded race bike blends industry-leading composite frame engineering with fully integrated components to help you climb, corner and descend with astonishing speed and sublime road handling.',
      tags: ['New'],
    },
    {
      fromPrice: '$12.570,00',
      imageObject: {
        alt: 'TCR',
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
            id: '1c86307b-2e08-47a5-a996-2012088a0740',
            mimeType: 'image/png',
            name: 'MY25 TCR Advanced Pro 1-Di2_Color A Carbon_Chrome',
          },
          poi: {
            x: -1,
            y: -1,
          },
          rot: 0,
          sat: 0,
        },
      },
      link: 'https://www.giant-bicycles.com/us/propel-advanced-sl-0',
      numberOfVariants: '7',
      seriesDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
      seriesName: 'Looooooooooooong bike name Trance X Advanced Pro',
      tags: ['New', 'Award winning'],
    },
  ],
};

export default <Record<string, ShopSeriesProps>>{
  default: defaultStub,
};
