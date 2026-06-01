import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DashboardExtension } from 'dc-extensions-sdk';
import { ContentItem } from 'dc-management-sdk-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from 'components/atoms/loader/loader';
import Typography from 'components/atoms/typography/typography';
import Container from 'components/utilities/container/container';
import {
  getAllowedSchemasAsChildren,
  getGlobalContentItems,
} from 'integrations/content/amplience/endpoints/management/content-management';
import {
  GetGlobalContentItemsResponse,
  LocaleRepositoryInfo,
} from 'integrations/content/amplience/endpoints/management/content-management.types';
import { getUserInfo } from 'integrations/content/amplience/endpoints/users/get-active-user-extension';
import { UserState } from 'integrations/content/amplience/endpoints/users/get-active-user-extension.types';
import useExtensionSdk from 'integrations/content/amplience/hooks/use-extension-sdk';
import { AMPLIENCE_ACCESS_TOKEN_NAME } from 'integrations/content/amplience/types/amplience-setting-types';
import GlobalToLocalContentLocalizeView from './localize-view/localize-view';
import GlobalToLocalContentOverview from './overview/overview';
import styles from './index.module.scss';

export const GLOBAL_CONTENT_QUERY_KEY = 'GlobalContentElements';

export const ALLOWED_SCHEMAS_QUERY_KEY = 'AllowedSchemasAsChildren';

const GlobalToLocalContentTemplate = () => {
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);
  const [user, setUser] = useState<UserState | undefined | null>(null);
  const [localeRepositoryInfo, setLocaleRepositoryInfo] = useState<
    LocaleRepositoryInfo | undefined
  >(undefined);
  const [contentItem, setContentItem] = useState<ContentItem | undefined>(
    undefined,
  );
  const [isLoadingOverView, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { query } = useRouter();
  const { amplienceIDToken } = query as {
    [AMPLIENCE_ACCESS_TOKEN_NAME]?: string;
  };

  const {
    data: contentItemsSettings,
    isLoading: isLoadingContentItems,
    isError,
  } =
    // fixing query key issue breaks the extension
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    useQuery<GetGlobalContentItemsResponse>({
      enabled: !!user && !!amplienceIDToken, // Only fetch data if the we have retrieved the user
      queryFn: () => getGlobalContentItems(user, amplienceIDToken),

      queryKey: [GLOBAL_CONTENT_QUERY_KEY],
      retry: 0,
    });

  const { data: allowedSchemasAsChildren } =
    // fixing query key issue breaks the extension
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    useQuery<Record<string, string[]>>({
      enabled: !!user && !!amplienceIDToken, // Only fetch data if the we have retrieved the user
      queryFn: () =>
        getAllowedSchemasAsChildren({ amplienceIDToken, hubId: user?.hubId }),
      queryKey: [ALLOWED_SCHEMAS_QUERY_KEY],
      retry: 0,
    });

  const { extensionSdk } = useExtensionSdk<DashboardExtension>();

  useEffect(() => {
    const handleUserInfo = async () => {
      if (!extensionSdk) return;

      const userInfo = await getUserInfo({ extensionSdk });

      if (userInfo) {
        setUser({ ...userInfo, hubId: extensionSdk.hub.id });
      } else {
        setUser(undefined);
      }
    };

    handleUserInfo();
  }, [extensionSdk]);

  useEffect(() => {
    if (localeRepositoryInfo?.locale) return;

    queueMicrotask(() =>
      setLocaleRepositoryInfo(
        contentItemsSettings?.mappedRepositories[0].value,
      ),
    );
  }, [contentItemsSettings, localeRepositoryInfo]);

  if (isLoadingContentItems || user === null || isLoadingOverView) {
    return (
      <Container className={styles.component}>
        <Typography className={styles.title} tag="h2" tagStyle="displaySmall">
          Global Content Localization
        </Typography>

        <div className={styles.loader}>
          <Loader />
        </div>
      </Container>
    );
  }

  if (user === undefined || user.teams.length === 0 || isError) {
    return (
      <Container className={styles.component}>
        <Typography className={styles.title} tag="h2" tagStyle="displaySmall">
          Global Content Localization
        </Typography>

        <Typography className={styles.title} tag="p" tagStyle="bodyLarge">
          It was not possible to determine your role. Contact your administrator
          if you believe you should have access.
        </Typography>
      </Container>
    );
  }

  return (
    <Container className={styles.component}>
      <div>
        <Typography className={styles.title} tag="h2" tagStyle="displaySmall">
          Global Content Localization
        </Typography>

        {isOverviewVisible && localeRepositoryInfo && (
          <GlobalToLocalContentOverview
            contentItems={contentItemsSettings}
            localeRepositoryInfo={localeRepositoryInfo}
            openLocalizeView={(contentItem) => {
              setIsOverviewVisible(false);
              setContentItem(contentItem);
            }}
            resetQuery={() => {
              queryClient.resetQueries({
                queryKey: [GLOBAL_CONTENT_QUERY_KEY],
              });
            }}
            setIsLoadingOverview={setIsLoading}
            setLocaleRepositoryInfo={setLocaleRepositoryInfo}
          />
        )}
        {!isOverviewVisible &&
          localeRepositoryInfo &&
          allowedSchemasAsChildren && (
            <GlobalToLocalContentLocalizeView
              allowedSchemasAsChildren={allowedSchemasAsChildren}
              contentItem={contentItem}
              localeRepositoryInfo={localeRepositoryInfo}
              returnToOverView={() => {
                setIsOverviewVisible(!isOverviewVisible);
                setContentItem(undefined);
                queryClient.resetQueries({
                  queryKey: [GLOBAL_CONTENT_QUERY_KEY],
                });
              }}
            />
          )}
      </div>
    </Container>
  );
};

export default GlobalToLocalContentTemplate;
