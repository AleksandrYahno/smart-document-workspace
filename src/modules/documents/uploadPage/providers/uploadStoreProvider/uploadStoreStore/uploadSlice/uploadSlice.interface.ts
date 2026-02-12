import type { UploadStep } from '../../../../uploadStep.enum';

export interface IUploadSlice {
  step: UploadStep;
  uploadProgress: number;
  isSubmitting: boolean;

  setStep: (step: UploadStep) => void;
  setUploadProgress: (value: number) => void;
  setIsSubmitting: (value: boolean) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  resetUpload: () => void;
}
