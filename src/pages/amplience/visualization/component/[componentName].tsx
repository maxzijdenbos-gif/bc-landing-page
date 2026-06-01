import { merge } from 'lodash';
import { useParams } from 'next/dist/client/components/navigation';
import { useRouter } from 'next/router';
import { I18nProvider } from 'next-localization';
import { useEffect, useState } from 'react';
import ModuleModalContent from 'components/molecules/module-modal/module-modal-content/module-modal-content';
import {
  ContentModule,
  ContentModuleName,
  ContentModuleProps,
  getModuleComponent,
  isContentModule,
} from 'components/utilities/content-modules/content-modules';
import { MODAL_MODULE_NAME } from 'components/utilities/content-modules/content-modules.constants';
import ModuleWrapper from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import { getDictionary } from 'integrations/content/amplience/endpoints/dictionary/dictionary';
import { DictionaryProps } from 'integrations/content/amplience/endpoints/dictionary/dictionary.types';
import { isErrorAdapter } from 'integrations/content/amplience/error/error.adapter';
import useVisualizationSDK from 'integrations/content/amplience/hooks/use-visualization-sdk';
import { pageAdapter } from 'integrations/content/amplience/page/page.adapter';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import { populateTeaserListWithDynamicContent } from 'integrations/content/amplience/page/page-helper-functions';
import { ContentPageResponse } from 'integrations/content/amplience/types/content-types';
import { CookieConsentContextProvider } from 'libraries/contexts/cookie-consent-context';
import { FALLBACK_LOCALE } from 'libraries/getters/get-locale';
import withIframeRestriction from 'libraries/hocs/with-iframe-restriction';

const IS_VISUALIZATION = true;
const CONTENT_TEASER_COMPONENT_NAME = 'TeaserListContent';

const VisualizedComponent = () => {
  const params = useParams();
  const name = params?.componentName;
  const { data, hasError, isLoading, locale } = useVisualizationSDK();

  const [dictionary, setDictionary] = useState<DictionaryProps>();
  const [populatedData, setPopulatedData] = useState<PageAdapter | null>(null);

  const {
    query: { visualizationColor },
  } = useRouter();

  useEffect(() => {
    if (locale) {
      const getTheDictionary = async () => {
        await getDictionary(
          String(locale).toLowerCase() ?? FALLBACK_LOCALE,
          process.env.NEXT_PUBLIC_AMPLIENCE_VISUALISATION_DOMAIN ?? '',
        ).then((res) => {
          setDictionary(res);
        });
      };

      getTheDictionary();
    }

    const populateData = async () => {
      if (!data || isErrorAdapter(data)) return;

      const contentPage: ContentPageResponse = {
        _meta: data._meta,
        modules: [{ ...data.content }],
      };

      try {
        const populated = await populateTeaserListWithDynamicContent(
          contentPage,
          locale ?? FALLBACK_LOCALE,
          IS_VISUALIZATION,
        );

        setPopulatedData(pageAdapter(populated));
      } catch (err) {
        console.error('Error populating teaser list:', err);
      }
    };

    if (name === CONTENT_TEASER_COMPONENT_NAME) populateData();
  }, [data, locale, name]);

  if (isLoading || hasError || !data || !name) return;
  if (!isContentModule({ data, name } as ContentModule)) return;

  const contentData =
    name === CONTENT_TEASER_COMPONENT_NAME
      ? populatedData?.modules[0].data
      : data?.content;

  const moduleComponent = getModuleComponent(
    name as ContentModuleName,
    contentData as ContentModuleProps,
  );

  const color =
    moduleComponent.props?.color ||
    (visualizationColor?.toString() as NavigationVariants);

  if (name === MODAL_MODULE_NAME)
    return (
      <ModuleWrapper color={color as BackgroundColor}>
        <div style={{ padding: '4rem' }}>
          <ModuleModalContent modalIsVisible {...moduleComponent.props} />
        </div>
      </ModuleWrapper>
    );

  return (
    <I18nProvider
      lngDict={
        dictionary
          ? merge(dictionary?.default, dictionary.localizedDictionary ?? {})
          : {}
      }
      locale={locale ?? FALLBACK_LOCALE}
    >
      <CookieConsentContextProvider acceptAll>
        <moduleComponent.component
          {...moduleComponent.props}
          color={moduleComponent.props?.color || (color as BackgroundColor)}
        />
      </CookieConsentContextProvider>
    </I18nProvider>
  );
};

export default withIframeRestriction(VisualizedComponent);
