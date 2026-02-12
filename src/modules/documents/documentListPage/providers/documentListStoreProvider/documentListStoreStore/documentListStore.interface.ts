import type { IDocumentListSlice } from './documentListSlice/documentListSlice.interface';

export interface IDocumentListStore {
  documentListSlice: IDocumentListSlice;
}

export type ImmerDocumentListStoreSetter = (fn: (store: IDocumentListStore) => void) => void;
