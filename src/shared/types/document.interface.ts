export type TDocumentType = 'PDF' | 'DOCX' | 'image';

export type TDocumentStatus = 'draft' | 'review' | 'approved';

export interface IDocument {
  id: string;
  name: string;
  type: TDocumentType;
  size: number;
  owner: string;
  lastModified: string;
  status: TDocumentStatus;
}

export interface IDocumentsListParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface IDocumentsListResponse {
  items: IDocument[];
  total: number;
  page: number;
  limit: number;
}
