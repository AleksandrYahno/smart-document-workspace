import { FC, ReactElement } from 'react';

import { Skeleton } from '@shared/uiKit/skeleton';

import styles from '../../../documentListPage.module.scss';

const ROWS = 10;
const COLS = 7;

const DocumentListSkeleton: FC = (): ReactElement => (
  <div className={styles.tableWrap}>
    <table className={styles.table}>
      <thead>
        <tr>
          {Array.from({ length: COLS }).map((_, i) => (
            <th
              key={i}
              className={styles.th}
            >
              <Skeleton height={20} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: ROWS }).map((_, rowIndex) => (
          <tr
            key={rowIndex}
            className={styles.tr}
          >
            {Array.from({ length: COLS }).map((_, colIndex) => (
              <td
                key={colIndex}
                className={styles.td}
              >
                <Skeleton
                  height={20}
                  width={colIndex === 1 ? '80%' : colIndex === 0 ? 20 : '60%'}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DocumentListSkeleton;
