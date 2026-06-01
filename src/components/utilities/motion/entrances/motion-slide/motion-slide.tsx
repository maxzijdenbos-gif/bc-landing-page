import classNames from 'classnames';
import { Children, cloneElement, ReactElement } from 'react';
import React from 'react';
import { MOTION_DURATIONS } from '../../motion-types';
import { MotionEntrancesProps } from '../motion-entrances-types';
import styles from './motion-slide.module.scss';

type SlideDirections = 'up' | 'left-right';

export interface MotionSlideProps extends MotionEntrancesProps {
  animationEndCallback?: () => void;
  children?: ReactElement<any> | (ReactElement<any> | false)[];
  className?: string;
  delay?: keyof typeof MOTION_DURATIONS;
  direction: SlideDirections;
}

const MotionSlide = ({
  animationEndCallback,
  children,
  direction,
  initMotion = true,
  className,
  delay,
  speed = 'speed-slow',
  animationDisabled,
}: MotionSlideProps) => {
  const arrayChildren = Array.isArray(children) ? children : [children];

  return (
    <React.Fragment>
      {arrayChildren.length > 0 && (
        <div className={classNames(styles.component, className)}>
          {Children.map(children, (child) => {
            if (!child) return;

            return cloneElement(child, {
              className: classNames(
                child.props.className,
                styles.initialState,
                {
                  [styles.slideUp]:
                    direction === 'up' && initMotion && !animationDisabled,
                  [styles.slideLeftToRight]:
                    direction === 'left-right' &&
                    initMotion &&
                    !animationDisabled,
                  [styles.animationDisabled]: animationDisabled,
                },
              ),
              style: {
                animationDelay: delay && MOTION_DURATIONS[delay].duration,
                animationDuration: speed && MOTION_DURATIONS[speed].duration,
                ...child.props.styles,
              },
              ...(animationEndCallback && {
                onAnimationEnd: animationEndCallback(),
              }),
            });
          })}
        </div>
      )}
    </React.Fragment>
  );
};

MotionSlide.title = 'MotionSlide';

export default MotionSlide;
