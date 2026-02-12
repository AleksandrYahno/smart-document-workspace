import { immer } from 'zustand/middleware/immer';

import type { IDocumentListStore, ImmerDocumentListStoreSetter } from './documentListStore.interface';
import { documentListSlice } from './documentListSlice/documentListSlice';

const documentListStore = (set: ImmerDocumentListStoreSetter): IDocumentListStore => ({
  documentListSlice: documentListSlice(set),
});

export const documentListStoreInitializer = immer(documentListStore);
