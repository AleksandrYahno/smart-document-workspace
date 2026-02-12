export type TActivityLogEventType = 'created' | 'edited' | 'shared' | 'commented';

export interface IDocumentActivityLogEntry {
  id: string;
  type: TActivityLogEventType;
  date: string;
  author: string;
  /** Optional detail (e.g. "Shared with Jane Smith", "Reply to comment"). */
  detail?: string;
}
