import type { StoreApi, UseBoundStore } from 'zustand';
import type { IUploadStore } from './uploadStoreStore/uploadStore.interface';

export type UseUploadStore = UseBoundStore<StoreApi<IUploadStore>>;

export interface IUploadStoreContext {
  uploadStore: UseUploadStore;
}
