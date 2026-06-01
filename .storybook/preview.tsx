import { Preview } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { merge } from 'lodash';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { I18nProvider } from 'next-localization';
import React from 'react';
import BreakpointContext from '../src/libraries/contexts/breakpoint-context';
import HierarchyLinksContext from '../src/libraries/contexts/hierarchy-links-context';
import useSetupBreakpoints from '../src/libraries/hooks/dom/use-setupBreakpoints';
import { fontOpenSans } from '../src/libraries/utilities/global-fonts/open-sans';
import breadcrumbLinksMock from '../src/mocks/endpoints/breadcrumb/breadcrumb.mock';
import dictionaryMock from '../src/mocks/endpoints/dictionary/dictionary.mock';
import drilldownLinksMock from '../src/mocks/endpoints/drilldown/drilldown.mock';
import { STORYBOOK_VIEWPORTS } from './viewports';
import 'styles/_app.scss';

const preview: Preview = {
  decorators: [
    (Story, { globals: { locale } }) => {
      const {
        breakpoint,
        isBelowDesktopView,
        isDesktop,
        isDesktopView,
        isTabletOrAbove,
      } = useSetupBreakpoints();

      return (
        <React.Fragment>
          <style>{`
            html {
              --fontFamily-body: ${fontOpenSans.style.fontFamily};
            }
          `}</style>

          <QueryClientProvider client={new QueryClient()}>
            <HierarchyLinksContext.Provider
              value={{
                breadcrumbLinks: breadcrumbLinksMock,
                currentLink: null,
                drilldownLinks: drilldownLinksMock,
              }}
            >
              <I18nProvider
                lngDict={
                  dictionaryMock && locale
                    ? merge(
                        dictionaryMock?.default,
                        dictionaryMock?.[locale] ?? {},
                      )
                    : {}
                }
                locale={locale}
              >
                <BreakpointContext.Provider
                  value={{
                    breakpoint,
                    isBelowDesktopView,
                    isDesktop,
                    isDesktopView,
                    isTabletOrAbove,
                  }}
                >
                  <Story />
                </BreakpointContext.Provider>
              </I18nProvider>
            </HierarchyLinksContext.Provider>
          </QueryClientProvider>
        </React.Fragment>
      );
    },
  ],

  globalTypes: {
    color: {
      defaultValue: '',
      description: 'Context for module wrapper',
      name: 'Context',
      toolbar: {
        icon: 'paintbrush',
        items: [
          {
            title: '- not selected -',
            value: '',
          },
          {
            title: 'Primary',
            value: 'primary',
          },
          {
            title: 'Secondary',
            value: 'secondary',
          },
          {
            title: 'Tertiary',
            value: 'tertiary',
          },
          {
            title: 'Quaternary',
            value: 'quaternary',
          },
          {
            title: 'Quinary',
            value: 'quinary',
          },
        ],
        title: 'Context',
      },
    },
    locale: {
      defaultValue: 'en',
      description: 'Internationalization locale',
      name: 'Language',
      toolbar: {
        icon: 'globe',
        items: [{ title: 'English', value: 'en' }],
        title: 'Language',
      },
    },
    themeName: {
      defaultValue: 'giant',
      description: 'Global theme for components',
      name: 'Theme',
      toolbar: {
        icon: 'mirror',
        items: [
          {
            title: 'Giant',
            value: 'giant',
          },
          {
            title: 'Liv',
            value: 'liv',
          },
        ],
        title: 'Brand Theme',
      },
    },
  },

  parameters: {
    a11y: {
      config: {
        rules: [{ enabled: false, id: 'aria-hidden-focus' }],
        runOnly: [
          'wcag2a',
          'wcag2aa',
          'wcag21a',
          'wcag21aa',
          'wcag22a',
          'wcag22aa',
          'best-practice',
        ],
      },
      test: 'error',
    },
    backgrounds: {
      disabled: true,
    },

    controls: {
      exclude: /(className)$/i,
      expanded: true,
      hideNoControlsWarning: true,
      matchers: {
        date: /Date$/,
      },
    },

    docs: {
      codePanel: true,
    },

    layout: 'fullscreen',

    nextRouter: {
      Provider: RouterContext.Provider,
    },

    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          '1. Tokens',
          '2. Atoms',
          '3. Molecules',
          '4. Organisms',
          '5. Templates',
          '6. Pages',
        ],
      },
    },

    viewport: {
      options: STORYBOOK_VIEWPORTS,
    },
  },

  tags: ['autodocs', 'test'],
};

export default preview;
