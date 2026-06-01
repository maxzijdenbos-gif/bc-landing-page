import type { GetServerSidePropsContext, NextPage } from 'next';
import DefaultPageLayout from 'components/layouts/default-page-layout/default-page-layout';
import Page from 'components/templates/page/page';
import { getSharedStaticProps } from 'integrations/content/amplience/page/page';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import { getLocaleParam } from 'libraries/getters/get-page-route-params';
import {
  FALLBACK_LOCALE,
  isSupportedLocale,
  normalizeLocale,
} from 'libraries/getters/locale-config';

type PagePageProps = PageAdapter;

const PagePage: NextPage<PagePageProps> = (props) => {
  return (
    <DefaultPageLayout {...props}>
      <Page {...props} />
    </DefaultPageLayout>
  );
};

const getFallbackLocaleHomepage = () => {
  const basePath = process.env.NEXT_PUBLIC_AMPLIENCE_BASE_PATH;

  return `${basePath ? `/${basePath}` : ''}/${FALLBACK_LOCALE}`;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = normalizeLocale(getLocaleParam(context.params));

  if (!isSupportedLocale(locale)) {
    return {
      redirect: {
        destination: getFallbackLocaleHomepage(),
        permanent: false,
      },
    };
  }

  return getSharedStaticProps(context, {
    forServerSide: true,
    localeOverride: locale,
    slugOverride: locale,
  });
};

export default PagePage;
