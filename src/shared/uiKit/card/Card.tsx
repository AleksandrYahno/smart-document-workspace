import { FC } from 'react';

import { ICardProps } from './card.interface';

import styles from './card.module.scss';

const Card: FC<ICardProps> = (props) => {
  const {
    children,
    title,
    className = '',
  } = props;

  const rootClasses = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={rootClasses}>
      {
        title && (
          <div className={styles.header}>
            <h3 className={styles.title}>
              {title}
            </h3>
          </div>
        )
      }

      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};

export default Card;
