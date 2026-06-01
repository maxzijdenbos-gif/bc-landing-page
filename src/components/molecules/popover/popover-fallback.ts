/**
 * Fallback for browsers that do not support CSS anchor positioning (position-area / position-anchor).
 *
 * When all target browsers support anchor positioning, this file and its usage in popover.tsx
 * can be removed. In popover.tsx, remove:
 * - import from './popover-fallback'
 * - supportsAnchor state and the effect that sets it
 * - fallbackStyle state and the logic that sets/clears it
 * - the fallback branch in updatePosition (keep only the getEffectiveSide branch)
 * - the scroll/resize effect that runs when supportsAnchor === false
 * - data-anchor-fallback attribute and the inline style on the content div
 * In popover.module.scss, remove all :not([data-anchor-fallback]) selectors (use the anchor rules unconditionally).
 */

export type FallbackPosition = { left: number; top: number };

type Side = 'top' | 'right' | 'bottom' | 'left';

/** Detect if the browser supports CSS anchor positioning. */
export function supportsAnchorPosition(): boolean {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('position-area', 'top');
}

/** Compute fixed position (center-aligned) for the popover when anchor positioning is not supported. */
export function getFallbackPosition(
  triggerRect: DOMRect,
  contentWidth: number,
  contentHeight: number,
  side: Side,
  sideOffset: number,
): FallbackPosition {
  const t = triggerRect;
  const centerX = t.left + t.width / 2 - contentWidth / 2;
  const centerY = t.top + t.height / 2 - contentHeight / 2;
  switch (side) {
    case 'top':
      return { left: centerX, top: t.top - contentHeight - sideOffset };
    case 'bottom':
      return { left: centerX, top: t.bottom + sideOffset };
    case 'left':
      return { left: t.left - contentWidth - sideOffset, top: centerY };
    case 'right':
      return { left: t.right + sideOffset, top: centerY };
    default:
      return { left: 0, top: 0 };
  }
}
