import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import DefaultPageLayout from 'components/layouts/default-page-layout/default-page-layout';
import Error from 'components/templates/error/error';
import Page from 'components/templates/page/page';
import { isErrorAdapter } from 'integrations/content/amplience/error/error.adapter';
import useVisualizationSDK from 'integrations/content/amplience/hooks/use-visualization-sdk';
import { getSharedStaticProps } from 'integrations/content/amplience/page/page';
import { pageAdapter } from 'integrations/content/amplience/page/page.adapter';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import { populateTeaserListWithDynamicContent } from 'integrations/content/amplience/page/page-helper-functions';
import { FALLBACK_LOCALE } from 'libraries/getters/get-locale';
import { normalizeLocale } from 'libraries/getters/locale-config';

const IS_VISUALIZATION = true;

const VisualizedComponent = (props: any) => {
  const { data, hasError, isLoading, locale } = useVisualizationSDK();
  const [populatedData, setPopulatedData] = useState<PageAdapter | null>(null);

  useEffect(() => {
    const populateData = async () => {
      if (!data || isErrorAdapter(data)) {
        return;
      }

      const populated = await populateTeaserListWithDynamicContent(
        { ...props, ...data.content, isVisualization: IS_VISUALIZATION },
        locale ?? FALLBACK_LOCALE,
        IS_VISUALIZATION,
      );

      const cleanedData = pageAdapter(populated);

      setPopulatedData(cleanedData);
    };

    populateData();
  }, [data, locale, props]);

  if (isLoading || hasError || !data) return;
  if (isErrorAdapter(data)) {
    return <Error headline={data.message} />;
  }
  if (!populatedData) return null;

  return (
    <DefaultPageLayout {...populatedData} inIframe>
      <Page {...populatedData} />
    </DefaultPageLayout>
  );
};

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getSharedStaticProps(context, {
    forServerSide: true,
    localeOverride: normalizeLocale(context.query.locale?.toString()),
    slugOverride:
      normalizeLocale(context.query.locale?.toString()) || FALLBACK_LOCALE,
  });

export default VisualizedComponent;
