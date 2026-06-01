import type { MutableRefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import useScrollInfo from 'libraries/hooks/dom/use-scroll-info';

const THRESHOLD_TRANSPARENCY = 20;
const THRESHOLD_DOWN = 20;
const THRESHOLD_TIME = 50;

export function useNavigationScroll(
  menuOpen: boolean,
  messageBarHeightRef?: MutableRefObject<number>,
) {
  const [hideNavigation, setHideNavigation] = useState(false);
  const [makeNavigationSolid, setMakeNavigationSolid] = useState(false);
  const lastFocusChange = useRef<number | null>(null);

  useEffect(() => {
    lastFocusChange.current = performance.now();
  }, []);

  const { scrollDirection } = useScrollInfo({
    scrollYCallback: (scrollY) => {
      const messageBarHeight = messageBarHeightRef?.current ?? 0;
      const effectiveScrollY = Math.max((scrollY ?? 0) - messageBarHeight, 0);

      if (
        lastFocusChange.current !== null &&
        lastFocusChange.current + THRESHOLD_TIME >= performance.now()
      )
        return;

      requestAnimationFrame(() => {
        setMakeNavigationSolid((scrollY ?? 0) > THRESHOLD_TRANSPARENCY);
      });

      if (effectiveScrollY < THRESHOLD_DOWN) {
        setHideNavigation(false);

        return;
      }

      if (menuOpen) return;

      scrollDirection === 'down'
        ? setHideNavigation(true)
        : setHideNavigation(false);
    },
  });

  useEffect(() => {
    const handleFocusIn = () => {
      lastFocusChange.current = performance.now();
      setHideNavigation(false);
      requestAnimationFrame(() => {
        setMakeNavigationSolid((scrollY ?? 0) > THRESHOLD_TRANSPARENCY);
      });
    };

    addEventListener('focusin', handleFocusIn);

    return () => {
      removeEventListener('focusin', handleFocusIn);
    };
  }, [setHideNavigation]);

  return {
    hideNavigation,
    makeNavigationSolid,
    setHideNavigation,
  };
}
