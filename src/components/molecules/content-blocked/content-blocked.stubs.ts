import { ContentBlockedProps } from './content-blocked';

const defaultStub: ContentBlockedProps = {
  missingAcceptOfCookieCategories: ['marketing'],
};

export default <Record<string, ContentBlockedProps>>{
  default: defaultStub,
};
