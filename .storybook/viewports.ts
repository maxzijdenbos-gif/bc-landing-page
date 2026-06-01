/* eslint-disable sort-keys */
// Disabling the rule for this
export const STORYBOOK_VIEWPORTS = {
  desktop: {
    name: 'Desktop',
    styles: {
      height: '1080px',
      width: '1920px',
    },
  },
  laptop: {
    name: 'Laptop',
    styles: {
      height: '768px',
      width: '1366px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      height: '1024px',
      width: '768px',
    },
  },
  mobile: {
    name: 'Mobile',
    styles: {
      height: '667px',
      width: '375px',
    },
  },
} as const;
