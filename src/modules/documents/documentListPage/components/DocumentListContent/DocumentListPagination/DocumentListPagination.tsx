import { FC, ReactElement } from 'react';

import { Button } from '@shared/uiKit/button';

import type { IDocumentListPaginationProps } from './DocumentListPagination.interface';

import styles from '../../../documentListPage.module.scss';

const DocumentListPagination: FC<IDocumentListPaginationProps> = (props): ReactElement => {
  const { page, totalPages, total, onPrev, onNext } = props;

  return (
    <div className={styles.pagination}>
      <Button
        size="sm"
        variant="outline"
        disabled={page <= 1}
        onClick={onPrev}
      >
        ←
      </Button>

      <span className={styles.pageInfo}>
        {page}
        {' / '}
        {totalPages}
        {' — '}
        {total}
        {' total'}
      </span>

      <Button
        size="sm"
        variant="outline"
        disabled={page >= totalPages}
        onClick={onNext}
      >
        →
      </Button>
    </div>
  );
};

export default DocumentListPagination;
