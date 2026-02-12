import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from './App';
import { DocumentListPage } from '@modules/documents/documentListPage/DocumentListPage';

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
        element: <DocumentListPage />,
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
