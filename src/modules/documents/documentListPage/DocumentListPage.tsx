import { FC, ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import { useGetDocumentsListQuery } from '@api/documentsApi';

import { DocumentListStoreProvider, useDocumentListStoreProvider } from './providers/documentListStoreProvider';
import { getDocumentListColumns } from './configs/documentListColumns.config';
import DocumentListSearchVM from './components/DocumentListSearchVM/DocumentListSearchVM';
import DocumentListToolbarVM from './components/DocumentListToolbarVM/DocumentListToolbarVM';
import DocumentListContent from './components/DocumentListContent/DocumentListContent';

import styles from './documentListPage.module.scss';

const PAGE_SIZE = 10;

const DocumentListPageInner: FC = (): ReactElement => {
  const { t } = useTranslation('documents');
  const { documentListStore } = useDocumentListStoreProvider();

  const page = documentListStore((s) => s.documentListSlice.page);
  const search = documentListStore((s) => s.documentListSlice.search);
  const sorting = documentListStore((s) => s.documentListSlice.sorting);
  const rowSelection = documentListStore((s) => s.documentListSlice.rowSelection);
  const columnVisibility = documentListStore((s) => s.documentListSlice.columnVisibility);
  const setSorting = documentListStore((s) => s.documentListSlice.setSorting);
  const setRowSelection = documentListStore((s) => s.documentListSlice.setRowSelection);
  const setColumnVisibility = documentListStore((s) => s.documentListSlice.setColumnVisibility);

  const sortBy = sorting[0]?.id ?? undefined;
  const sortOrder = sorting[0]?.desc ? 'desc' : 'asc';

  const { data, isLoading, isError } = useGetDocumentsListQuery({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    sortBy,
    sortOrder,
  });

  const columns = useMemo(() => getDocumentListColumns(t), [t]);

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

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {t('list_title')}
        </h1>

        <div className={styles.toolbar}>
          <Link
            to="/documents/upload"
            className={styles.uploadLink}
          >
            {t('upload')}
          </Link>

          <DocumentListSearchVM />

          <DocumentListToolbarVM table={table} />
        </div>
      </header>

      <DocumentListContent
        table={table}
        data={data}
        isLoading={isLoading}
        isError={isError}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
};

const DocumentListPage: FC = (): ReactElement => (
  <DocumentListStoreProvider>
    <DocumentListPageInner />
  </DocumentListStoreProvider>
);

export default DocumentListPage;
