import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';

const INTERSECTION_OPTIONS = { rootMargin: '0% 0% -10% 0%' };

export const useStatsIntersectionObservers = () => {
  const title = useIntersectionObserver(INTERSECTION_OPTIONS);
  const backgroundImage = useIntersectionObserver(INTERSECTION_OPTIONS);
  const legalText = useIntersectionObserver(INTERSECTION_OPTIONS);
  const button = useIntersectionObserver(INTERSECTION_OPTIONS);
  const statOne = useIntersectionObserver(INTERSECTION_OPTIONS);
  const statTwo = useIntersectionObserver(INTERSECTION_OPTIONS);
  const statThree = useIntersectionObserver(INTERSECTION_OPTIONS);
  const statFour = useIntersectionObserver(INTERSECTION_OPTIONS);

  return {
    backgroundImageHasEntered: backgroundImage.isViewed,
    backgroundImageRef: backgroundImage.domNode,
    buttonHasEntered: button.isViewed,
    buttonRef: button.domNode,
    legalTextHasEntered: legalText.isViewed,
    legalTextRef: legalText.domNode,
    statHasEntered: [
      statOne.isViewed,
      statTwo.isViewed,
      statThree.isViewed,
      statFour.isViewed,
    ],
    statRefs: [
      statOne.domNode,
      statTwo.domNode,
      statThree.domNode,
      statFour.domNode,
    ],
    titleHasEntered: title.isViewed,
    titleRef: title.domNode,
  };
};
