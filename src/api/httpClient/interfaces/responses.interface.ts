export interface IApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export interface IApiError {
  message: string;
  code?: string;
  status?: number;
}
