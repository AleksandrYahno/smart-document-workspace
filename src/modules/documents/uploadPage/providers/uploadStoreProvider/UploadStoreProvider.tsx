import { createContext, FC, PropsWithChildren, useMemo, useRef } from 'react';
import { create } from 'zustand';

import { uploadStoreInitializer } from './uploadStoreStore/uploadStore';
import type { IUploadStoreContext, UseUploadStore } from './uploadStoreContext.interface';

const UploadStoreContext = createContext<IUploadStoreContext | undefined>(undefined);

const UploadStoreProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const storeRef = useRef<UseUploadStore>(
    create(uploadStoreInitializer) as unknown as UseUploadStore,
  );

  const value = useMemo<IUploadStoreContext>(
    () => ({
      uploadStore: storeRef.current,
    }),
    [],
  );

  return (
    <UploadStoreContext.Provider value={value}>
      {children}
    </UploadStoreContext.Provider>
  );
};

export { UploadStoreContext, UploadStoreProvider };
export type { UseUploadStore };
