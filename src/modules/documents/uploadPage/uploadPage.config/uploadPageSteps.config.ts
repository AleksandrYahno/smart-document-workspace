import { UploadStep } from '../uploadStep.enum';

export const UPLOAD_PAGE_STEP_LABEL_KEYS: Record<UploadStep, string> = {
  [UploadStep.File]: 'upload_step_file',
  [UploadStep.Metadata]: 'upload_step_metadata',
  [UploadStep.Review]: 'upload_step_review',
};
