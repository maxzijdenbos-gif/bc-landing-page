import classNames from 'classnames';
import React, { useMemo } from 'react';
import styles from './column.module.scss';

export type ColumnsType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ColumnBreakPoints {
  desktop?: ColumnsType;
  laptop?: ColumnsType;
  mobile?: ColumnsType;
  smallLaptop?: ColumnsType;
  tablet?: ColumnsType;
}

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  offset?: ColumnBreakPoints;
  order?: ColumnBreakPoints;
  width?: ColumnBreakPoints;
}

const getClass = (
  name: 'offset' | 'order' | 'component',
  breakpoint?: ColumnBreakPoints,
) => {
  if (!breakpoint) {
    return;
  }

  return classNames(
    typeof breakpoint.mobile === 'number' &&
      styles[`${name}--${breakpoint.mobile}`],
    typeof breakpoint.tablet === 'number' &&
      styles[`tablet:${name}--${breakpoint.tablet}`],
    typeof breakpoint.smallLaptop === 'number' &&
      styles[`smallLaptop:${name}--${breakpoint.smallLaptop}`],
    typeof breakpoint.laptop === 'number' &&
      styles[`laptop:${name}--${breakpoint.laptop}`],
    typeof breakpoint.desktop === 'number' &&
      styles[`desktop:${name}--${breakpoint.desktop}`],
  );
};

const Column = ({
  children,
  className,
  offset,
  order,
  width,
  ...rest
}: ColumnProps) => {
  const columnClasses = useMemo(() => {
    return classNames(
      getClass('component', width),
      getClass('offset', offset),
      getClass('order', order),
    );
  }, [width, offset, order]);

  return (
    <div
      {...rest}
      className={classNames(styles.component, columnClasses, className)}
    >
      {children}
    </div>
  );
};

export default Column;
