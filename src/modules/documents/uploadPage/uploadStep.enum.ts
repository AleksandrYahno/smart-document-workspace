export enum UploadStep {
  File = 1,
  Metadata = 2,
  Review = 3,
}

export const UPLOAD_STEP_ORDER: ReadonlyArray<UploadStep> = [
  UploadStep.File,
  UploadStep.Metadata,
  UploadStep.Review,
] as const;

export const FIRST_UPLOAD_STEP = UploadStep.File;
export const LAST_UPLOAD_STEP = UploadStep.Review;

export function getNextUploadStep(step: UploadStep): UploadStep | null {
  const index = UPLOAD_STEP_ORDER.indexOf(step);

  if (index < 0 || index >= UPLOAD_STEP_ORDER.length - 1) {
    return null;
  }

  return UPLOAD_STEP_ORDER[index + 1];
}

export function getPrevUploadStep(step: UploadStep): UploadStep | null {
  const index = UPLOAD_STEP_ORDER.indexOf(step);

  if (index <= 0) {
    return null;
  }

  return UPLOAD_STEP_ORDER[index - 1];
}
