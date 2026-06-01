import heroTextStubs from 'components/organisms/hero-text/hero-text.stubs';
import textStubs from 'components/organisms/text/text.stubs';
import { PageProps } from './page';

export const pageStub: PageProps = {
  modules: [
    {
      data: heroTextStubs.default,
      name: 'Hero',
    },
    {
      data: textStubs.default,
      name: 'Copy',
    },
  ],
};
