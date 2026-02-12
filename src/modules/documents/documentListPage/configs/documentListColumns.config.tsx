import type { TFunction } from 'i18next';
import type { ColumnDef } from '@tanstack/react-table';

import { formatBytes } from '@helpers/formatBytes.helper';
import { formatDate } from '@helpers/formatDate.helper';
import { Badge } from '@shared/uiKit/badge';
import type { IDocument, TDocumentStatus } from '@shared/types/document.interface';

export const statusVariantMap: Record<TDocumentStatus, 'default' | 'success' | 'warning' | 'error'> = {
  draft: 'default',
  review: 'warning',
  approved: 'success',
};

export const getDocumentListColumns = (t: TFunction<'documents'>): ColumnDef<IDocument>[] => [
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
];
