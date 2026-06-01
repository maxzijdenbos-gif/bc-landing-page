import { useQuery } from '@tanstack/react-query';
import { ContentItem } from 'dc-delivery-sdk-js';
import { DashboardExtension } from 'dc-extensions-sdk';
import { ContentItemReference } from 'dc-extensions-sdk/dist/types/lib/components/ContentReference';
import config from 'next.config';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Icon from 'components/atoms/icon/icon';
import Loader from 'components/atoms/loader/loader';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import HierarchyTree from 'components/templates/amplience/extensions/hierarchy-chooser/hierarchy-tree/hierarchy-tree';
import { getContentDeliveryIds } from 'integrations/content/amplience/endpoints/get-content/get-content-delivery-ids';
import { getGlobalContentItems } from 'integrations/content/amplience/endpoints/management/content-management';
import { getUserInfo } from 'integrations/content/amplience/endpoints/users/get-active-user-extension';
import UseContentFieldExtension from 'integrations/content/amplience/hooks/use-content-field-extension';
import { AMPLIENCE_ACCESS_TOKEN_NAME } from 'integrations/content/amplience/types/amplience-setting-types';
import InternalLinksContextProvider from 'libraries/contexts/internal-navigation-context';
import styles from './index.module.scss';

interface Form {
  _meta: {
    hierarchy?: {
      parentId?: string;
      root: boolean;
    };
    locale?: string;
  };
}

export type PayloadType = 'content-reference' | 'content-link';

interface FormParams {
  contentTypes: string[];
  maxItems: number;
  minItems: number;
  /**
   * Types: 'UUID' | 'tags' | 'website' | 'range-series'
   */
  nodeId: string | 'tags' | 'website' | 'range-series';
  type: PayloadType;
}

const fetchHierarchy = async (
  nodeId: FormParams['nodeId'],
  locale: string,
  stagingEnvironment?: string,
) => {
  const lowerCasedLocale = locale.toLowerCase();

  switch (nodeId) {
    case 'tags':
      return (
        await fetch(
          `${config.basePath}/api/amplience/hierarchy?deliveryKey=${lowerCasedLocale}-${nodeId}&locale=${locale}&stagingEnvironment=${stagingEnvironment}`,
        )
      ).json();

    case 'website':
      return (
        await fetch(
          `${config.basePath}/api/amplience/hierarchy?deliveryKey=${lowerCasedLocale}&locale=${locale}&stagingEnvironment=${stagingEnvironment}`,
        )
      ).json();

    case 'range-series':
      return (
        await fetch(
          `${config.basePath}/api/amplience/hierarchy?deliveryKey=${nodeId}&locale=${locale}&stagingEnvironment=${stagingEnvironment}`,
        )
      ).json();

    default:
      return (
        await fetch(
          `${config.basePath}/api/amplience/hierarchy?deliveryId=${nodeId}&locale=${locale}&stagingEnvironment=${stagingEnvironment}`,
        )
      ).json();
  }
};

export interface InternalLinkSettings {
  reference: ContentItemReference & { locale?: string };
  text: string;
}

const HierarchyChooserTemplate = () => {
  const [internalLinks, setInternalLinks] = useState<InternalLinkSettings[]>(
    [],
  );

  const [chosenLocale, setChosenLocale] = useState<string>('');

  const [showInternalLinksOverview, setShowInternalLinksOverview] =
    useState<boolean>(true);

  const extensionSdk = UseContentFieldExtension<Form>({}); // Will fail if not saved.

  const { field, frame, contentItem, params, stagingEnvironment } =
    extensionSdk;

  const {
    contentTypes,
    maxItems,
    nodeId,
    type: payloadType,
  } = (params?.instance as FormParams) ?? {};

  const { data: activeContentItem, isLoading: isLoadingActiveContentItem } =
    // fixing query key issue breaks the extension
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    useQuery({
      enabled: !!contentItem?.getCurrent,
      queryFn: async () => await contentItem?.getCurrent(),
      queryKey: ['contentItem'],
      retry: false,
    });

  const { data: fieldValue } =
    // fixing query key issue breaks the extension
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    useQuery({
      enabled: !!field,
      queryFn: async () => {
        return (await field?.getValue()) as Promise<ContentItemReference[]>;
      },
      queryKey: ['fieldValue'],
    });

  const effectiveLocale =
    activeContentItem?.locale ||
    internalLinks?.[0]?.reference?.locale ||
    chosenLocale ||
    '';

  const { data: hierarchyData, isLoading: isLoadingHierarchyData } =
    // fixing query key issue breaks the extension
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    useQuery({
      enabled: !!effectiveLocale,
      queryFn: async () =>
        await fetchHierarchy(nodeId, effectiveLocale, stagingEnvironment),
      queryKey: ['hierarchy', effectiveLocale],
    });

  const { data: initialInternalLinks, isLoading: isLoadingInitialData } =
    // fixing query key issue breaks the extension
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    useQuery({
      enabled: !!fieldValue,
      queryFn: async () => {
        const internalLinkRef = fieldValue ?? [];
        const finalPayload = internalLinkRef.map((item) => {
          return { reference: item, text: '' };
        });
        const ids = finalPayload.map((item) => item.reference.id);

        return await getContentDeliveryIds<{ content: ContentItem['body'] }[]>({
          ids,
          locale: effectiveLocale,
          stagingEnvironment,
        });
      },
      queryKey: ['initialInternalRefs'],
    });

  const { query } = useRouter();
  const { amplienceIDToken } = query as {
    [AMPLIENCE_ACCESS_TOKEN_NAME]?: string;
  };

  const { data: localeOptionsData, isLoading: isLoadingLocaleOptions } =
    // fixing query key issue breaks the extension
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    useQuery({
      enabled: !effectiveLocale && !!extensionSdk?.hub?.id,
      queryFn: async () => {
        if (!extensionSdk?.hub?.id) return [];

        const userInfo = await getUserInfo({
          extensionSdk: extensionSdk as unknown as DashboardExtension,
        });

        if (!userInfo) return [];

        const globalContentItems = await getGlobalContentItems(
          { ...userInfo, hubId: extensionSdk?.hub?.id || '' },
          amplienceIDToken,
        );
        const locales = globalContentItems.mappedRepositories.map(
          ({ value: { locale } }: { value: { locale: string } }) => locale,
        );
        return [...new Set(locales)] as string[];
      },
      queryKey: ['hierarchy', effectiveLocale, !!extensionSdk],
    });

  useEffect(() => {
    if (
      initialInternalLinks &&
      initialInternalLinks?.length > 0 &&
      fieldValue
    ) {
      const finalPayload: InternalLinkSettings[] = fieldValue.map((item) => {
        return { reference: item, text: '' };
      });

      initialInternalLinks.forEach((item) => {
        const found = finalPayload.find((payload) => {
          return payload.reference.id === item?.content?._meta.deliveryId;
        });

        if (found) {
          found.text = item?.content?._meta.name ?? 'no name';
        }
      });

      setInternalLinks(finalPayload);
    }
  }, [field, fieldValue, initialInternalLinks]);

  const heightRef = useRef<HTMLDivElement>(null);

  if (heightRef.current && frame) {
    setTimeout(() => {
      const componentHeight = heightRef.current?.clientHeight;

      frame?.setHeight(componentHeight);
    }, 1);
  }

  if (
    isLoadingHierarchyData ||
    isLoadingActiveContentItem ||
    isLoadingInitialData ||
    isLoadingLocaleOptions
  ) {
    return (
      <div ref={heightRef} className={styles.loader}>
        <Loader />
      </div>
    );
  }

  if (!effectiveLocale) {
    return (
      <Typography ref={heightRef} tag="p" tagStyle="actionLarge">
        No locale defined on the Content Item. You need to select one before you
        can choose a link
        {!!localeOptionsData && (
          <select
            className={styles.localeChooser}
            onChange={(e) => {
              setChosenLocale(e.currentTarget.value);
              setShowInternalLinksOverview(false);
            }}
            defaultValue=""
          >
            <option disabled value="">
              {' '}
              -- select an option --{' '}
            </option>
            {localeOptionsData.map((locale) => (
              <option key={locale} value={locale}>
                {locale}
              </option>
            ))}
          </select>
        )}
      </Typography>
    );
  }

  if (showInternalLinksOverview) {
    return (
      <div ref={heightRef} className={styles.component}>
        {internalLinks &&
          internalLinks.length > 0 &&
          (internalLinks as InternalLinkSettings[]).map((link, index) => {
            const isPublishedNode =
              hierarchyData?.internalLinks?.[link.reference.id];

            return (
              <div
                key={`${link.reference.id}_${index}`}
                className={styles.buttonWrapper}
              >
                <Button
                  key={link.reference.id}
                  onClick={() => {
                    const filteredLinks = (
                      internalLinks as InternalLinkSettings[]
                    )
                      .filter((item) => item.reference.id !== link.reference.id)
                      .map((link) => ({ ...link, locale: effectiveLocale }));

                    setInternalLinks(filteredLinks);
                    field?.setValue(filteredLinks);
                  }}
                  rightIcon="Minus_16"
                  text={link.text}
                  variant="Tertiary"
                />
                {!isPublishedNode && (
                  <Typography
                    className={styles.publishedStatus}
                    tagStyle="bodySmall"
                  >
                    <Icon name="Close_16" hidden />
                    Not published
                  </Typography>
                )}
              </div>
            );
          })}
        {internalLinks.length < maxItems && (
          <Button
            onClick={() => {
              frame?.setHeight(550);
              setShowInternalLinksOverview(false);
            }}
            rightIcon="Plus_16"
            variant="Secondary"
          />
        )}
      </div>
    );
  }

  if (!showInternalLinksOverview) {
    return (
      <div ref={heightRef} className={styles.component}>
        {hierarchyData?.hierarchy && (
          <InternalLinksContextProvider
            internalLinks={hierarchyData?.internalLinks}
          >
            <HierarchyTree
              contentTypes={contentTypes}
              data={hierarchyData.hierarchy}
              maxItems={maxItems}
              payloadType={payloadType}
              selectedItems={internalLinks}
              setSelectedItem={async (item) => {
                setInternalLinks(item);
                setShowInternalLinksOverview(true);

                const mappedItems = item.map((item) => {
                  return { ...item.reference, locale: effectiveLocale };
                });

                await field?.setValue(mappedItems);
              }}
            />
          </InternalLinksContextProvider>
        )}
      </div>
    );
  }
};

HierarchyChooserTemplate.displayName = 'HierarchyChooserTemplate';

export default HierarchyChooserTemplate;
