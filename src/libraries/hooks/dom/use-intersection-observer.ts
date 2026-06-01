import { useCallback, useEffect, useRef, useState } from 'react';

type IntersectionObserverProps = {
  onIntersect?: (entry: IntersectionObserverEntry) => void;
  rootMargin?: string;
  threshold?: number | number[];
  /** Between 0.0 - 1.0 */
  unObserveOnThreshold?: number;
};

function useIntersectionObserver({
  onIntersect,
  rootMargin,
  threshold,
  unObserveOnThreshold,
}: IntersectionObserverProps) {
  const [isIntersecting, setIsIntersecting] = useState<boolean>();
  // Used any here, since it can take any HTML element as ref
  const domNode = useRef<any | null>(null);
  const rootNode = useRef<any | null>(null);
  const [isViewed, setIsViewed] = useState(false);
  const [isAboveRoot, setIsAboveRoot] = useState(false);

  const intersectionCallback: IntersectionObserverCallback = useCallback(
    ([entry], observer) => {
      setIsIntersecting(entry.isIntersecting);
      setIsViewed((prev) => prev || entry.isIntersecting);
      setIsAboveRoot(entry.target.getBoundingClientRect().top < 0);
      onIntersect && onIntersect(entry);
      if (unObserveOnThreshold === undefined) return;
      if (
        entry.isIntersecting &&
        unObserveOnThreshold <= entry.intersectionRatio
      ) {
        observer.unobserve(entry.target);
      }
    },
    [onIntersect, unObserveOnThreshold],
  );

  useEffect(() => {
    if (domNode === null || !domNode.current || typeof window === 'undefined')
      return;
    const domElement = domNode.current;
    const options = {
      root: rootNode.current ?? null,
      rootMargin: rootMargin ?? '0% 0% 0% 0%',
      threshold: threshold ?? 0,
    };

    const observer = new IntersectionObserver(intersectionCallback, options);

    observer.observe(domElement);

    return () => {
      observer.unobserve(domElement);
    };
  }, [domNode, intersectionCallback, rootMargin, rootNode, threshold]);

  return {
    domNode,
    isAboveRoot,
    isIntersecting,
    isViewed,
    rootNode,
  };
}

export default useIntersectionObserver;
