import { useContext } from 'react';

import type { IDocumentListStoreContext } from './documentListStoreContext.interface';
import { DocumentListStoreContext } from './DocumentListStoreProvider';

const useDocumentListStoreProvider = (): IDocumentListStoreContext => {
  const context = useContext(DocumentListStoreContext);

  if (!context) {
    throw new Error('useDocumentListStoreProvider must be used within DocumentListStoreProvider');
  }

  return context;
};

export default useDocumentListStoreProvider;
