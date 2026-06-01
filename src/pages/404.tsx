import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import DefaultPageLayout from 'components/layouts/default-page-layout/default-page-layout';
import { MainNavigationProps } from 'components/organisms/main-navigation/main-navigation';
import Error from 'components/templates/error/error';
import { SkipToMainContentProps } from 'components/utilities/skip-to-main-content/skip-to-main-content';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import { trackCustomError } from 'integrations/tracking/google-tag-manager/scripts';

interface Error404PageProps extends PageAdapter {
  mainNavigation: MainNavigationProps & SkipToMainContentProps;
  message: string;
}

export const fallbackErrorPageProps: Error404PageProps = {
  mainNavigation: {
    homeLink: { externalLink: '/', linkText: 'Home' },
    mainContentId: 'main-content',
    skipLinkText: 'Skip to main content',
    topLevelDeliveryId:
      process.env.NEXT_PUBLIC_AMPLIENCE_NAVIGATION_DELIVERY_KEY ?? '',
  },
  message: 'Page not found',
  modules: [],
  pageColor: 'primary',
  topModules: [],
  videoSchemas: null,
};

const Error404Page: NextPage<Error404PageProps> = (props) => {
  const didReport = useRef(false);

  useEffect(() => {
    if (!didReport.current) {
      didReport.current = true;
      trackCustomError({
        errorMessage: props.message,
        errorType: '404',
      });
    }
  }, [props]);

  return (
    <DefaultPageLayout {...props}>
      <Error headline={props.message} />
    </DefaultPageLayout>
  );
};

export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: process.env.REVALIDATE_TIME
      ? parseInt(process.env.REVALIDATE_TIME, 10)
      : 600,
  };
};

export default Error404Page;
