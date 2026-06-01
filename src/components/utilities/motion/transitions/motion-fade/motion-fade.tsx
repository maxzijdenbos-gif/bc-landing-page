import classNames from 'classnames';
import { Children, cloneElement, ReactElement } from 'react';
import React from 'react';
import { MOTION_DURATIONS } from 'components/utilities/motion/motion-types';
import { MotionEntrancesProps } from '../../entrances/motion-entrances-types';
import styles from './motion-fade.module.scss';

interface FadeProps extends MotionEntrancesProps {
  animationEndCallback?: () => void;
  children?: (ReactElement<any> | false)[] | ReactElement<any>;
  delay?: keyof typeof MOTION_DURATIONS;
  transition?: 'in' | 'out';
}

const MotionFade = ({
  animationDisabled,
  animationEndCallback,
  children,
  delay,
  initMotion = true,
  speed = 'speed-slow',
  transition = 'in',
}: FadeProps) => {
  const arrayChildren = Array.isArray(children) ? children : [children];

  return (
    <React.Fragment>
      {arrayChildren.length > 0 &&
        Children.map(children, (child) => {
          if (!child) return;

          return cloneElement(child, {
            className: classNames(child.props.className, styles.component, {
              [styles.fadeIn]:
                initMotion && !animationDisabled && transition === 'in',
              [styles.fadeOut]:
                initMotion && !animationDisabled && transition === 'out',
              [styles.animationDisabled]: animationDisabled,
            }),
            onAnimationEnd: () => {
              animationEndCallback && animationEndCallback();
            },
            style: {
              animationDelay: delay && MOTION_DURATIONS[delay].duration,
              animationDuration: speed && MOTION_DURATIONS[speed].duration,
              ...child.props.styles,
            },
          });
        })}
    </React.Fragment>
  );
};

MotionFade.title = 'MotionFade';

export default MotionFade;
