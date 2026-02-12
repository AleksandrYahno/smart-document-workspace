import { FC, ReactElement } from 'react';

import { Skeleton } from '@shared/uiKit/skeleton';

import styles from '../../documentDetailPage.module.scss';

const DocumentDetailSkeleton: FC = (): ReactElement => (
  <>
    <header className={styles.header}>
      <Skeleton
        height={32}
        width="60%"
        className={styles.titleSkeleton}
      />
      <Skeleton
        height={20}
        width="40%"
        className={styles.metaSkeleton}
      />
    </header>

    <section className={styles.section}>
      <Skeleton
        height={24}
        width={120}
        className={styles.sectionTitleSkeleton}
      />
      <Skeleton
        height={240}
        className={styles.previewSkeleton}
      />
    </section>

    <section className={styles.section}>
      <Skeleton
        height={24}
        width={140}
        className={styles.sectionTitleSkeleton}
      />
      <div className={styles.timeline}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={styles.timelineItem}
          >
            <div className={styles.timelineDot} />
            <Skeleton
              height={16}
              width="30%"
              className={styles.timelineSkeleton}
            />
            <Skeleton
              height={14}
              width="50%"
              className={styles.timelineMetaSkeleton}
            />
          </div>
        ))}
      </div>
    </section>
  </>
);

export default DocumentDetailSkeleton;
