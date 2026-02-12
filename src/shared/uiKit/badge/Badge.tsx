import { FC } from 'react';

import { IBadgeProps } from './badge.interface';

import styles from './badge.module.scss';

const Badge: FC<IBadgeProps> = (props) => {
  const {
    children,
    variant = 'default',
    className = '',
  } = props;

  const classNames = [styles.root, styles[variant], className].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      {children}
    </span>
  );
};

export default Badge;
