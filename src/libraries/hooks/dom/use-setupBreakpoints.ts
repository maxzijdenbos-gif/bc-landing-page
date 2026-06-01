import { useEffect, useMemo, useState } from 'react';
import { BreakpointNames, LayoutBreakpoints } from 'types/layout';

export interface BreakpointInfo {
  breakpoint: BreakpointNames | undefined;
  isBelowDesktopView: boolean | undefined;
  isDesktop: boolean | undefined;
  isDesktopView: boolean | undefined;
  isLaptopOrAbove: boolean | undefined;
  isTabletOrAbove: boolean | undefined;
}

const { desktop, tablet, laptop, smallLaptop } = LayoutBreakpoints;

const BREAKPOINT_MEDIA_QUERIES: { name: BreakpointNames; query: string }[] = [
  { name: 'desktop', query: `(min-width: ${desktop}px)` },
  {
    name: 'laptop',
    query: `(min-width: ${laptop}px) and (max-width: ${desktop - 1}px)`,
  },
  {
    name: 'smallLaptop',
    query: `(min-width: ${smallLaptop}px) and (max-width: ${laptop - 1}px)`,
  },
  {
    name: 'tablet',
    query: `(min-width: ${tablet}px) and (max-width: ${smallLaptop - 1}px)`,
  },
  { name: 'mobile', query: `(max-width: ${tablet - 1}px)` },
];

function getBreakpointFromMediaMatches(): BreakpointNames | undefined {
  if (typeof window === 'undefined') return undefined;
  const match = BREAKPOINT_MEDIA_QUERIES.find(
    ({ query }) => window.matchMedia(query).matches,
  );
  return match?.name;
}

/**
 * Provides current layout breakpoint and derived flags. Uses matchMedia so
 * updates only fire when the active breakpoint changes.
 *
 * @returns BreakpointInfo for the current viewport
 * @important Only used in __app so breakpoint listeners are registered once
 */
const useSetupBreakpoints = () => {
  const [breakpoint, setBreakpoint] = useState<BreakpointNames | undefined>(
    undefined,
  );

  const breakpointInfo = useMemo((): BreakpointInfo => {
    if (!breakpoint) {
      return {
        breakpoint: undefined,
        isBelowDesktopView: undefined,
        isDesktop: undefined,
        isDesktopView: undefined,
        isLaptopOrAbove: undefined,
        isTabletOrAbove: undefined,
      };
    }

    const isDesktop = breakpoint === 'desktop';
    const isDesktopView =
      breakpoint === 'desktop' ||
      breakpoint === 'laptop' ||
      breakpoint === 'smallLaptop';
    const isLaptopOrAbove = breakpoint === 'laptop' || breakpoint === 'desktop';
    const isBelowDesktopView =
      breakpoint === 'mobile' || breakpoint === 'tablet';
    const isTabletOrAbove =
      breakpoint === 'desktop' ||
      breakpoint === 'laptop' ||
      breakpoint === 'tablet' ||
      breakpoint === 'smallLaptop';

    return {
      breakpoint,
      isBelowDesktopView,
      isDesktop,
      isDesktopView,
      isLaptopOrAbove,
      isTabletOrAbove,
    };
  }, [breakpoint]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const applyBreakpoint = () => {
      const next = getBreakpointFromMediaMatches();
      setBreakpoint((prev) => (prev === next ? prev : next));
    };

    applyBreakpoint();

    const mediaQueryLists = BREAKPOINT_MEDIA_QUERIES.map(({ query }) =>
      window.matchMedia(query),
    );
    mediaQueryLists.forEach((mql) =>
      mql.addEventListener('change', applyBreakpoint),
    );

    return () => {
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener('change', applyBreakpoint),
      );
    };
  }, []);

  return breakpointInfo;
};

export default useSetupBreakpoints;
