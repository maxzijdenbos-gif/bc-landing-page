import { VideoProps } from './video';

const defaultStub: VideoProps = {
  autoPlay: false,
  controls: true,
  loop: false,
  src: '/media/video-1.webm',
  videoObject: {
    _meta: {
      schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/video-link',
    },
    defaultHost: '1cv82es2irxh611i9hijypz4d9.staging.bigcontent.io',
    endpoint: 'merklenesandbox',
    id: 'c8465840-4164-4d24-96d5-c99ebaa8dd0f',
    mimeType: 'video/quicktime',
    name: 'AnyaFinn-Shoppable',
  },
};

export default <Record<string, VideoProps>>{
  default: defaultStub,
};
