import { createContext } from 'react';
import { BreakpointInfo } from 'libraries/hooks/dom/use-setupBreakpoints';

const BreakpointContext = createContext<BreakpointInfo>({
  breakpoint: undefined, // Fallback breakpoint,
  isBelowDesktopView: undefined, // Fallback value
  isDesktop: undefined, // Fallback value
  isDesktopView: undefined, // Fallback value
  isLaptopOrAbove: undefined, // Fallback value
  isTabletOrAbove: undefined, // fallback value
});

export default BreakpointContext;
