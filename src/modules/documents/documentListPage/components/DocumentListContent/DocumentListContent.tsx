import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { flexRender } from '@tanstack/react-table';

import { formatBytes } from '@helpers/formatBytes.helper';
import { formatDate } from '@helpers/formatDate.helper';
import { Badge } from '@shared/uiKit/badge';
import { Button } from '@shared/uiKit/button';
import { Card } from '@shared/uiKit/card';

import useDocumentListStoreProvider from '../../providers/documentListStoreProvider/useDocumentListStoreProvider';
import { statusVariantMap } from '../../configs/documentListColumns.config';
import DocumentListBulkBarVM from '../DocumentListBulkBarVM/DocumentListBulkBarVM';

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
  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;
  const items = data?.items ?? [];

  return (
    <>
      <DocumentListBulkBarVM selectedCount={selectedCount} />

      <div className={styles.content}>
        {
          isLoading && (
            <p className={styles.loading}>
              {t('loading', { ns: 'common' })}
            </p>
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
            <>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className={styles.th}
                          >
                            {
                              header.column.getCanSort()
                                ? (
                                  <button
                                    type="button"
                                    className={styles.sortBtn}
                                    onClick={header.column.getToggleSortingHandler()}
                                  >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {
                                      {
                                        asc: ' ↑',
                                        desc: ' ↓',
                                      }[header.column.getIsSorted() as string] ?? ''
                                    }
                                  </button>
                                )
                                : flexRender(header.column.columnDef.header, header.getContext())
                            }
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className={styles.tr}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className={styles.td}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {
                items.length === 0 && (
                  <p className={styles.empty}>
                    {t('no_data', { ns: 'common' })}
                  </p>
                )
              }

              <div className={styles.pagination}>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ←
                </Button>

                <span className={styles.pageInfo}>
                  {page}
                  {' / '}
                  {totalPages}
                  {' — '}
                  {data.total}
                  {' total'}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  →
                </Button>
              </div>
            </>
          )
        }

        {
          !isLoading && !isError && data && viewMode === 'grid' && (
            <>
              <div className={styles.grid}>
                {items.map((doc) => (
                  <Card
                    key={doc.id}
                    title={doc.name}
                  >
                    <dl className={styles.cardMeta}>
                      <dt>
                        {t('type')}
                      </dt>
                      <dd>
                        {doc.type}
                      </dd>
                      <dt>
                        {t('size')}
                      </dt>
                      <dd>
                        {formatBytes(doc.size)}
                      </dd>
                      <dt>
                        {t('owner')}
                      </dt>
                      <dd>
                        {doc.owner}
                      </dd>
                      <dt>
                        {t('last_modified')}
                      </dt>
                      <dd>
                        {formatDate(doc.lastModified)}
                      </dd>
                      <dt>
                        {t('status')}
                      </dt>
                      <dd>
                        <Badge variant={statusVariantMap[doc.status]}>
                          {t(`status_${doc.status}`)}
                        </Badge>
                      </dd>
                    </dl>
                  </Card>
                ))}
              </div>

              {
                items.length === 0 && (
                  <p className={styles.empty}>
                    {t('no_data', { ns: 'common' })}
                  </p>
                )
              }

              <div className={styles.pagination}>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ←
                </Button>

                <span className={styles.pageInfo}>
                  {page}
                  {' / '}
                  {totalPages}
                  {' — '}
                  {data.total}
                  {' total'}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  →
                </Button>
              </div>
            </>
          )
        }
      </div>
    </>
  );
};

export default DocumentListContent;
