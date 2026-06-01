import { PageSchemasProps } from 'integrations/content/amplience/endpoints/schema/schema.types';

const generate = (
  organizationSchema: PageSchemasProps['organizationSchema'],
) => {
  if (!organizationSchema) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    address: {
      '@type': 'PostalAddress',
      addressCountry: organizationSchema.addressCountry,
      addressLocality: organizationSchema.addressLocality,
      addressRegion: organizationSchema.addressRegion,
      postalCode: organizationSchema.postalCode,
      streetAddress: organizationSchema.streetAddress,
    },
    contactPoint: organizationSchema.contactPoints?.map(
      ({ contactType, telephone, email }) => {
        return {
          '@type': 'ContactPoint',
          contactType,
          email,
          telephone,
        };
      },
    ),
    description: organizationSchema.description,
    image: organizationSchema.image,
    logo: organizationSchema.logo,
    name: organizationSchema.name,
    sameAs: organizationSchema.sameAs?.map(({ externalLink }) => {
      return externalLink;
    }),
    slogan: organizationSchema.slogan,
    url: organizationSchema.url,
  };
};

export default generate;
