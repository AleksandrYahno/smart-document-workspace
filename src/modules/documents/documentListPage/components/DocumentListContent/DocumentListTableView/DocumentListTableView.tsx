import { FC, ReactElement } from 'react';
import { flexRender } from '@tanstack/react-table';

import DocumentListPagination from '../DocumentListPagination/DocumentListPagination';

import type { IDocumentListTableViewProps } from './DocumentListTableView.interface';

import styles from '../../../documentListPage.module.scss';

const DocumentListTableView: FC<IDocumentListTableViewProps> = (props): ReactElement => {
  const { table, data, emptyLabel, page, pageSize, onPrevPage, onNextPage } = props;

  const items = data.items;
  const totalPages = Math.ceil(data.total / pageSize);

  return (
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
            {emptyLabel}
          </p>
        )
      }

      <DocumentListPagination
        page={page}
        totalPages={totalPages}
        total={data.total}
        onPrev={onPrevPage}
        onNext={onNextPage}
      />
    </>
  );
};

export default DocumentListTableView;
