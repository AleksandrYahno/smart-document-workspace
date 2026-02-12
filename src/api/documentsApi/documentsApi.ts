import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

import { getMockDocumentsList, getMockDocumentById } from '@api/mock/documentsMock';
import type { IDocument, IDocumentsListParams, IDocumentsListResponse } from '@shared/types/document.interface';

type TDocumentsBaseQueryArg =
  | { type: 'list'; params?: IDocumentsListParams }
  | { type: 'one'; id: string };

const mockBaseQuery: BaseQueryFn<TDocumentsBaseQueryArg, unknown, { message: string; status?: number }> =
  (arg) => {
    if (!arg) {
      return Promise.resolve({ error: { message: 'Invalid request', status: 400 } });
    }

    if (arg.type === 'one') {
      const doc = getMockDocumentById(arg.id);

      if (!doc) {
        return Promise.resolve({ error: { message: 'Not found', status: 404 } });
      }

      return Promise.resolve({ data: doc });
    }

    const { page = 1, limit = 10, search, sortBy, sortOrder } = arg.params ?? {};
    const data = getMockDocumentsList(page, limit, search, sortBy, sortOrder);

    return Promise.resolve({ data });
  };

export const documentsApi = createApi({
  reducerPath: 'documentsApi',
  baseQuery: mockBaseQuery,
  tagTypes: ['Document', 'DocumentList'],
  endpoints: (builder) => ({
    getDocumentsList: builder.query<IDocumentsListResponse, IDocumentsListParams | void>({
      query: (params) => ({ type: 'list', params: params ?? undefined }),
      providesTags: (result) =>
        result
          ? [
            ...result.items.map(({ id }) => ({ type: 'Document' as const, id })),
            { type: 'DocumentList', id: 'LIST' },
          ]
          : [{ type: 'DocumentList', id: 'LIST' }],
    }),

    getDocumentById: builder.query<IDocument, string>({
      query: (id) => ({ type: 'one', id }),
      providesTags: (_result, _error, id) => [{ type: 'Document', id }],
    }),
  }),
});

export const { useGetDocumentsListQuery, useGetDocumentByIdQuery } = documentsApi;
