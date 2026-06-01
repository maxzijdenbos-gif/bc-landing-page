import classNames from 'classnames';
import {
  cloneElement,
  type ReactElement,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import mergeRefs from 'libraries/utilities/merge-refs';
import type { FallbackPosition } from './popover-fallback';
import {
  getFallbackPosition,
  supportsAnchorPosition,
} from './popover-fallback';
import styles from './popover.module.scss';

export const POPOVER_SIDES = ['top', 'right', 'bottom', 'left'] as const;

export type PopoverSide = (typeof POPOVER_SIDES)[number];

/** Detect if popover is open (works with native :popover-open and test polyfill) */
function isPopoverOpen(el: HTMLElement | null): boolean {
  if (!el) return false;
  if (el.getAttribute('data-popover-open') === 'true') return true;
  try {
    return el.matches(':popover-open');
  } catch {
    return false;
  }
}

/** Infer effective side (top/bottom/left/right) from trigger and popover rects */
function getEffectiveSide(
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  preferredSide: PopoverSide,
): PopoverSide {
  const triggerCenterY = triggerRect.top + triggerRect.height / 2;
  const triggerCenterX = triggerRect.left + triggerRect.width / 2;
  const popoverCenterY = popoverRect.top + popoverRect.height / 2;
  const popoverCenterX = popoverRect.left + popoverRect.width / 2;

  if (preferredSide === 'top' || preferredSide === 'bottom') {
    return popoverCenterY < triggerCenterY ? 'top' : 'bottom';
  }
  return popoverCenterX < triggerCenterX ? 'left' : 'right';
}

export interface PopoverProps {
  /** Tooltip body: text, numbers, or trusted rich content (e.g. API HTML) inside the tooltip span. */
  children: ReactNode;
  /** Optional class name for the root */
  className?: string;
  /** Whether to show the arrow pointing to the trigger */
  showArrow?: boolean;
  /** Side of the trigger to show the popover */
  side?: PopoverSide;
  /** Gap between trigger and content in px */
  sideOffset?: number;
  /**
   * Trigger element; must be a &lt;button&gt; or &lt;input type="button"&gt; (or a component
   * that renders one and forwards ref + popoverTarget), so the native popover invoker is used.
   */
  trigger: ReactElement<{
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
  }>;
  /** Accessible label for the trigger (e.g. when trigger is an icon) */
  triggerAriaLabel?: string;
}

const DEFAULT_GAP = 5;

const Popover = ({
  children,
  className,
  trigger,
  side = 'top',
  sideOffset = DEFAULT_GAP,
  showArrow = true,
  triggerAriaLabel,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentId = useId();
  const popoverId = `${contentId}-popover`;
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [effectiveSide, setEffectiveSide] = useState<PopoverSide>(side);

  // Fallback when anchor positioning unsupported – remove with popover-fallback.ts
  const [supportsAnchor, setSupportsAnchor] = useState<boolean | null>(null);
  const [fallbackStyle, setFallbackStyle] = useState<FallbackPosition | null>(
    null,
  );

  useEffect(() => {
    setSupportsAnchor(supportsAnchorPosition());
  }, []);

  // Sync open state from popover toggle event (for aria-describedby, arrow, hidden)
  useEffect(() => {
    const popoverEl = popoverRef.current;
    if (!popoverEl) return;
    const onToggle = () => {
      const open = isPopoverOpen(popoverEl);
      setIsOpen(open);
      if (!open) setFallbackStyle(null);
    };
    popoverEl.addEventListener('toggle', onToggle);
    return () => popoverEl.removeEventListener('toggle', onToggle);
  }, []);

  // When anchor supported: infer effective side (after CSS flip). When not: use fallback position.
  const updatePosition = useCallback(() => {
    const triggerEl = triggerRef.current;
    const popoverEl = popoverRef.current;
    const contentEl = contentRef.current;
    if (!triggerEl || !popoverEl || !contentEl || !isPopoverOpen(popoverEl))
      return;
    const triggerRect = triggerEl.getBoundingClientRect();
    const contentRect = contentEl.getBoundingClientRect();
    if (supportsAnchor) {
      setEffectiveSide(getEffectiveSide(triggerRect, contentRect, side));
    } else {
      setEffectiveSide(side);
      const pos = getFallbackPosition(
        triggerRect,
        contentRect.width,
        contentRect.height,
        side,
        sideOffset,
      );
      setFallbackStyle({ left: pos.left, top: pos.top });
    }
  }, [side, sideOffset, supportsAnchor]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(raf);
  }, [isOpen, updatePosition]);

  // Fallback: keep position in sync on scroll/resize – remove with popover-fallback.ts
  useEffect(() => {
    if (!isOpen || supportsAnchor !== false) return;
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, supportsAnchor, updatePosition]);

  const forwardedTriggerRef = (
    trigger as ReactElement & { ref?: Ref<HTMLElement> }
  ).ref;

  /* eslint-disable react-hooks/refs -- mergeRefs runs ref writes in the ref callback, not during render */
  const triggerElement = cloneElement(trigger, {
    'aria-describedby': isOpen ? contentId : undefined,
    onClick: trigger.props?.onClick,
    popoverTarget: popoverId,
    popoverTargetAction: 'toggle' as const,
    ...(triggerAriaLabel && { 'aria-label': triggerAriaLabel }),
    className: classNames(styles.trigger, trigger.props?.className),
    ref: mergeRefs(
      forwardedTriggerRef !== undefined && forwardedTriggerRef !== null
        ? [triggerRef, forwardedTriggerRef]
        : [triggerRef],
    ),
  } as Record<string, unknown>);
  /* eslint-enable react-hooks/refs */

  return (
    <div
      className={classNames(styles.root, className)}
      style={{ ['--popover-gap']: `${sideOffset}px` } as React.CSSProperties}
    >
      {triggerElement}
      <div
        ref={popoverRef}
        id={popoverId}
        popover="auto"
        role="region"
        aria-labelledby={contentId}
        className={styles.popover}
        data-preferred-side={side}
        data-side={effectiveSide}
        {...(supportsAnchor === false && { 'data-anchor-fallback': true })}
        {...(!isOpen && { hidden: true })}
      >
        <div
          id={contentId}
          ref={contentRef}
          className={styles.content}
          data-side={effectiveSide}
          data-state={isOpen ? 'open' : 'closed'}
          role="tooltip"
          style={
            supportsAnchor === false && fallbackStyle
              ? {
                  left: fallbackStyle.left,
                  position: 'fixed',
                  top: fallbackStyle.top,
                }
              : undefined
          }
        >
          <span className={styles.text}>{children}</span>
          {showArrow && (
            <span className={styles.arrow} data-side={effectiveSide} />
          )}
        </div>
      </div>
    </div>
  );
};

Popover.displayName = 'Popover';

export default Popover;
