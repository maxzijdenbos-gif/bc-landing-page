import classNames from 'classnames';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './stacked-cards.module.scss';

export interface StackedCardsProps {
  activeChild: number;
  childClassName?: string;
  children: ReactNode[];
  className?: string;
  style?: CSSProperties;
}

const ANIMATION_DURATION = 250;
const ANIMATION_STAGGER = 25;
const PERSPECTIVE = 150;

const generateStyle: (
  activeIndex: number,
  currentIndex: number,
  indexCount: number,
) => CSSProperties = (activeIndex, currentIndex) => {
  const distanceToActive = currentIndex - activeIndex;
  const offset = distanceToActive * 100;
  const style: CSSProperties = {};

  if (currentIndex > activeIndex) {
    style.transform = `perspective(${PERSPECTIVE}px) translate3d(100%, 0, 0px)`;
  } else {
    style.transitionTimingFunction = 'ease-out';
    style.transform = `perspective(${PERSPECTIVE}px) translate3d(${
      offset / 4
    }%, 0, ${offset / 4}px)`;
  }

  return style;
};

const StackedCards = ({
  activeChild,
  childClassName,
  children,
  className,
  style,
}: StackedCardsProps) => {
  const [visuallyActiveChild, setVisuallyActiveChild] = useState(activeChild);
  const targetChild = useRef(activeChild);
  const animationHandler = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    // Case target is updated
    if (targetChild.current === activeChild) return;
    targetChild.current = activeChild;
    const distanceDuration =
      ANIMATION_DURATION / Math.abs(targetChild.current - visuallyActiveChild);

    clearInterval(animationHandler.current);

    const intervalFunction = () => {
      if (targetChild.current === visuallyActiveChild)
        return clearInterval(animationHandler.current);

      setVisuallyActiveChild((value) => {
        if (value === targetChild.current) {
          clearInterval(animationHandler.current);

          return value;
        }

        return value > targetChild.current ? value - 1 : value + 1;
      });
    };

    animationHandler.current = setInterval(
      intervalFunction,
      distanceDuration + ANIMATION_STAGGER,
    );
    intervalFunction();
  }, [activeChild, visuallyActiveChild]);

  return (
    <div className={classNames(styles.component, className)} style={style}>
      {children
        ?.slice()
        .reverse()
        .map((child, index) => (
          <div
            key={index + children.length}
            className={classNames(styles.child, childClassName)}
            style={generateStyle(
              children.length - 1 - visuallyActiveChild,
              index,
              children.length,
            )}
          >
            {child}
          </div>
        ))}
    </div>
  );
};

StackedCards.displayName = 'StackedCards';

export default StackedCards;
