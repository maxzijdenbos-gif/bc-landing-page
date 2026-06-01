import { CookiePolicyProps } from './cookie-policy';

const defaultStub: CookiePolicyProps = {
  title: 'CookiePolicy',
};

export default <Record<string, CookiePolicyProps>>{
  default: defaultStub,
};
