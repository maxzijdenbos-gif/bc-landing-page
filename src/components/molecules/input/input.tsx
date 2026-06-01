import classNames from 'classnames';
import React, { forwardRef } from 'react';
import Typography from 'components/atoms/typography/typography';
import styles from './input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Indicates whether the field is disabled */
  disabled?: boolean;
  /** A text that is shown below the field and affects the styling */
  error?: string;
  /** A text that is shown below the field as help text */
  help?: string;
  /** The id of the field */
  id: string;
  /** The text that is shown above the field as a label */
  label?: string;
  /** An event that is triggered on blur */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** An event that is triggered on change */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** An event that is triggered on focus */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** A text that is shown inside the field as a placeholder */
  placeholder?: string;
  /** If the field is required */
  required?: boolean;
  /** The value of the field */
  value?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    /* Placeholder left with empty space intention to use :placeholder-shown */
    {
      className,
      disabled,
      error,
      help,
      id,
      label,
      placeholder = ' ',
      required,
      ...rest
    },
    ref,
  ) => {
    const idError = `${id}-error`;

    return (
      <div
        className={classNames(styles.component, className, {
          [styles.hasError]: error,
          [styles.isDisabled]: disabled,
        })}
      >
        <input
          {...rest}
          ref={ref}
          aria-describedby={error ? idError : undefined}
          aria-invalid={!!error}
          className={styles.field}
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          required={required}
        />
        {label && (
          <Typography
            className={styles.label}
            htmlFor={id}
            tag="label"
            tagStyle="bodySmall"
          >
            {label}
          </Typography>
        )}

        {help && !error && (
          <Typography className={styles.help} tagStyle="bodyXSmall">
            {help}
          </Typography>
        )}

        {error && (
          <Typography
            className={styles.error}
            id={idError}
            tagStyle="bodyXSmall"
          >
            {error}
          </Typography>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
