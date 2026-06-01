import classNames from 'classnames';
import { forwardRef, ReactElement, useId, useState } from 'react';
import React from 'react';
import Typography from '../typography/typography';
import styles from './checkbox.module.scss';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  children?: ReactElement;
  className?: string;
  /** Disabling input */
  disabled?: boolean;
  error?: string;
  onChange?: (event: any) => void;
  onClick?: () => void;
  style?: React.CSSProperties;
  tabIndex?: number;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      className,
      children,
      disabled,
      error,
      onChange,
      onClick,
      style,
      tabIndex,
      ...rest
    },
    ref,
  ) => {
    const [isPressed, setIsPressed] = useState(false);
    const errorId = useId();

    return (
      <label
        className={classNames(styles.component, className, {
          [styles.isPressed]: isPressed,
          [styles.hasError]: error,
        })}
        style={style}
      >
        <input
          ref={ref}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          checked={checked}
          className={styles.input}
          disabled={disabled}
          onChange={onChange}
          onClick={onClick}
          onMouseDown={() => {
            setIsPressed(true);
          }}
          onMouseLeave={() => {
            setIsPressed(false);
          }}
          onMouseUp={() => {
            setIsPressed(false);
          }}
          tabIndex={tabIndex}
          type="checkbox"
          {...rest}
        />
        {children ? (
          <div className={styles.children}>
            <React.Fragment>{children}</React.Fragment>
            {error && (
              <Typography
                className={styles.errorMessage}
                id={errorId}
                tag="span"
                tagStyle="bodyXSmall"
              >
                {error}
              </Typography>
            )}
          </div>
        ) : (
          error && (
            <Typography
              className={styles.errorMessage}
              id={errorId}
              tag="span"
              tagStyle="bodyXSmall"
            >
              {error}
            </Typography>
          )
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
