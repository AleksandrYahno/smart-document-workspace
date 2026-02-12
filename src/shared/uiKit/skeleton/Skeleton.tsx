import { FC, ReactElement } from 'react';

import type { ISkeletonProps } from './skeleton.interface';

import styles from './skeleton.module.scss';

const Skeleton: FC<ISkeletonProps> = ({ className = '', width, height }): ReactElement => {
  const style: Record<string, string> = {};

  if (width !== undefined) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }

  if (height !== undefined) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <div
      className={`${styles.root} ${className}`.trim()}
      style={Object.keys(style).length > 0 ? style : undefined}
      aria-hidden
    />
  );
};

export default Skeleton;
