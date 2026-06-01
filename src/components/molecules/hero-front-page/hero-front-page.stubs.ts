import { HeroFrontPageProps } from './hero-front-page';

const defaultStub: HeroFrontPageProps = {
  textTeaser: 'Explore uncharted territories',
  title: 'Unleash the rush',
  videoObject: {
    altText: 'Collage of riding footage across various biking disciplines',
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
};

export default <Record<string, HeroFrontPageProps>>{
  default: defaultStub,
};
