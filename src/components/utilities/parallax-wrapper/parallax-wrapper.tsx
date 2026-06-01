import {
  motion,
  useScroll,
  UseScrollOptions,
  useTransform,
} from 'motion/react';
import React from 'react';
import { useRef } from 'react';
import {
  MOTION_SCROLL_OBSERVER_OFFSET_KEYS,
  SharedMotionProps,
} from '../motion/motion-types';

type MotionParallaxDistanceNaming =
  | '0%To100%'
  | '15vhTo0vh'
  | '-15vhTo0vh'
  | '15vhTo-15vh';

type MotionParallaxDistance =
  | MotionParallaxDistanceNaming
  | (string | number)[];

const PARALLAX_DISTANCE: Record<
  MotionParallaxDistanceNaming,
  (string | number)[]
> = {
  '-15vhTo0vh': ['-15vh', '0vh'],
  '0%To100%': ['0%', '100%'],
  '15vhTo-15vh': ['15vh', '-15vh'],
  '15vhTo0vh': ['15vh', '0vh'],
};

interface ParallaxWrapperProps extends SharedMotionProps {
  /** The function the execute at a certain threshold */
  callback?: (visible: boolean) => void;
  /** The threshold in pixels to which to execute the callback function */
  callbackThreshold?: number;
  /** The ability to disable the parallax and just return children. E.g. if parallax is conditional in parent component */
  disable?: boolean;
  minOpacity?: number;
  /** Optional style object, merged with motion transform styles (e.g. for maxHeight on iOS) */
  style?: React.CSSProperties;
  /**
   * Controls the vertical parallax movement of the element
   *
   * Pre-defined options:
   * - '-15vhTo0vh': Moves downwards from a translation of -15vh above natural position to natural position
   * - '0%To100%': Moves downward from natural to 100% below
   * - '15vhTo-15vh': Moves through full range, crossing natural position
   * - '15vhTo0vh': Moves upward from 15vh below to natural position
   *
   * Or custom [start, end] values
   * @default ['0%', '20%']
   */
  translateYStartEnd?: MotionParallaxDistance;
}

type SharedParallaxWrapperProps = Pick<
  SharedMotionProps,
  'children' | 'className' | 'elementRef'
> & {
  style?: React.CSSProperties;
};

interface ParallaxWrapperWithDistanceProps extends SharedParallaxWrapperProps {
  observerOffset: UseScrollOptions['offset'];
  translateYStartEnd: (string | number)[];
}

interface ParallaxWrapperWithOpacityProps extends SharedParallaxWrapperProps {
  minOpacity: number;
  observerOffset: UseScrollOptions['offset'];
  translateYStartEnd: (string | number)[];
}

const ParallaxWrapperWithDistance = ({
  translateYStartEnd,
  children,
  className,
  observerOffset,
  elementRef,
  style,
}: ParallaxWrapperWithDistanceProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const divRef = elementRef ?? ref;

  const { scrollYProgress } = useScroll({
    axis: 'y',
    offset: observerOffset,
    target: divRef,
  });
  const y = useTransform(scrollYProgress, [0, 1], translateYStartEnd);

  return (
    <motion.div ref={divRef} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
};

const ParallaxWrapperWithOpacity = ({
  children,
  elementRef,
  className,
  observerOffset,
  translateYStartEnd,
  minOpacity,
  style,
}: ParallaxWrapperWithOpacityProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const divRef = elementRef ?? ref;

  const { scrollYProgress } = useScroll({
    axis: 'y',
    offset: observerOffset,
    target: divRef,
  });
  const y = useTransform(scrollYProgress, [0, 1], translateYStartEnd);
  const opacity = useTransform(scrollYProgress, [1, 0], [1, minOpacity]);

  return (
    <motion.div
      ref={divRef}
      className={className}
      style={{ ...style, opacity, y }}
    >
      {children}
    </motion.div>
  );
};

const ParallaxWrapper = ({
  children,
  elementRef,
  translateYStartEnd = ['0%', '20%'],
  disable,
  minOpacity,
  observerOffset = MOTION_SCROLL_OBSERVER_OFFSET_KEYS.startStartEndStart,
  ...rest
}: ParallaxWrapperProps) => {
  if (disable) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  const scrollObserverOffset =
    typeof observerOffset === 'string'
      ? MOTION_SCROLL_OBSERVER_OFFSET_KEYS[observerOffset]
      : observerOffset;

  const parallaxDistance =
    typeof translateYStartEnd === 'string'
      ? PARALLAX_DISTANCE[translateYStartEnd]
      : translateYStartEnd;

  const parallaxInstanceKey = elementRef ? 'externalElementRef' : 'internalRef';

  if (minOpacity === undefined) {
    return (
      <ParallaxWrapperWithDistance
        key={parallaxInstanceKey}
        elementRef={elementRef}
        observerOffset={scrollObserverOffset}
        translateYStartEnd={parallaxDistance}
        {...rest}
      >
        {children}
      </ParallaxWrapperWithDistance>
    );
  }

  return (
    <ParallaxWrapperWithOpacity
      key={parallaxInstanceKey}
      elementRef={elementRef}
      minOpacity={minOpacity}
      observerOffset={scrollObserverOffset}
      translateYStartEnd={parallaxDistance}
      {...rest}
    >
      {children}
    </ParallaxWrapperWithOpacity>
  );
};

export default ParallaxWrapper;
