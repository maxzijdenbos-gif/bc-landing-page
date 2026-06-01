import Script from 'next/script';
import { FALLBACK_LOCALE } from 'libraries/getters/get-locale';

export const localeToCookieInformationLanguageCulture = (locale: Locale) => {
  return locale.split('-')[0].toUpperCase();
};

export const CookieInformationScript = (locale = FALLBACK_LOCALE) => {
  return (
    // script provided by CookieInformation and used with Next js Script component inside _document
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      data-culture={localeToCookieInformationLanguageCulture(locale)}
      data-gcm-version="2.0"
      id="CookieConsent"
      src="https://policy.app.cookieinformation.com/uc.js"
      strategy="beforeInteractive"
      type="text/javascript"
    />
  );
};
export const GoogleV2ConsentModeScript = () => {
  return (
    // script provided by CookieInformation and used with Next js Script component inside _document
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="GoogleConsentMode" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }

        gtag('consent', 'default', {
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'wait_for_update': 500,
          });
      `}
    </Script>
  );
};
