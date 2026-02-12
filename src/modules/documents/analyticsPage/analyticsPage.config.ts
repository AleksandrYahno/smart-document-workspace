import type { TDocumentType, TDocumentStatus } from '@shared/types/document.interface';

export interface IStorageByTypeData {
  type: TDocumentType;
  bytes: number;
}

export interface IUploadActivityData {
  date: string;
  count: number;
}

export interface IStatusDistributionData {
  status: TDocumentStatus;
  count: number;
}
