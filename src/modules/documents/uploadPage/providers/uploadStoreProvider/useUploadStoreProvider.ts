import { useContext } from 'react';

import type { IUploadStoreContext } from './uploadStoreContext.interface';
import { UploadStoreContext } from './UploadStoreProvider';

const useUploadStoreProvider = (): IUploadStoreContext => {
  const context = useContext(UploadStoreContext);

  if (!context) {
    throw new Error('useUploadStoreProvider must be used within UploadStoreProvider');
  }

  return context;
};

export default useUploadStoreProvider;
