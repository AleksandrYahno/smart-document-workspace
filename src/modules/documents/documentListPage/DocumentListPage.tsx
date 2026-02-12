import { useMemo, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type VisibilityState,
} from '@tanstack/react-table';

import { useGetDocumentsListQuery } from '@api/documentsApi';
import { formatBytes } from '@helpers/formatBytes.helper';
import { formatDate } from '@helpers/formatDate.helper';
import { Badge } from '@shared/uiKit/badge';
import { Button } from '@shared/uiKit/button';
import { Card } from '@shared/uiKit/card';
import { Input } from '@shared/uiKit/input';
import type { IDocument, TDocumentStatus } from '@shared/types/document.interface';

import styles from './documentListPage.module.scss';

const PAGE_SIZE = 10;

type TViewMode = 'table' | 'grid';

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
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [viewMode, setViewMode] = useState<TViewMode>('table');
  const [columnsOpen, setColumnsOpen] = useState(false);
  const columnsDropdownRef = useRef<HTMLDivElement>(null);

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
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        header: t('name'),
        cell: (info) => info.getValue() as string,
        enableHiding: true,
      },
      {
        accessorKey: 'type',
        header: t('type'),
        cell: (info) => info.getValue() as string,
        enableHiding: true,
      },
      {
        accessorKey: 'size',
        header: t('size'),
        cell: (info) => formatBytes(info.getValue() as number),
        enableHiding: true,
      },
      {
        accessorKey: 'owner',
        header: t('owner'),
        cell: (info) => info.getValue() as string,
        enableHiding: true,
      },
      {
        accessorKey: 'lastModified',
        header: t('last_modified'),
        cell: (info) => formatDate(info.getValue() as string),
        enableHiding: true,
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
        enableHiding: true,
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
    state: { sorting, rowSelection, columnVisibility },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    pageCount: data ? Math.ceil(data.total / PAGE_SIZE) : 0,
    enableRowSelection: true,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (columnsDropdownRef.current && !columnsDropdownRef.current.contains(e.target as Node)) {
        setColumnsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const selectedCount = table.getSelectedRowModel().rows.length;

  const handleBulkDelete = (): void => {
    setRowSelection({});
  };

  const handleBulkExport = (): void => {
    setRowSelection({});
  };

  const handleBulkChangeStatus = (): void => {
    setRowSelection({});
  };

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {t('list_title')}
        </h1>

        <div className={styles.toolbar}>
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

          <div className={styles.viewToggle}>
            <Button
              size="sm"
              variant={viewMode === 'table' ? 'primary' : 'outline'}
              onClick={() => setViewMode('table')}
            >
              {t('view_table')}
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              onClick={() => setViewMode('grid')}
            >
              {t('view_grid')}
            </Button>
          </div>

          <div
            className={styles.columnsDropdown}
            ref={columnsDropdownRef}
          >
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setColumnsOpen((v) => !v)}
            >
              {t('columns')}
            </Button>
            {
              columnsOpen && (
                <div className={styles.columnsPanel}>
                  {table.getAllLeafColumns()
                    .filter((col) => col.getCanHide())
                    .map((col) => (
                      <label
                        key={col.id}
                        className={styles.columnCheckbox}
                      >
                        <input
                          type="checkbox"
                          checked={col.getIsVisible()}
                          onChange={col.getToggleVisibilityHandler()}
                        />
                        {t(col.id === 'lastModified' ? 'last_modified' : col.id)}
                      </label>
                    ))}
                </div>
              )
            }
          </div>
        </div>
      </header>

      {
        selectedCount > 0 && (
          <div className={styles.bulkBar}>
            <span className={styles.bulkLabel}>
              {t('selected_count', { count: selectedCount })}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleBulkDelete}
            >
              {t('bulk_delete')}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleBulkChangeStatus}
            >
              {t('bulk_change_status')}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleBulkExport}
            >
              {t('bulk_export')}
            </Button>
          </div>
        )
      }

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

        {
          !isLoading && !isError && data && viewMode === 'grid' && (
            <>
              <div className={styles.grid}>
                {data.items.map((doc) => (
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
