/* eslint-disable sort-keys */
import { OrganizationSchemaProps } from 'integrations/content/amplience/endpoints/schema/schema.types';
import { WistiaMedia } from 'pages/amplience/extensions/wistia-schema';

const generate = (
  organizationSchema: OrganizationSchemaProps,
  wistiaSchema: WistiaMedia,
) => {
  const thumbnailAsset = wistiaSchema?.assets?.find(
    ({ type }) => type === 'still_image',
  );
  const videoAsset = wistiaSchema?.assets?.find(
    ({ type }) => type === 'original',
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: wistiaSchema.name,
    description: wistiaSchema.seoDescription,
    thumbnailUrl: thumbnailAsset?.url,
    uploadDate:
      videoAsset && new Date(videoAsset.created_at * 1000).toISOString(),
    duration: `PT${Math.floor(wistiaSchema.duration)}S`,
    contentUrl: videoAsset && videoAsset.url,
    publisher: {
      '@type': 'Organization',
      logo: {
        '@type': 'ImageObject',
        url: organizationSchema.logo,
      },
      name: organizationSchema.name,
    },
    author: {
      '@type': wistiaSchema?.author?.[0]?.authorType || 'Organization',
      name: wistiaSchema?.author?.[0]?.authorName || organizationSchema.name,
    },
    transcript: wistiaSchema?.captions?.[0]?.text,
  };
};

export default generate;
