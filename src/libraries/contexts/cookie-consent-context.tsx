import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

export type CookieInformationAPIProps = {
  getConsentGivenFor: (cookieName: string) => boolean;
};

const CONSENT_CATEGORIES = [
  'functional',
  'marketing',
  'necessary',
  'statistic',
  'unclassified',
] as const;

export type ConsentCategories = (typeof CONSENT_CATEGORIES)[number];

type CookieConsentContextProps = {
  acceptsFunctionalCookies?: boolean;
  acceptsMarketingCookies?: boolean;
  acceptsNecessaryCookies?: boolean;
  acceptsStatisticCookies?: boolean;
  acceptsUnclassifiedCookies?: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextProps>({});

export function useCookieConsentContext() {
  return useContext(CookieConsentContext);
}

const convertCategoryToPropertyName = (category: ConsentCategories) => {
  return `accepts${category.charAt(0).toUpperCase()}${category.slice(
    1,
  )}Cookies`;
};

const getCurrentConsent = () => {
  const cookieInformation =
    window.CookieInformation as CookieInformationAPIProps;

  if (cookieInformation) {
    const targetObject: Partial<CookieConsentContextProps> = {};

    CONSENT_CATEGORIES.forEach((category) => {
      targetObject[
        convertCategoryToPropertyName(
          category,
        ) as keyof CookieConsentContextProps
      ] = !!cookieInformation.getConsentGivenFor(`cookie_cat_${category}`);
    });

    return targetObject;
  }

  return undefined;
};

export const CookieConsentContextProvider = ({
  acceptAll = false,
  children,
}: {
  acceptAll?: boolean;
  children: React.ReactNode;
}) => {
  const { asPath } = useRouter();
  const isDev =
    process.env.NODE_ENV !== 'production' ||
    asPath?.includes('amplience/visualization/pages/content-page');
  const [cookieConsent, setCookieConsent] = useState<CookieConsentContextProps>(
    {
      acceptsFunctionalCookies: acceptAll || isDev,
      acceptsMarketingCookies: acceptAll || isDev,
      acceptsNecessaryCookies: acceptAll || isDev,
      acceptsStatisticCookies: acceptAll || isDev,
      acceptsUnclassifiedCookies: acceptAll || isDev,
    },
  );

  useEffect(() => {
    const updateCookieConsent = () => {
      const consent = getCurrentConsent();

      consent && setCookieConsent(consent);
    };

    if (!acceptAll && !isDev) {
      updateCookieConsent();
      window.addEventListener(
        'CookieInformationConsentGiven',
        updateCookieConsent,
      );
    }
  }, [acceptAll, isDev]);

  return (
    <CookieConsentContext.Provider value={cookieConsent}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export default CookieConsentContext;
