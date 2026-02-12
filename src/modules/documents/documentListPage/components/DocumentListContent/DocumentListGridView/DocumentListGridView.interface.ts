import type { IDocumentsListResponse } from '@shared/types/document.interface';

export interface IDocumentListGridViewProps {
  data: IDocumentsListResponse;
  emptyLabel: string;
  page: number;
  pageSize: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}
