import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import Row from 'components/utilities/row/row';
import { localeToCookieInformationLanguageCulture } from 'integrations/tracking/cookieinformation/scripts';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import styles from './cookie-policy.module.scss';

export interface CookiePolicyProps extends ModuleWrapperProps {}

const COOKIE_POLICY_WRAPPER_ID = 'CookiePolicyWrapper';
const COOKIE_POLICY_ID = 'CookiePolicy';

const CookiePolicy = ({ color }: CookiePolicyProps) => {
  const router = useRouter();
  const locale = getLocaleFromAsPath(router.asPath);

  useEffect(() => {
    // Add script with useEffect to avoid hydration error and keep placement in the DOM
    const scriptWrapper = document.getElementById(COOKIE_POLICY_WRAPPER_ID);
    const existingScript = document.getElementById(COOKIE_POLICY_ID);

    if (!scriptWrapper || existingScript) return;

    const script = document.createElement('script');

    script.src = 'https://policy.app.cookieinformation.com/cid.js';
    script.id = COOKIE_POLICY_ID;
    script.dataset.culture = localeToCookieInformationLanguageCulture(locale);
    scriptWrapper.appendChild(script);

    return () => {
      scriptWrapper.removeChild(script);
    };
  }, [locale]);

  return (
    <ModuleWrapper className={styles.component} color={color}>
      <Container>
        <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
          <Column
            offset={{
              laptop: 3,
              mobile: 0,
              tablet: 1,
            }}
            width={{
              laptop: 6,
              mobile: 12,
              tablet: 10,
            }}
          >
            <div id={COOKIE_POLICY_WRAPPER_ID} />
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

CookiePolicy.displayName = 'CookiePolicy';

export default CookiePolicy;
