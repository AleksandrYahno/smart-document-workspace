import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';

import { useGetDocumentsListQuery } from '@api/documentsApi';
import { formatBytes } from '@helpers/formatBytes.helper';
import { formatDate } from '@helpers/formatDate.helper';
import { Badge } from '@shared/uiKit/badge';
import { Button } from '@shared/uiKit/button';
import { Input } from '@shared/uiKit/input';
import type { IDocument, TDocumentStatus } from '@shared/types/document.interface';

import styles from './documentListPage.module.scss';

const PAGE_SIZE = 10;

const statusVariantMap: Record<TDocumentStatus, 'default' | 'success' | 'warning' | 'error'> = {
  draft: 'default',
  review: 'warning',
  approved: 'success',
};

export function DocumentListPage(): React.ReactElement {
  const { t } = useTranslation('documents');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const sortBy = sorting[0]?.id ?? undefined;
  const sortOrder = sorting[0]?.desc ? 'desc' : 'asc';

  const { data, isLoading, isError } = useGetDocumentsListQuery({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    sortBy,
    sortOrder,
  });

  const columns = useMemo<ColumnDef<IDocument>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t('name'),
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: 'type',
        header: t('type'),
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: 'size',
        header: t('size'),
        cell: (info) => formatBytes(info.getValue() as number),
      },
      {
        accessorKey: 'owner',
        header: t('owner'),
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: 'lastModified',
        header: t('last_modified'),
        cell: (info) => formatDate(info.getValue() as string),
      },
      {
        accessorKey: 'status',
        header: t('status'),
        cell: (info) => {
          const status = info.getValue() as TDocumentStatus;

          return (
            <Badge variant={statusVariantMap[status]}>
              {t(`status_${status}`)}
            </Badge>
          );
        },
      },
    ],
    [t],
  );

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table API
  const table = useReactTable({
    data: data?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    state: { sorting },
    onSortingChange: setSorting,
    pageCount: data ? Math.ceil(data.total / PAGE_SIZE) : 0,
  });

  const handleSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {t('list_title')}
        </h1>

        <form
          className={styles.searchForm}
          onSubmit={handleSearchSubmit}
        >
          <Input
            placeholder={t('search', { ns: 'common' })}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
          />
          <Button type="submit">
            {t('search', { ns: 'common' })}
          </Button>
        </form>
      </header>

      <div className={styles.tableWrap}>
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
          !isLoading && !isError && data && (
            <>
              <table className={styles.table}>
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className={styles.th}
                        >
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

              {
                data.items.length === 0 && (
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
    </div>
  );
}
