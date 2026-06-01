import classNames from 'classnames';
import { type JSX, useCallback, useEffect, useState } from 'react';
import styles from './motion-track-slide.module.scss';

interface MotionTrackSlideProps {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
  className?: string;
  /** make sure to initially pass null if no animation */
  doAnimate: boolean | null;
}

const MotionTrackSlide = ({
  className,
  doAnimate,
  children,
}: MotionTrackSlideProps) => {
  const animationSpeed = parseFloat(styles.animationSpeed || '0.0') * 1000;
  const [isAnimating, setIsAnimating] = useState(false);
  const triggerAnimation = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), animationSpeed);
  }, [animationSpeed, isAnimating]);

  useEffect(() => {
    if (doAnimate === null) return;
    triggerAnimation();
    // adding triggerAnimation will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doAnimate]);

  return (
    <div
      className={classNames(styles.component, className, {
        [styles.isAnimating]: isAnimating,
      })}
    >
      <div className={styles.main}>{children}</div>
      <div aria-hidden="true" className={styles.pseudo} inert>
        {children}
      </div>
    </div>
  );
};

MotionTrackSlide.displayName = 'MotionTrackSlide';

export default MotionTrackSlide;
