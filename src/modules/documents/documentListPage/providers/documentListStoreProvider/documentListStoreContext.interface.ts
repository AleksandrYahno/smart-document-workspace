import type { StoreApi, UseBoundStore } from 'zustand';
import type { IDocumentListStore } from './documentListStoreStore/documentListStore.interface';

export type UseDocumentListStore = UseBoundStore<StoreApi<IDocumentListStore>>;

export interface IDocumentListStoreContext {
  documentListStore: UseDocumentListStore;
}
