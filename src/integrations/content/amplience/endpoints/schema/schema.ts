import { getContentDeliveryKey } from '../get-content/get-content-delivery-key';
import { organizationSchemaAdapter, schemaAdapter } from './schema.adapter';
import { OrganizationSchemaPayload } from './schema.types';

const localeOrganizationSchemaDeliveryKey = (locale: Locale) => {
  return `${locale}-organization-schema`;
};

const getOrganizationSchema = async ({
  locale,
  stagingEnv,
}: {
  locale: string;
  stagingEnv?: string;
}) => {
  if (!process.env.NEXT_PUBLIC_DOMAIN_NAME)
    throw new Error(
      'Missing Next public domain name. Please set NEXT_PUBLIC_DOMAIN_NAME in your environment variables',
    );

  try {
    const organizationSchemaNode =
      await getContentDeliveryKey<OrganizationSchemaPayload>({
        locale,
        slug: localeOrganizationSchemaDeliveryKey(locale),
        stagingEnvironment: stagingEnv,
      });

    return organizationSchemaAdapter(locale, organizationSchemaNode);
  } catch (error) {
    return null;
  }
};

export const fetchPageSchemas = async (locale: Locale, stagingEnv?: string) => {
  const organizationSchema = await getOrganizationSchema({
    locale,
    stagingEnv,
  });

  return schemaAdapter({ organizationSchema });
};
