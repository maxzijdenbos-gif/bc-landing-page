import { APP_ROOT_ID } from 'constants/index';

function getScrollLockElement(): HTMLElement {
  return (document.getElementById(APP_ROOT_ID) ?? document.body) as HTMLElement;
}

/**
 * Locks or unlocks page scroll (e.g. when a modal or drawer is open).
 *
 * Applies the fixed-position freeze to `#app` when present so global `body`
 * flex layout and stacking are preserved; falls back to `document.body` if not.
 * The document scroll is frozen via `overflow: hidden` on `html` and `body`.
 */
const lockBodyScroll = (doLock: boolean) => {
  const el = getScrollLockElement();
  const useAppRoot = el.id === APP_ROOT_ID;

  if (doLock) {
    const scrollPosition = `-${window?.scrollY}px`;

    el.style.overflow = 'hidden';
    el.style.position = 'fixed';
    el.style.top = scrollPosition;
    el.style.left = '0px';
    el.style.right = '0px';

    if (useAppRoot) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
  } else {
    const scrollY = el.style.top;

    el.style.removeProperty('overflow');
    el.style.position = '';
    el.style.top = '';
    el.style.left = '';
    el.style.right = '';

    if (useAppRoot) {
      document.documentElement.style.removeProperty('overflow');
      document.body.style.removeProperty('overflow');
    }

    window?.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  }
};

export default lockBodyScroll;
