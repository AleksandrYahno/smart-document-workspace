import type { IDocumentVersionEntry } from './documentDetailVersionHistory.interface';

const MOCK_VERSION_HISTORY: Record<string, IDocumentVersionEntry[]> = {
  '1': [
    { version: 3, date: '2025-02-10T14:30:00Z', author: 'John Doe', labelKey: 'detail_version_label_final' },
    { version: 2, date: '2025-02-09T11:00:00Z', author: 'John Doe', labelKey: 'detail_version_label_updated' },
    { version: 1, date: '2025-02-08T09:00:00Z', author: 'John Doe', labelKey: 'detail_version_label_initial' },
  ],
  '2': [
    { version: 2, date: '2025-02-11T09:15:00Z', author: 'Jane Smith', labelKey: 'detail_version_label_updated' },
    { version: 1, date: '2025-02-10T14:00:00Z', author: 'Jane Smith', labelKey: 'detail_version_label_initial' },
  ],
  '3': [
    { version: 1, date: '2025-02-12T08:00:00Z', author: 'John Doe', labelKey: 'detail_version_label_initial' },
  ],
  '4': [
    { version: 2, date: '2025-02-09T16:45:00Z', author: 'Jane Smith', labelKey: 'detail_version_label_updated' },
    { version: 1, date: '2025-02-08T10:00:00Z', author: 'Jane Smith', labelKey: 'detail_version_label_initial' },
  ],
  '5': [
    { version: 1, date: '2025-02-12T11:20:00Z', author: 'John Doe', labelKey: 'detail_version_label_initial' },
  ],
};

const DEFAULT_VERSION_HISTORY: IDocumentVersionEntry[] = [
  { version: 1, date: new Date().toISOString(), author: '—', labelKey: 'detail_version_label_initial' },
];

export function getMockVersionHistory(documentId: string): IDocumentVersionEntry[] {
  return MOCK_VERSION_HISTORY[documentId] ?? DEFAULT_VERSION_HISTORY;
}
