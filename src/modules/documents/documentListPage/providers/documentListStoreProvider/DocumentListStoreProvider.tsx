import { createContext, FC, PropsWithChildren, useMemo, useRef } from 'react';
import { create } from 'zustand';

import { documentListStoreInitializer } from './documentListStoreStore/documentListStore';
import type { IDocumentListStoreContext } from './documentListStoreContext.interface';
import type { UseDocumentListStore } from './documentListStoreContext.interface';

const DocumentListStoreContext = createContext<IDocumentListStoreContext | undefined>(undefined);

const DocumentListStoreProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const storeRef = useRef<UseDocumentListStore>(
    create(documentListStoreInitializer) as unknown as UseDocumentListStore,
  );

  const value = useMemo<IDocumentListStoreContext>(
    () => ({
      documentListStore: storeRef.current,
    }),
    [],
  );

  return (
    <DocumentListStoreContext.Provider value={value}>
      {children}
    </DocumentListStoreContext.Provider>
  );
};

export { DocumentListStoreContext, DocumentListStoreProvider };
export type { UseDocumentListStore };
