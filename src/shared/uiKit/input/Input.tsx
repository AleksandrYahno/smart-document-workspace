import { FC, forwardRef, useId } from 'react';

import { IInputProps } from './input.interface';

import styles from './input.module.scss';

const Input: FC<IInputProps> = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const {
    label,
    error,
    fullWidth = false,
    className = '',
    id,
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = id ?? `input-${generatedId.replace(/:/g, '')}`;
  const hasError = Boolean(error);

  const wrapperClasses = [
    styles.wrapper,
    fullWidth ? styles.wrapperFullWidth : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    styles.input,
    hasError ? styles.inputError : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {
        label && (
          <label
            htmlFor={inputId}
            className={styles.label}
          >
            {label}
          </label>
        )
      }

      <input
        ref={ref}
        id={inputId}
        className={inputClasses}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : undefined}
        {...rest}
      />

      {
        hasError && (
          <span
            id={`${inputId}-error`}
            className={styles.errorText}
            role="alert"
          >
            {error}
          </span>
        )
      }
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
