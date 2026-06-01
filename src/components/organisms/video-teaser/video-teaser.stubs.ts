import { VideoTeaserProps } from './video-teaser';

const amplienceMock: VideoTeaserProps = {
  quoteElements: [
    {
      byline: {
        authorDescription: 'Just Ride Bikes',
        authorName: 'David Arthur',
        avatar: {
          alt: 'a man riding a blue bike down a road in the grass',
          diImage: {
            aspectLock: '1:1',
            bri: 0,
            crop: [1126, 36, 151, 151],
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
              id: 'a7e0d8b7-d40d-4cf8-86e2-0fdeb7627b5e',
              mimeType: 'image/png',
              name: 'Front_Page',
            },
            poi: {
              x: -1,
              y: -1,
            },
            query: 'crop={58.65%},{4.5%},{7.86%},{18.88%}',
            rot: 0,
            sat: 0,
          },
        },
      },
      promotionText:
        'You know what? This TCR makes riding too easy - it’s too light, it’s too stiff, it’s too FAST.',
    },
  ],
  videoLink: [
    {
      externalLink:
        'https://www.youtube.com/watch?v=Pcmvcomq8qw&pp=ygULZ2lhbnQgYmlrZXM%3D',
      linkText: 'WATCH THE VIDEO',
      target: '_blank',
    },
  ],
  videoObject: {
    altText: 'Cyclist riding a road bike through scenic landscape',
    video: {
      _meta: {
        schema:
          'http://bigcontent.io/cms/schema/v1/core#/definitions/video-link',
      },
      altText: 'Cyclist riding from video object alt text',
      defaultHost: 'cdn.media.amplience.net',
      endpoint: 'merklenesandbox',
      id: '2b1414a6-6fd6-429f-9e77-ea649e8f2f52',
      mimeType: 'video/quicktime',
      name: 'bg-bike',
    },
  },
};

const defaultStub: VideoTeaserProps = amplienceMock;
const videoAltTextFallbackStub: VideoTeaserProps = {
  ...amplienceMock,
  videoObject: {
    altText: 'Fallback alt text from video object',
    video: {
      _meta: {
        schema:
          'http://bigcontent.io/cms/schema/v1/core#/definitions/video-link',
      },
      altText: 'Fallback alt text from video object',
      defaultHost: 'cdn.media.amplience.net',
      endpoint: 'merklenesandbox',
      id: '2b1414a6-6fd6-429f-9e77-ea649e8f2f52',
      mimeType: 'video/quicktime',
      name: 'bg-bike',
    },
  },
};

const videoObjectSchemaStub: VideoTeaserProps = {
  ...amplienceMock,
  altText: 'alternative text example',
  videoObject: {
    altText: 'a man on a bike',
    video: {
      _meta: {
        schema:
          'http://bigcontent.io/cms/schema/v1/core#/definitions/video-link',
      },
      defaultHost: 'cdn.media.amplience.net',
      endpoint: 'giantgroup',
      id: 'fc14ed51-f0a0-40f2-91de-3decb91423f8',
      mimeType: 'video/mp4',
      name: 'Made-Faster_The-All-New-TCR-MY2512sec',
    },
  },
};

export default <Record<string, VideoTeaserProps>>{
  default: defaultStub,
  videoAltTextFallback: videoAltTextFallbackStub,
  videoObjectSchema: videoObjectSchemaStub,
};
