import { configureStore, type Store } from '@reduxjs/toolkit';

import { documentsApi } from '@api/documentsApi';

const configuredStore = configureStore({
  reducer: {
    [documentsApi.reducerPath]: documentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(documentsApi.middleware),
});

export type TRootState = ReturnType<typeof configuredStore.getState>;
export type TAppDispatch = typeof configuredStore.dispatch;

export const store: Store<TRootState> = configuredStore;
