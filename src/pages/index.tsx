import type { GetServerSideProps, NextPage } from 'next';
import {
  FALLBACK_LOCALE,
  isSupportedLocale,
  normalizeLocale,
} from 'libraries/getters/locale-config';

const RootPage: NextPage = () => null;

const getLocaleHomepage = (locale: string) => {
  const basePath = process.env.NEXT_PUBLIC_AMPLIENCE_BASE_PATH;

  return `${basePath ? `/${basePath}` : ''}/${locale}`;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const localeFromCookie = normalizeLocale(req.cookies.NEXT_LOCALE);
  const locale = isSupportedLocale(localeFromCookie)
    ? localeFromCookie
    : FALLBACK_LOCALE;

  return {
    redirect: {
      destination: getLocaleHomepage(locale),
      permanent: false,
    },
  };
};

export default RootPage;
