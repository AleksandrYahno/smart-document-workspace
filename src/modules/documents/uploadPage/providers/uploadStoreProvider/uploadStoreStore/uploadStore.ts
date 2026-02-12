import { immer } from 'zustand/middleware/immer';

import type { IUploadStore, ImmerUploadStoreSetter } from './uploadStore.interface';
import { uploadSlice } from './uploadSlice/uploadSlice';

const uploadStore = (set: ImmerUploadStoreSetter): IUploadStore => ({
  uploadSlice: uploadSlice(set),
});

export const uploadStoreInitializer = immer(uploadStore);
