import type { IDocumentActivityLogEntry } from './documentDetailActivityLog.interface';

const MOCK_ACTIVITY_LOG: Record<string, IDocumentActivityLogEntry[]> = {
  '1': [
    { id: 'a1', type: 'commented', date: '2025-02-10T14:25:00Z', author: 'Jane Smith', detail: 'Looks good to me.' },
    { id: 'a2', type: 'edited', date: '2025-02-10T12:00:00Z', author: 'John Doe' },
    { id: 'a3', type: 'shared', date: '2025-02-09T15:30:00Z', author: 'John Doe', detail: 'Shared with Jane Smith (edit)' },
    { id: 'a4', type: 'created', date: '2025-02-08T09:00:00Z', author: 'John Doe' },
  ],
  '2': [
    { id: 'b1', type: 'edited', date: '2025-02-11T09:10:00Z', author: 'Jane Smith' },
    { id: 'b2', type: 'shared', date: '2025-02-10T16:00:00Z', author: 'Jane Smith', detail: 'Shared with John Doe (view)' },
    { id: 'b3', type: 'created', date: '2025-02-10T14:00:00Z', author: 'Jane Smith' },
  ],
  '3': [
    { id: 'c1', type: 'created', date: '2025-02-12T08:00:00Z', author: 'John Doe' },
  ],
  '4': [
    { id: 'd1', type: 'commented', date: '2025-02-09T17:00:00Z', author: 'John Doe', detail: 'Please add Q4 figures.' },
    { id: 'd2', type: 'edited', date: '2025-02-09T16:50:00Z', author: 'Jane Smith' },
    { id: 'd3', type: 'created', date: '2025-02-08T10:00:00Z', author: 'Jane Smith' },
  ],
  '5': [
    { id: 'e1', type: 'created', date: '2025-02-12T11:20:00Z', author: 'John Doe' },
  ],
};

const DEFAULT_ACTIVITY_LOG: IDocumentActivityLogEntry[] = [
  { id: 'default', type: 'created', date: new Date().toISOString(), author: '—' },
];

export function getMockActivityLog(documentId: string): IDocumentActivityLogEntry[] {
  return MOCK_ACTIVITY_LOG[documentId] ?? DEFAULT_ACTIVITY_LOG;
}
