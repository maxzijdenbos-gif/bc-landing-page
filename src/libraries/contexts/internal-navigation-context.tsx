// main-navigation-context.tsx
import React, { createContext, useContext } from 'react';
import { SitemapNodeProps } from 'components/organisms/module-sitemap/module-sitemap';

export type InternalLinkLocaleMap = Record<Locale, string>;

export type InternalLinkMapTypeRecord = Record<string, InternalLinkLocaleMap>;

interface InternalLinksContextType {
  hierarchy?: SitemapNodeProps;
  internalLinks: InternalLinkMapTypeRecord;
}

const InternalLinksContext = createContext<InternalLinksContextType>({
  hierarchy: undefined,
  internalLinks: {},
});

export function useInternalLinksContext() {
  return useContext(InternalLinksContext);
}

export const InternalLinksContextProvider = ({
  children,
  hierarchy,
  internalLinks,
}: {
  children: React.ReactNode;
  hierarchy?: SitemapNodeProps;
  internalLinks: InternalLinkMapTypeRecord;
}) => {
  return (
    <InternalLinksContext.Provider
      value={{
        hierarchy,
        internalLinks,
      }}
    >
      {children}
    </InternalLinksContext.Provider>
  );
};

export default InternalLinksContextProvider;
