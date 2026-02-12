import type { AxiosRequestConfig } from 'axios';

export interface IGetRequestOptions {
  url: string;
  config?: AxiosRequestConfig;
}

export interface IPostRequestOptions<T = unknown> {
  url: string;
  data: T;
  config?: AxiosRequestConfig;
}

export interface IPatchRequestOptions<T = unknown> {
  url: string;
  data: T;
  config?: AxiosRequestConfig;
}

export interface IDeleteRequestOptions {
  url: string;
  config?: AxiosRequestConfig;
}
