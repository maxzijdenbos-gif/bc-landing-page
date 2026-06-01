import { APP_ROOT_ID } from 'constants/index';
import { useCallback, useEffect } from 'react';
import useBreakpoints from '../dom/use-breakpoints';

const NAV_HEIGHT_DESKTOP = 64;
const NAV_HEIGHT_MOBILE = 48;

function setNavigationColor(color: BackgroundColor) {
  if (!window) return;
  const appElement = document.getElementById(APP_ROOT_ID);

  if (appElement) {
    appElement.dataset.navColor = color;
  }
}

export function useSetNavigationColor(
  domNode: React.RefObject<HTMLDivElement | null>,
  colorName?: NavigationVariants,
  resetOnLeave?: boolean,
) {
  const color = colorName || undefined;
  const { isDesktopView } = useBreakpoints();

  const handleScroll = useCallback(() => {
    if (!domNode || !domNode.current || !window) return;
    const scrollY = window.scrollY;

    const offTop = domNode.current.offsetTop;
    const offTopAndHeight =
      domNode.current.getBoundingClientRect().height + offTop;
    const scrolled =
      scrollY + (isDesktopView ? NAV_HEIGHT_DESKTOP : NAV_HEIGHT_MOBILE);

    if (offTop < scrolled && scrolled < offTopAndHeight) {
      setNavigationColor(color);
    } else if (resetOnLeave) {
      setNavigationColor(undefined);
    }
  }, [domNode, isDesktopView, resetOnLeave, color]);

  useEffect(() => {
    if (colorName === null) return;
    handleScroll();
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      setNavigationColor(undefined);
    };
  }, [handleScroll, colorName, isDesktopView]);
}
