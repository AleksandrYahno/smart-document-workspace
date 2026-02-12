import type { Table } from '@tanstack/react-table';

import type { IDocument } from '@shared/types/document.interface';
import type { IDocumentsListResponse } from '@shared/types/document.interface';

export interface IDocumentListTableViewProps {
  table: Table<IDocument>;
  data: IDocumentsListResponse;
  emptyLabel: string;
  page: number;
  pageSize: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}
