import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { axiosInstance } from '@api/httpClient';

interface IBaseQueryArgs {
  url: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  data?: unknown;
  params?: Record<string, string | number | boolean>;
}

export const axiosBaseQuery =
  (): BaseQueryFn<IBaseQueryArgs, unknown, { message: string; status?: number }> =>
    async ({ url, method = 'GET', data, params }) => {
      try {
        const response = await axiosInstance.request({
          url,
          method,
          data,
          params,
        });

        return { data: response.data };
      } catch (err: unknown) {
        const error = err as { message?: string; status?: number };

        return {
          error: {
            message: error.message ?? 'Request failed',
            status: error.status,
          },
        };
      }
    };
