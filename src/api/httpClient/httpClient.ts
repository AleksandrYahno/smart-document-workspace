import axios, { type AxiosInstance, type AxiosError } from 'axios';

import type { IApiResponse } from './interfaces/responses.interface';
import type { IGetRequestOptions, IPostRequestOptions, IPatchRequestOptions, IDeleteRequestOptions } from './interfaces/requests.interface';

const AUTH_TOKEN_MOCK = 'mock-auth-token';

function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const headers = config.headers as Record<string, string>;

      headers.Authorization = `Bearer ${AUTH_TOKEN_MOCK}`;

      if (import.meta.env.DEV) {
        console.warn('[API Request]', config.method?.toUpperCase(), config.url, config.params ?? '', config.data ?? '');
      }

      return config;
    },
    (error) => Promise.reject(error instanceof Error ? error : new Error(String(error))),
  );

  instance.interceptors.response.use(
    (response) => {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug('[API Response]', response.status, response.config.url, response.data);
      }

      return response;
    },
    (error: AxiosError) => {
      const message =
        (error.response?.data as { message?: string })?.message ?? error.message ?? 'Request failed';

      if (import.meta.env.DEV) {
        console.error('[API Error]', { message, code: error.code, status: error.response?.status });
      }

      return Promise.reject(new Error(message));
    },
  );

  return instance;
}

const axiosInstance = createAxiosInstance();

export async function get<T>(options: IGetRequestOptions): Promise<IApiResponse<T>> {
  const { url, config = {} } = options;
  const response = await axiosInstance.get<T>(url, config);

  return {
    data: response.data,
    status: response.status,
    headers: response.headers as Record<string, string>,
  };
}

export async function post<T, D = unknown>(options: IPostRequestOptions<D>): Promise<IApiResponse<T>> {
  const { url, data, config = {} } = options;
  const response = await axiosInstance.post<T>(url, data, config);

  return {
    data: response.data,
    status: response.status,
    headers: response.headers as Record<string, string>,
  };
}

export async function patch<T, D = unknown>(options: IPatchRequestOptions<D>): Promise<IApiResponse<T>> {
  const { url, data, config = {} } = options;
  const response = await axiosInstance.patch<T>(url, data, config);

  return {
    data: response.data,
    status: response.status,
    headers: response.headers as Record<string, string>,
  };
}

export async function del<T>(options: IDeleteRequestOptions): Promise<IApiResponse<T>> {
  const { url, config = {} } = options;
  const response = await axiosInstance.delete<T>(url, config);

  return {
    data: response.data,
    status: response.status,
    headers: response.headers as Record<string, string>,
  };
}

export { axiosInstance };
