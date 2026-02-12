import type { Table } from '@tanstack/react-table';

import type { IDocument } from '@shared/types/document.interface';

export interface IDocumentListToolbarVMProps {
  table: Table<IDocument>;
}
