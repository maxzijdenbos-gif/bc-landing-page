import { EndorsementsProps } from './endorsements';

const defaultStub: EndorsementsProps = {
  endorsements: [
    {
      endorsement: {
        byline: 'First byline',
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'First Link',
            target: '_blank',
          },
        ],
        quote: 'First quote',
        tagline: 'First tagline',
      },
    },
    {
      endorsement: {
        byline: 'Second byline',
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'Second Link',
            target: '_self',
          },
        ],
        quote: 'Second quote',
        tagline: 'Second tagline',
      },
    },
    {
      endorsement: {
        byline: 'Third byline',
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'Third Link',
            target: '_blank',
          },
        ],
        quote: 'Third quote',
        tagline: 'Third tagline',
      },
    },
    {
      endorsement: {
        byline: 'Fourth byline',
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'Fourth Link',
            target: '_self',
          },
        ],
        quote: 'Fourth quote',
        tagline: 'Fourth tagline',
      },
    },
    {
      endorsement: {
        byline: 'Fifth byline',
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'Fifth Link',
            target: '_blank',
          },
        ],
        quote: 'Fifth quote',
        tagline: 'Fifth tagline',
      },
    },
    {
      endorsement: {
        byline: 'Sixth byline',
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'Sixth Link',
            target: '_self',
          },
        ],
        quote: 'Sixth quote',
        tagline: 'Sixth tagline',
      },
    },
  ],
};

const withImagesStub: EndorsementsProps = {
  endorsements: [
    {
      endorsement: {
        byline: 'First byline',
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
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'First Link',
            target: '_blank',
          },
        ],
        quote: 'First quote',
        tagline: 'First tagline',
      },
    },
    {
      endorsement: {
        byline: 'Second byline',
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
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'Second Link',
            target: '_self',
          },
        ],
        quote: 'Second quote',
        tagline: 'Second tagline',
      },
    },
    {
      endorsement: {
        byline: 'Third byline',
        imageObject: {
          alt: 'Third portrait',
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
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'Third Link',
            target: '_blank',
          },
        ],
        quote: 'Third quote',
        tagline: 'Third tagline',
      },
    },
    {
      endorsement: {
        byline: 'Fourth byline',
        imageObject: {
          alt: 'Fourth portrait',
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
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'Fourth Link',
            target: '_self',
          },
        ],
        quote: 'Fourth quote',
        tagline: 'Fourth tagline',
      },
    },
    {
      endorsement: {
        byline: 'Fifth byline',
        imageObject: {
          alt: 'Fifth portrait',
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
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'Fifth Link',
            target: '_blank',
          },
        ],
        quote: 'Fifth quote',
        tagline: 'Fifth tagline',
      },
    },
    {
      endorsement: {
        byline: 'Sixth byline',
        imageObject: {
          alt: 'Sixth portrait',
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
        link: [
          {
            externalLink: 'https://giant-bicykles.com',
            linkText: 'Sixth Link',
            target: '_self',
          },
        ],
        quote: 'Sixth quote',
        tagline: 'Sixth tagline',
      },
    },
  ],
};

export default <Record<string, EndorsementsProps>>{
  default: defaultStub,
  withImages: withImagesStub,
};
