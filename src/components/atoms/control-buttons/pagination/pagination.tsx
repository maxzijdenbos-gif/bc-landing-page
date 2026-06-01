import classNames from 'classnames';
import { useMemo } from 'react';
import Typography from 'components/atoms/typography/typography';
import styles from './pagination.module.scss';

export interface ControlButtonPaginationProps {
  className?: string;
  current: number;
  onClick?: (index: number) => void;
  total: number;
}

const ControlButtonPagination = ({
  className,
  current,
  total,
  onClick,
}: ControlButtonPaginationProps) => {
  const barData = useMemo(() => new Array(total).fill(null), [total]);

  return (
    <ul className={classNames(styles.component, className)}>
      {barData.map((_, index) => {
        return (
          <li key={index}>
            <button
              type="button"
              className={styles.button}
              aria-current={current === index ? 'true' : undefined}
              onClick={() => onClick && onClick(index)}
            >
              <Typography isScreenReaderOnly>
                {` ${index + 1} / ${total} `}
              </Typography>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ControlButtonPagination.displayName = 'Pagination';

export default ControlButtonPagination;
