import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import Loader from 'components/atoms/loader/loader';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import Column from 'components/utilities/column/column';
import Row from 'components/utilities/row/row';
import { getHierarchyByKey } from 'integrations/content/amplience/endpoints/hierarchy-api/get-hierarchy';
import { createLocalContentItem } from 'integrations/content/amplience/endpoints/management/content-management';
import {
  LocaleRepositoryInfo,
  UpdatedContentItem,
} from 'integrations/content/amplience/endpoints/management/content-management.types';
import {
  getUrlLinkForContentItem,
  removeLocalizedSuffix,
} from 'integrations/content/amplience/endpoints/management/content-management-helper-functions';
import { AMPLIENCE_ACCESS_TOKEN_NAME } from 'integrations/content/amplience/types/amplience-setting-types';
import Tree, { TreeHierarchyData } from './tree/tree';
import styles from './localize-view.module.scss';

const REPOSITORY_HIERARCHY_QUERY_KEY = 'RepositoryHierarchy';
const CREATE_LOCALIZE_CONTENT_MUTATION_KEY = 'LocalizeContent-Create';

interface GlobalToLocalContentLocalizeViewProps {
  allowedSchemasAsChildren: Record<string, string[]>;
  contentItem: UpdatedContentItem | undefined;
  localeRepositoryInfo: LocaleRepositoryInfo;
  returnToOverView: () => void;
}

const GlobalToLocalContentLocalizeView = ({
  contentItem,
  localeRepositoryInfo,
  returnToOverView,
}: GlobalToLocalContentLocalizeViewProps) => {
  const { query } = useRouter();
  const { amplienceIDToken } = query as {
    [AMPLIENCE_ACCESS_TOKEN_NAME]?: string;
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isLoadingView, setIsLoadingView] = useState(false);

  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const { data, isLoading } = useQuery<TreeHierarchyData>({
    queryFn: () =>
      getHierarchyByKey(localeRepositoryInfo.locale, {
        stagingEnvironment: process.env.NEXT_PUBLIC_AMPLIENCE_STAGING_ENV,
      }),
    queryKey: [REPOSITORY_HIERARCHY_QUERY_KEY, localeRepositoryInfo.locale],
    retry: 0,
  });
  const {
    mutate: createLocalContent,
    isPending,
    error,
  } = useMutation({
    mutationFn: createLocalContentItem,
    mutationKey: [CREATE_LOCALIZE_CONTENT_MUTATION_KEY],
    onError: () => {
      dialogRef.current?.showModal();
    },
    onMutate: () => {
      setIsLoadingView(true);
    },
    onSettled: () => {
      setIsLoadingView(false);
    },
    onSuccess: (data) => {
      if (!data) return;

      // We want to redirect to the content item in the Amplience UI
      window.parent.location.href = getUrlLinkForContentItem(
        data.newContentItemId,
      );
    },
  });

  const pageTypeName = () => {
    const typeName =
      removeLocalizedSuffix(
        contentItem?.body?._meta?.schema?.split('/')?.pop(),
      ) ?? '';

    return typeName.split(/(?=[A-Z])/)?.join(' ');
  };

  return (
    <div className={styles.component}>
      {isLoading || isLoadingView ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <React.Fragment>
          <Row className={styles.teaserText}>
            <Column width={{ mobile: 5 }}>
              <Typography
                className={styles.title}
                tag="h3"
                tagStyle="headlineMedium"
                weight="bold"
              >
                Localization comment
              </Typography>
              <Typography tag="p" tagStyle="bodyMedium">
                {contentItem?.body?.localizedInfo?.localizationComment ??
                  'No comment provided.'}
              </Typography>
            </Column>
            <Column offset={{ mobile: 1 }} width={{ mobile: 6 }}>
              <Typography
                className={styles.title}
                tag="h3"
                tagStyle="headlineMedium"
                weight="bold"
              >
                Chosen page information
              </Typography>
              <div>
                <Typography tag="span" tagStyle="bodyMedium" weight="bold">
                  Page Name:{' '}
                </Typography>
                <Typography tag="span" tagStyle="bodyMedium">
                  {contentItem?.body._meta.name}
                </Typography>
              </div>
              <div>
                <Typography tag="span" tagStyle="bodyMedium" weight="bold">
                  Page Type:{' '}
                </Typography>
                <Typography tag="span" tagStyle="bodyMedium">
                  {pageTypeName()}
                </Typography>
              </div>
            </Column>
          </Row>
          <Typography
            className={styles.title}
            tag="h3"
            tagStyle="headlineLarge"
            weight="bold"
          >
            Where do you want to save the page?
          </Typography>
          <Typography className={styles.introText} tag="p">
            Choose where to put the content in the hierarchy.
          </Typography>

          {data?.content && (
            <Tree
              contentItemSchemaId={
                localeRepositoryInfo.isMultiLocale
                  ? (contentItem?.body._meta.schema ?? '')
                  : removeLocalizedSuffix(contentItem?.body._meta.schema)
              }
              data={data}
              parentId={parentId}
              setParentId={setParentId}
            />
          )}

          <Row classNameOuter={styles.buttonRow}>
            <Column className={styles.buttonColumn}>
              <Button onClick={returnToOverView} text="Cancel" variant="Text" />
              <Button
                disabled={!parentId || isPending}
                onClick={async () => {
                  const repositoryId = data?.content._meta.deliveryId;

                  if (!contentItem || !parentId || !repositoryId) return;

                  createLocalContent({
                    contentItem,
                    parentId,
                    repositoryId: localeRepositoryInfo.repositoryId,
                    token: amplienceIDToken,
                  });
                }}
                text="Proceed"
                variant="Primary"
              />
            </Column>
          </Row>
        </React.Fragment>
      )}

      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.dialogContent}>
          <div>
            <Typography
              className={styles.dialogHeader}
              tag="p"
              tagStyle="headlineLarge"
              weight="bold"
            >
              An error occurred
            </Typography>
            <Typography tag="p" tagStyle="bodyMedium">
              {error?.message?.split('Error: ')?.[1] ??
                'An error occurred. Please try again.'}
            </Typography>
          </div>
          <div className={styles.dialogButtons}>
            <Button
              onClick={() => {
                dialogRef.current?.close();
              }}
              text="Confirm"
            />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default GlobalToLocalContentLocalizeView;
