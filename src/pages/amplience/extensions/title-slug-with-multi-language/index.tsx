import { isEqual } from 'lodash';
import { useRef, useState } from 'react';
import React from 'react';
import slugify from 'slugify';
import Typography from 'components/atoms/typography/typography';
import { getContentClient } from 'integrations/content/amplience/endpoints/get-content/get-content-client';
import UseContentFieldExtension from 'integrations/content/amplience/hooks/use-content-field-extension';
import { FALLBACK_LOCALE } from 'libraries/getters/get-locale';
import withIframeRestriction from 'libraries/hocs/with-iframe-restriction';

type DeliveryKeysType = { values: Record<'value', Locale>[] };
interface LocalizedValues {
  values: { locale: Locale; value: string }[];
}

interface TitleSlugForm {
  _meta: {
    deliveryKeys: DeliveryKeysType;
    hierarchy?: {
      parentId?: string;
      root: boolean;
    };
    locale?: string;
  };
}

const slugName = (title: string, locale: Locale) => {
  return slugify(title, {
    locale: locale.split('-')[0],
    lower: true,
    strict: true,
  });
};

const TitleSlug = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [slug, setSlug] = useState<Record<'value', Locale>[]>([]);
  const parentSlug = useRef<Record<'value', Locale>[] | string>([]);
  const originalSlug = useRef<Record<'value', string>[] | string | undefined>(
    undefined,
  );

  const { isLoading, hasError: hasExtensionError } =
    UseContentFieldExtension<TitleSlugForm>({
      onFormChange: async (form, { field, stagingEnvironment }) => {
        const usableTitle =
          (form?.pageNavigation.urlName as string | LocalizedValues) ||
          (form?._meta.name as string | LocalizedValues);

        if (!originalSlug.current) {
          originalSlug.current =
            form._meta.deliveryKeys?.values ?? form._meta.deliveryKey;
        }

        // If content is not part of a hierarchy, to proceed
        if (!form?._meta?.hierarchy?.parentId) return;

        // Form dependency validation
        if (!form?._meta?.name)
          return setErrorMessage('Please save page to generate slug');
        if (!usableTitle)
          return setErrorMessage('Please add title to generate slug');

        const locale = form?._meta?.locale?.toLowerCase() || FALLBACK_LOCALE;

        // Get parent slug if necessary
        if (!parentSlug.current?.length) {
          const parentNode = await getContentClient({
            locale,
            stagingEnvironment,
          }).getContentItemById(form._meta.hierarchy.parentId);

          const parentBody = parentNode?.body._meta;

          if (!parentBody?.deliveryKeys?.values && !parentBody?.deliveryKey)
            return setErrorMessage('Please save the parent page to continue');

          if (parentBody?.deliveryKeys?.values) {
            parentSlug.current = parentBody.deliveryKeys?.values.map((item) => {
              return { locale: item.value.split('/')[0], value: item.value };
            });
          } else {
            parentSlug.current = parentBody.deliveryKey ?? '';
          }
        }

        // Prefix parent slug to current slug if there is a parent
        // We assume that there always is a parent
        /**
         * 1. We made sure to check if we are in a hierarchy
         * 2. The home node does not use this extension
         */
        let fullSlug: { value: string }[] | undefined;

        if (typeof parentSlug.current === 'string') {
          const nodeSlug = slugName(usableTitle as string, locale);
          const newSlugValue = `${parentSlug.current}/${nodeSlug}`;

          fullSlug = [{ value: newSlugValue }];
        } else if (parentSlug.current) {
          let presentLocales = [];

          // In case of multiple deliveryKeys
          if (
            typeof usableTitle === 'object' &&
            Array.isArray(parentSlug.current)
          ) {
            presentLocales = usableTitle.values.filter((item) => {
              return (parentSlug.current as LocalizedValues['values']).some(
                (slug) => {
                  return (
                    String(slug.locale).toLowerCase() ===
                    String(item.locale).toLowerCase()
                  );
                },
              );
            });
          } else {
            // Backwards compatibility
            // This is the case that it has multiple delivery Keys but only one value
            presentLocales = [{ locale, value: usableTitle as string }];
          }

          fullSlug = presentLocales.map((item, index) => {
            const nodeSlug = slugName(item.value, locale);

            return {
              value: `${
                (parentSlug.current as LocalizedValues['values'])[index].value
              }/${nodeSlug}`,
            };
          });
        }

        if (!fullSlug) return;

        // Set the internal display slug
        if (slug?.[0]?.value !== fullSlug?.[0]?.value) {
          setSlug(fullSlug);
        }

        const isValueUpdated = () => {
          if (Array.isArray(originalSlug.current)) {
            return (
              !isEqual(originalSlug.current, fullSlug) &&
              !isEqual(form?._meta?.deliveryKeys?.values, fullSlug)
            );
          }

          return (
            originalSlug.current !== fullSlug[0].value &&
            form?._meta?.deliveryKeys?.values[0].value !== fullSlug?.[0]?.value
          );
        };

        //   Only save if there is a change & not the original value
        if (isValueUpdated()) {
          field.setValue(fullSlug);
        }

        // Reset errors
        setErrorMessage('');
      },
    });

  if (isLoading) return <Typography>Loading</Typography>;
  if (hasExtensionError || errorMessage)
    return (
      <Typography style={{ color: 'var(--context-alert)' }} weight="bold">
        {hasExtensionError ? 'Something went wrong' : errorMessage}
      </Typography>
    );

  return (
    <React.Fragment>
      <b>Page URL(s): </b>
      {slug.map((item) => (
        <React.Fragment key={item.value}>
          <p>{item.value}</p>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default withIframeRestriction(TitleSlug);
