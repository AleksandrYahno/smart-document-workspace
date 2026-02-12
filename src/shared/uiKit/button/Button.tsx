import { FC } from 'react';

import { IButtonProps } from './button.interface';

import styles from './button.module.scss';

const Button: FC<IButtonProps> = (props) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    disabled = false,
    type = 'button',
    ...rest
  } = props;

  const classNames = [
    styles.root,
    styles[size],
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
