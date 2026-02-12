import type { Table } from '@tanstack/react-table';

import type { IDocument } from '@shared/types/document.interface';
import type { IDocumentsListResponse } from '@shared/types/document.interface';

export interface IDocumentListContentProps {
  table: Table<IDocument>;
  data: IDocumentsListResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  pageSize: number;
}
