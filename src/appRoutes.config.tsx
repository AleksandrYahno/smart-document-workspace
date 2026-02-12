import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from './App';
import DocumentListPage from '@modules/documents/documentListPage/DocumentListPage';
import { DocumentListStoreProvider } from '@modules/documents/documentListPage/providers/documentListStoreProvider';
import DocumentDetailPage from '@modules/documents/documentDetailPage/DocumentDetailPage';
import UploadPage from '@modules/documents/uploadPage/UploadPage';
import { UploadStoreProvider } from '@modules/documents/uploadPage/providers/uploadStoreProvider';
import AnalyticsPage from '@modules/documents/analyticsPage/AnalyticsPage';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/documents"
            replace
          />
        ),
      },
      {
        path: 'documents',
        element: (
          <DocumentListStoreProvider>
            <DocumentListPage />
          </DocumentListStoreProvider>
        ),
      },
      {
        path: 'documents/:id',
        element: <DocumentDetailPage />,
      },
      {
        path: 'documents/upload',
        element: (
          <UploadStoreProvider>
            <UploadPage />
          </UploadStoreProvider>
        ),
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: '*',
        element: (
          <Navigate
            to="/documents"
            replace
          />
        ),
      },
    ],
  },
]);
