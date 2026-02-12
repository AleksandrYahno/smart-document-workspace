import type { IDocument, IDocumentsListResponse } from '@shared/types/document.interface';

export const MOCK_DOCUMENTS: IDocument[] = [
  {
    id: '1',
    name: 'Project brief.pdf',
    type: 'PDF',
    size: 245_000,
    owner: 'John Doe',
    lastModified: '2025-02-10T14:30:00Z',
    status: 'approved',
  },
  {
    id: '2',
    name: 'Contract draft.docx',
    type: 'DOCX',
    size: 89_000,
    owner: 'Jane Smith',
    lastModified: '2025-02-11T09:15:00Z',
    status: 'review',
  },
  {
    id: '3',
    name: 'Screenshot.png',
    type: 'image',
    size: 1_200_000,
    owner: 'John Doe',
    lastModified: '2025-02-12T08:00:00Z',
    status: 'draft',
  },
  {
    id: '4',
    name: 'Report Q4.pdf',
    type: 'PDF',
    size: 512_000,
    owner: 'Jane Smith',
    lastModified: '2025-02-09T16:45:00Z',
    status: 'approved',
  },
  {
    id: '5',
    name: 'Meeting notes.docx',
    type: 'DOCX',
    size: 34_000,
    owner: 'John Doe',
    lastModified: '2025-02-12T11:20:00Z',
    status: 'draft',
  },
];

function filterAndSort(
  items: IDocument[],
  search?: string,
  sortBy?: string,
  sortOrder?: 'asc' | 'desc',
): IDocument[] {
  let result = [...items];

  if (search?.trim()) {
    const q = search.toLowerCase();

    result = result.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.owner.toLowerCase().includes(q) ||
        d.status.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q),
    );
  }

  if (sortBy) {
    result.sort((a, b) => {
      const aVal = (a as unknown as Record<string, unknown>)[sortBy] as string | number;
      const bVal = (b as unknown as Record<string, unknown>)[sortBy] as string | number;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;

      return sortOrder === 'desc' ? -cmp : cmp;
    });
  }

  return result;
}

export function getMockDocumentsList(
  page: number,
  limit: number,
  search?: string,
  sortBy?: string,
  sortOrder?: 'asc' | 'desc',
): IDocumentsListResponse {
  const filtered = filterAndSort(MOCK_DOCUMENTS, search, sortBy, sortOrder);
  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return {
    items,
    total,
    page,
    limit,
  };
}

export function getMockDocumentById(id: string): IDocument | undefined {
  return MOCK_DOCUMENTS.find((d) => d.id === id);
}
