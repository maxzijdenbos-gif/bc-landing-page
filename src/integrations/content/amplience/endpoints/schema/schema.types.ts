import { AmplienceImagePayload, ContentMeta } from '../../types/content-types';

export interface OrganizationSchemaPayload {
  _meta?: ContentMeta;
  addressCountry: string;
  addressLocality: string;
  addressRegion: string;
  contactPoints: [
    {
      contactType: string;
      email: string;
      telephone: string;
    },
  ];
  description: string;
  imageObject: AmplienceImagePayload;
  logo: AmplienceImagePayload;
  mainEntityOfPage: BaseLink[];
  name: string;
  postalCode: string;
  sameAs: { externalLink: string }[];
  slogan: string;
  streetAddress: string;
}

export interface OrganizationSchemaProps extends Omit<
  OrganizationSchemaPayload,
  'imageObject' | 'logo'
> {
  image?: string;
  logo?: string;
  url?: string;
}

export interface PageSchemasProps {
  organizationSchema: OrganizationSchemaProps | null;
}
