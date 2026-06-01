import { useMutation } from '@tanstack/react-query';
import { ContentItem } from 'dc-management-sdk-js';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import React from 'react';
import Typography from 'components/atoms/typography/typography';
import Accordion from 'components/molecules/accordion/accordion';
import Button from 'components/molecules/button/button';
import { updateContentItem } from 'integrations/content/amplience/endpoints/management/content-management';
import {
  GetGlobalContentItemsResponse,
  LocaleRepositoryInfo,
} from 'integrations/content/amplience/endpoints/management/content-management.types';
import { AMPLIENCE_ACCESS_TOKEN_NAME } from 'integrations/content/amplience/types/amplience-setting-types';
import LocalizeContentItems from './localize-content-items/localize-content-items';
import styles from './overview.module.scss';

const CONTENT_ITEM_UPDATE_MUTATION_KEY = 'content-item-status';

export interface GlobalToLocalContentOverviewProps {
  contentItems?: GetGlobalContentItemsResponse;
  localeRepositoryInfo: LocaleRepositoryInfo;
  openLocalizeView: (contentItem: ContentItem) => void;
  resetQuery: () => void;
  setIsLoadingOverview: (value: boolean) => void;
  setLocaleRepositoryInfo: (repositoryInfo: LocaleRepositoryInfo) => void;
}

const GlobalToLocalContentOverview = ({
  contentItems,
  openLocalizeView,
  localeRepositoryInfo,
  setLocaleRepositoryInfo,
  resetQuery,
  setIsLoadingOverview,
}: GlobalToLocalContentOverviewProps) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const [activeAccordion, setActiveAccordion] = useState('accordion-item-1');
  const [selectedContentItemToHide, setSelectedContentItemToHide] = useState<
    ContentItem | undefined
  >(undefined);

  const { query } = useRouter();
  const { amplienceIDToken } = query as {
    [AMPLIENCE_ACCESS_TOKEN_NAME]?: string;
  };

  const { mutate: changeContentItemStatus } = useMutation({
    mutationFn: updateContentItem,
    mutationKey: [CONTENT_ITEM_UPDATE_MUTATION_KEY],
    onMutate: () => {
      setIsLoadingOverview(true);
    },
    onSettled: () => {
      setIsLoadingOverview(false);
    },
    onSuccess: () => {
      resetQuery();
    },
  });

  const filteredContentItems = useMemo(() => {
    const none =
      contentItems?.contentItems.filter(
        (item) =>
          item.body.localizedInfo?.localizationStatus?.[
            localeRepositoryInfo.locale
          ] === 'none',
      ) ?? [];

    const ignored =
      contentItems?.contentItems.filter(
        (item) =>
          item.body.localizedInfo?.localizationStatus?.[
            localeRepositoryInfo.locale
          ] === 'ignored',
      ) ?? [];

    const localized =
      contentItems?.contentItems.filter(
        (item) =>
          item.body.localizedInfo?.localizationStatus?.[
            localeRepositoryInfo.locale
          ] === 'localized',
      ) ?? [];

    return { ignored, localized, none };
  }, [contentItems?.contentItems, localeRepositoryInfo.locale]);

  return (
    <div className={styles.component}>
      <div>
        <label htmlFor="countries">Selected repository: </label>
        <select
          className={styles.select}
          id="countries"
          name="country"
          onChange={(event) => {
            if (contentItems?.mappedRepositories.length === 0) return;

            const value = event.currentTarget.value;
            const findMappedRepository = contentItems?.mappedRepositories.find(
              (item) => item.value.repositoryId === value,
            );

            if (!findMappedRepository) return;

            setLocaleRepositoryInfo(findMappedRepository.value);
          }}
          value={localeRepositoryInfo.repositoryId}
        >
          {contentItems?.mappedRepositories.map(({ text, value }, index) => (
            <option
              key={`${value.repositoryId}${text}${index}`}
              value={value.repositoryId}
            >
              {text}
            </option>
          ))}
        </select>
      </div>

      <Accordion>
        <Accordion.AccordionItem
          id="accordion-item-1"
          isActive={activeAccordion === 'accordion-item-1'}
          onToggle={() => {
            setActiveAccordion('accordion-item-1');
          }}
          title="Ready for Localization"
        >
          {filteredContentItems.none.length === 0 && (
            <Typography className={styles.noContent} tag="p">
              You&apos;re up to date. Nothing new to localize.
            </Typography>
          )}
          <LocalizeContentItems
            buttonText="Localize"
            contentItems={filteredContentItems.none}
            openLocalizeView={openLocalizeView}
            toggleButton={{
              onClick: (value) => {
                setSelectedContentItemToHide(value);
                dialogRef.current?.showModal();
              },
              text: 'Hide',
            }}
          />
        </Accordion.AccordionItem>

        <Accordion.AccordionItem
          id="accordion-item-2"
          isActive={activeAccordion === 'accordion-item-2'}
          onToggle={() => {
            setActiveAccordion('accordion-item-2');
          }}
          title="Ignored"
        >
          {filteredContentItems.ignored.length === 0 && (
            <Typography className={styles.noContent} tag="p">
              Ignored pages can be found here once you ignore them.
            </Typography>
          )}
          <LocalizeContentItems
            buttonText="Localize"
            contentItems={filteredContentItems.ignored}
            openLocalizeView={openLocalizeView}
            toggleButton={{
              onClick: (value) =>
                changeContentItemStatus({
                  contentItem: value,
                  locale: localeRepositoryInfo.locale,
                  localizationStatus: 'none',
                  token: amplienceIDToken,
                }),
              text: 'Unhide',
            }}
          />
        </Accordion.AccordionItem>

        <Accordion.AccordionItem
          id="accordion-item-3"
          isActive={activeAccordion === 'accordion-item-3'}
          onToggle={() => {
            setActiveAccordion('accordion-item-3');
          }}
          title="Localized"
        >
          {filteredContentItems.localized.length === 0 && (
            <Typography className={styles.noContent} tag="p">
              Localized pages can be found here once you localized them.
            </Typography>
          )}
          <LocalizeContentItems
            buttonText="Localize again"
            contentItems={filteredContentItems.localized}
            openLocalizeView={openLocalizeView}
          />
        </Accordion.AccordionItem>
      </Accordion>

      {/* Dialog for hiding item */}
      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.dialogContent}>
          <div>
            <Typography
              className={styles.dialogHeader}
              tag="p"
              tagStyle="headlineLarge"
              weight="bold"
            >
              Please confirm that you want to hide this page.
            </Typography>
            <Typography tag="p" tagStyle="bodyMedium">
              The page will be moved to the Ignored section.
            </Typography>
          </div>
          <div className={styles.dialogButtons}>
            <Button
              onClick={() => {
                if (!selectedContentItemToHide) return;

                changeContentItemStatus({
                  contentItem: selectedContentItemToHide,
                  locale: localeRepositoryInfo.locale,
                  localizationStatus: 'ignored',
                  token: amplienceIDToken,
                });
                dialogRef.current?.close();
              }}
              text="Confirm"
            />
            <Button
              onClick={() => {
                setSelectedContentItemToHide(undefined);
                dialogRef.current?.close();
              }}
              text="Cancel"
              variant="Secondary"
            />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default GlobalToLocalContentOverview;
