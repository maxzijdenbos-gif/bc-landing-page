import type { GetServerSideProps, NextPage } from 'next';
import DefaultPageLayout from 'components/layouts/default-page-layout/default-page-layout';
import Error from 'components/templates/error/error';
import Page from 'components/templates/page/page';
import {
  ErrorAdapter,
  isErrorAdapter,
} from 'integrations/content/amplience/error/error.adapter';
import { getSharedStaticProps } from 'integrations/content/amplience/page/page';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import { getLocaleParam } from 'libraries/getters/get-page-route-params';
import {
  FALLBACK_LOCALE,
  isSupportedLocale,
  normalizeLocale,
} from 'libraries/getters/locale-config';

type SubPageProps = ErrorAdapter | PageAdapter;

const SubPage: NextPage<SubPageProps> = (props) => {
  if (isErrorAdapter(props)) {
    return <Error headline={props.message} />;
  }

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = normalizeLocale(getLocaleParam(context.params));

  if (!isSupportedLocale(locale)) {
    return {
      redirect: {
        destination: getFallbackLocaleHomepage(),
        permanent: false,
      },
    };
  }

  const sharedStaticProps = await getSharedStaticProps(context, {
    forServerSide: true,
    localeOverride: locale,
  });

  if ('notFound' in sharedStaticProps && sharedStaticProps.notFound) {
    return {
      notFound: true,
    };
  }

  const { props } = sharedStaticProps;

  if ('customError' in props && props.customError?.errorType === '404') {
    context.res.statusCode = 404;
  }

  return {
    props,
  };
};

export default SubPage;
