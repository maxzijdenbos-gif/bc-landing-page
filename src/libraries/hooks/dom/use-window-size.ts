import { useEffect, useState } from 'react';
import { throttle } from 'libraries/throttle';

function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState<number>();
  const [windowHeight, setWindowHeight] = useState<number>();

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    const throttledOnResize = throttle(onResize, 50);

    onResize();
    window.addEventListener('resize', throttledOnResize);

    return () => {
      window.removeEventListener('resize', throttledOnResize);
    };
  }, []);

  return {
    windowHeight,
    windowWidth,
  };
}

export default useWindowSize;
