import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import useDocumentListStoreProvider from '../../providers/documentListStoreProvider/useDocumentListStoreProvider';
import DocumentListBulkBarVM from '../DocumentListBulkBarVM/DocumentListBulkBarVM';
import DocumentListSkeleton from './DocumentListSkeleton/DocumentListSkeleton';
import DocumentListTableView from './DocumentListTableView/DocumentListTableView';
import DocumentListGridView from './DocumentListGridView/DocumentListGridView';

import type { IDocumentListContentProps } from './DocumentListContent.interface';

import styles from '../../documentListPage.module.scss';

const DocumentListContent: FC<IDocumentListContentProps> = (props): ReactElement => {
  const { table, data, isLoading, isError, pageSize } = props;
  const { t } = useTranslation('documents');
  const { documentListStore } = useDocumentListStoreProvider();

  const page = documentListStore((s) => s.documentListSlice.page);
  const viewMode = documentListStore((s) => s.documentListSlice.viewMode);
  const setPage = documentListStore((s) => s.documentListSlice.setPage);

  const selectedCount = table.getSelectedRowModel().rows.length;
  const emptyLabel = t('no_data', { ns: 'common' });

  const handlePrevPage = (): void => {
    setPage((p) => p - 1);
  };

  const handleNextPage = (): void => {
    setPage((p) => p + 1);
  };

  return (
    <>
      <DocumentListBulkBarVM selectedCount={selectedCount} />

      <div className={styles.content}>
        {
          isLoading && (
            <DocumentListSkeleton />
          )
        }

        {
          isError && (
            <p className={styles.error}>
              {t('error_occurred', { ns: 'common' })}
            </p>
          )
        }

        {
          !isLoading && !isError && data && viewMode === 'table' && (
            <DocumentListTableView
              table={table}
              data={data}
              emptyLabel={emptyLabel}
              page={page}
              pageSize={pageSize}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          )
        }

        {
          !isLoading && !isError && data && viewMode === 'grid' && (
            <DocumentListGridView
              data={data}
              emptyLabel={emptyLabel}
              page={page}
              pageSize={pageSize}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          )
        }
      </div>
    </>
  );
};

export default DocumentListContent;
