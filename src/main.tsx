import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { appRouter } from './appRoutes.config';
import { store } from '@store';

import '@i18n/i18n.config';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <RouterProvider router={appRouter} />
      </SnackbarProvider>
    </Provider>
  </StrictMode>,
);
