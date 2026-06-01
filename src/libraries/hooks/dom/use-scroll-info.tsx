import { useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';

interface ScrollInfo {
  scrollProgressCallback?: (scrollProgress: number) => void;
  scrollYCallback?: (scrollY: number) => void;
}

const useScrollInfo = ({
  scrollProgressCallback,
  scrollYCallback,
}: ScrollInfo = {}) => {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrollDirection, setScrollDirection] = useState('down');

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    scrollProgressCallback?.(current);
  });

  useMotionValueEvent(scrollY, 'change', (current) => {
    scrollYCallback?.(current);
    const previousScrollY = scrollY.getPrevious();

    if (previousScrollY === undefined) {
      return;
    }

    const diff = current - previousScrollY;

    setScrollDirection(diff > 0 ? 'down' : 'up');
  });

  return {
    scrollDirection,
    scrollY,
  };
};

export default useScrollInfo;
