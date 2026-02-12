import type { IUploadFormValues } from '../../uploadForm.interface';

export interface IUploadStepReviewProps {
  values: IUploadFormValues;
  isSubmitting: boolean;
  uploadProgress: number;
  onBack: () => void;
  t: (key: string, options?: { ns?: string }) => string;
}
