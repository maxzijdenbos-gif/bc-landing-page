import { Image, ImageUrlBuilder } from 'dc-delivery-sdk-js';
import config from 'next.config';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import {
  OrganizationSchemaPayload,
  OrganizationSchemaProps,
  PageSchemasProps,
} from './schema.types';

export const organizationSchemaAdapter = (
  locale: string,
  response: OrganizationSchemaPayload,
): OrganizationSchemaProps => {
  if (!response || typeof response !== 'object') {
    throw 'no response provided';
  }
  const localOrganizationUrl = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${config.basePath}/${locale}`;

  const constructImageSource = (
    imageObject: AmplienceImagePayload,
    height?: number,
    width?: number,
  ) => {
    const dimage = imageObject?.diImage;

    if (!dimage?.image) return '';

    const image = new Image(dimage.image, {});
    const baseImage = new ImageUrlBuilder(image)
      .host(dimage?.image.defaultHost)
      .quality(80);

    if (height) baseImage.height(height);
    if (width) baseImage.width(width);
    if (height && width) baseImage.parameter('sm', 'mc');

    return baseImage.build();
  };

  return {
    ...response,
    image: constructImageSource(response.imageObject),
    logo: constructImageSource(response.logo, 200, 200),
    url: localOrganizationUrl,
  };
};

export const schemaAdapter = ({
  organizationSchema,
}: {
  organizationSchema: OrganizationSchemaProps | null;
}): PageSchemasProps => {
  return {
    organizationSchema,
  };
};
