import { FC } from 'react';

import { ITooltipProps } from './tooltip.interface';

import styles from './tooltip.module.scss';

const Tooltip: FC<ITooltipProps> = (props) => {
  const {
    content,
    children,
    position = 'top',
    className = '',
  } = props;

  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ');
  const tooltipClasses = [styles.tooltip, styles[position]].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <span
        className={styles.trigger}
        tabIndex={0}
        role="button"
      >
        {children}
      </span>
      <div
        className={tooltipClasses}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
