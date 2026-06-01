import { ParagraphWithMediaProps } from './paragraph-with-media';

const defaultStub: ParagraphWithMediaProps = {
  backgroundImageObject: {
    alt: 'a man riding a bike on a road near a rocky hill',
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
        id: '18d24d4b-0fe3-4636-a07b-73c442c46e26',
        mimeType: 'image/jpeg',
        name: 'MY25_TCR_Advanced_Pro_0_AXS_ColorA_Action_WebRes_12',
      },
      poi: { x: -1, y: -1 },
      rot: 0,
      sat: 0,
    },
  },
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
        linkText: 'Shop here',
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
  foregroundMedia: [
    {
      image: {
        alt: 'a man riding a mountain bike on a dirt trail',
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
            id: '6d8c101b-5dbe-4ada-a851-3cf47c45d8d6',
            mimeType: 'image/jpeg',
            name: 'nav_mtb_bike_fs_m',
          },
          poi: { x: -1, y: -1 },
          rot: 0,
          sat: 0,
        },
      },
      type: 'image',
    },
  ],
  mediaPlacement: 'Right',
  paragraphText:
    "It's a full-body workout and it boosts balance and coordination. It is a mentally relaxing and stress-relieving activity, and it offers a connection with nature. Some race for thrills, others enjoy it for relaxation.",
  title: 'Mountain biking is all about riding on off-road trails',
};

const onlyBackgroundImage: ParagraphWithMediaProps = {
  ...defaultStub,
  foregroundMedia: [],
};
const withVideo: ParagraphWithMediaProps = {
  ...defaultStub,
  foregroundMedia: [
    {
      altText: 'TCR and Team Jayco-AlUla bike in motion on the road',
      type: 'video',
      video: {
        _meta: {
          schema:
            'http://bigcontent.io/cms/schema/v1/core#/definitions/video-link',
        },
        defaultHost: '1qff1v2nv6fpm13egpoympvtd3.staging.bigcontent.io',
        endpoint: 'giantgroup',
        id: 'facae93c-c0cb-4de4-8ba5-e34644071844',
        mimeType: 'video/mp4',
        name: 'TCR_x_TeamJaycoAlUla 20sec',
      },
    },
  ],
};

const mediaPositionedLeft: ParagraphWithMediaProps = {
  ...defaultStub,
  mediaPlacement: 'Left',
};
const grayBackground: ParagraphWithMediaProps = {
  ...defaultStub,
  color: 'quinary',
};

export default <Record<string, ParagraphWithMediaProps>>{
  default: defaultStub,
  grayBackground,
  mediaPositionedLeft,
  onlyBackgroundImage,
  withVideo,
};
