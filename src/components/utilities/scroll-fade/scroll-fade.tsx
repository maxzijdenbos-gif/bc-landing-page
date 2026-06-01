import { motion, useMotionValue, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import {
  MOTION_SCROLL_OBSERVER_OFFSET_KEYS,
  SharedMotionProps,
} from '../motion/motion-types';

export interface ScrollFadeProps extends SharedMotionProps {
  /** [0, 1] = increasing, [1, 0] = decreasing */
  fromRange: number[];
  /** Controls whether the animation should start. If false, element starts with initial opacity. */
  initMotion?: boolean;
  /** ['50%', '0%'] = [startValue, endValue] */
  opacityStartEnd?: (string | number)[];
}

const ScrollFade = ({
  children,
  className,
  elementRef,
  fromRange,
  initMotion = true,
  observerOffset = MOTION_SCROLL_OBSERVER_OFFSET_KEYS.startStartEndStart,
  opacityStartEnd = [1, 0],
}: ScrollFadeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollObserverOffset =
    typeof observerOffset === 'string'
      ? MOTION_SCROLL_OBSERVER_OFFSET_KEYS[observerOffset]
      : observerOffset;

  const { scrollYProgress } = useScroll({
    axis: 'y',
    offset: scrollObserverOffset,
    target: elementRef ? elementRef : ref,
  });

  const scrollBasedOpacity = useTransform(
    scrollYProgress,
    fromRange,
    opacityStartEnd,
  );

  const initialOpacityValue =
    Array.isArray(opacityStartEnd) && opacityStartEnd.length > 0
      ? opacityStartEnd[0]
      : 0;

  const staticOpacity = useMotionValue(initialOpacityValue);

  const opacity = initMotion ? scrollBasedOpacity : staticOpacity;

  return (
    <motion.div ref={ref} className={className} style={{ opacity }}>
      {children}
    </motion.div>
  );
};

export default ScrollFade;
