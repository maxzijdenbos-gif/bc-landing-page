import { PortraitImageGalleryProps } from './portrait-image-gallery';

const defaultStub: PortraitImageGalleryProps = {
  imageElements: [
    {
      imageObject: {
        alt: 'This is an alt text for the image',
        diImage: {
          image: {
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
            },
            defaultHost: 'cdn.media.amplience.net',
            endpoint: 'giantgroup',
            id: '3394087e-1e95-4925-9271-55c065952125',
            mimeType: 'image/png',
            name: 'BikePortrait3',
          },
        },
      },
    },
    {
      imageObject: {
        alt: 'This is a second alt text for the image',
        diImage: {
          image: {
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
            },
            defaultHost: 'cdn.media.amplience.net',
            endpoint: 'giantgroup',
            id: 'c0bdac7d-afff-400b-8118-66a66467f938',
            mimeType: 'image/png',
            name: 'BikePortrait2',
          },
        },
      },
    },
    {
      imageObject: {
        alt: 'And yet another alt text',
        diImage: {
          image: {
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
            },
            defaultHost: 'cdn.media.amplience.net',
            endpoint: 'giantgroup',
            id: 'a2ad4370-c097-407e-a767-f6855bae5202',
            mimeType: 'image/png',
            name: 'BikePortrait1',
          },
        },
      },
    },
    {
      imageObject: {
        alt: 'A man riding a bike down a curvy road with a mountain in the background (tried the generator here, I like it!)',
        diImage: {
          image: {
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
            },
            defaultHost: 'cdn.media.amplience.net',
            endpoint: 'giantgroup',
            id: '3394087e-1e95-4925-9271-55c065952125',
            mimeType: 'image/png',
            name: 'BikePortrait3',
          },
        },
      },
    },
    {
      imageObject: {
        alt: 'A man riding a bike on a road with mountains in the background',
        diImage: {
          image: {
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
            },
            defaultHost: 'cdn.media.amplience.net',
            endpoint: 'giantgroup',
            id: '624dfa8e-7639-4017-9351-f784ec45ff1b',
            mimeType: 'image/png',
            name: 'BikePortrait2',
          },
        },
      },
    },
  ],
  title: 'Save big this Holiday Season',
};

export default <Record<string, PortraitImageGalleryProps>>{
  default: defaultStub,
};
