import type { TDocumentType } from '@shared/types/document.interface';

/** i18n key for preview placeholder by document type. */
export const DOCUMENT_PREVIEW_LABEL_KEYS: Record<TDocumentType, string> = {
  PDF: 'detail_preview_pdf',
  DOCX: 'detail_preview_docx',
  image: 'detail_preview_image',
};
