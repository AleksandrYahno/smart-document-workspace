import type { IUploadSlice } from './uploadSlice/uploadSlice.interface';

export interface IUploadStore {
  uploadSlice: IUploadSlice;
}

export type ImmerUploadStoreSetter = (fn: (store: IUploadStore) => void) => void;
