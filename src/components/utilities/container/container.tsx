import classNames from 'classnames';
import React from 'react';
import styles from './container.module.scss';

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Container = ({
  children,
  className,
  fullWidth = false,
  ...rest
}: ContainerProps) => {
  return (
    <div
      {...rest}
      className={classNames(styles.component, className, {
        [styles.isFullWidth]: fullWidth,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
