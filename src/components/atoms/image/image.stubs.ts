import { ImageProps } from './image';

const defaultStub: ImageProps = {
  alt: '',
  className: '',
  fill: false,
  height: 864,
  imageObject: {
    alt: 'two tubes of skin care products sitting on top of a yellow background',
    diImage: {
      aspectLock: '',
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
        defaultHost: 'cdn.media.amplience.net',
        endpoint: 'merklenesandbox',
        id: '63500285-56df-4a5e-b1dc-d39e4420704b',
        mimeType: 'image/png',
        name: 'shot_02_origins_masking_010',
      },
      poi: {
        x: 0,
        y: 0,
      },
      rot: 0,
      sat: 0,
    },
  },
  priority: false,
  sizes: '',
  src: 'media/sample-image.webp',
  title: '',
  width: 864,
};

export default <Record<string, ImageProps>>{
  default: defaultStub,
};
