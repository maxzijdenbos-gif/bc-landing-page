/* eslint-disable sort-keys */
export type BreakpointNames =
  | 'mobile'
  | 'tablet'
  | 'smallLaptop'
  | 'laptop'
  | 'desktop';

// Breakpoint values matching with the ones in src/styles/variables/breakpoints.scss
// Sorting keys in the order of breakpoints not alphabetic for better reading purpose
export const LayoutBreakpoints: Record<BreakpointNames, number> = {
  mobile: 375,
  tablet: 768,
  smallLaptop: 1025,
  laptop: 1440,
  desktop: 1920,
};
