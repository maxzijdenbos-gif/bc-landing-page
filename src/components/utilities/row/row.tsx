import classNames from 'classnames';
import React, { useMemo } from 'react';
import styles from './row.module.scss';

type OuterGutterType = 'medium' | 'none';

interface OuterGutterBreakPoints {
  desktop?: OuterGutterType;
  laptop?: OuterGutterType;
  mobile?: OuterGutterType;
  smallLaptop?: OuterGutterType;
  tablet?: OuterGutterType;
}

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  classNameOuter?: string;
  outerGutter?: OuterGutterBreakPoints;
}

const getClass = (name: 'outerGutter', breakpoint?: OuterGutterBreakPoints) => {
  if (!breakpoint) {
    return;
  }

  return classNames(
    typeof breakpoint.mobile === 'string' &&
      styles[`${name}--${breakpoint.mobile}`],
    typeof breakpoint.tablet === 'string' &&
      styles[`tablet:${name}--${breakpoint.tablet}`],
    typeof breakpoint.tablet === 'string' &&
      styles[`smallLaptop:${name}--${breakpoint.smallLaptop}`],
    typeof breakpoint.laptop === 'string' &&
      styles[`laptop:${name}--${breakpoint.laptop}`],
    typeof breakpoint.desktop === 'string' &&
      styles[`desktop:${name}--${breakpoint.desktop}`],
  );
};
const Row = ({
  children,
  className,
  classNameOuter,
  outerGutter,
  ...rest
}: RowProps) => {
  const rowClasses = useMemo(() => {
    return getClass('outerGutter', outerGutter);
  }, [outerGutter]);

  return (
    <div className={classNames(styles.component, classNameOuter)}>
      <div {...rest} className={classNames(styles.root, className, rowClasses)}>
        {children}
      </div>
    </div>
  );
};

export default Row;
